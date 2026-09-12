# -*- coding: utf-8 -*-
"""
CSP-J/S 第一轮真题 OCR 提取流水线
====================================
用法:
  1. 将 PDF 文件放入 csp_pdfs/ 目录
  2. python extract_csp.py
  3. 检查输出并微调 csp_extracted/ 中的 JSON 文件
  4. python build_data.py 生成最终题库文件

支持:
  - 直接文本型 PDF (PyPDF2 提取)
  - 扫描型 PDF (pytesseract OCR，需安装 Tesseract)
  - 混合模式 (先尝试文本提取，乱码则转 OCR)
"""

import os, sys, re, json, io, hashlib
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PDF_DIR = os.path.join(os.path.dirname(__file__), "csp_pdfs")
EXTRACT_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")
os.makedirs(EXTRACT_DIR, exist_ok=True)

def extract_text_pypdf2(pdf_path):
    """用 PyPDF2 提取文本（适用于文本型 PDF）"""
    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(pdf_path)
        pages = []
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                pages.append(text)
        return "\n".join(pages)
    except Exception as e:
        print(f"    PyPDF2 error: {e}")
        return ""

def extract_text_ocr(pdf_path, lang="chi_sim+eng"):
    """用 OCR 提取文本（适用于扫描型 PDF）"""
    try:
        from pdf2image import convert_from_path
        import pytesseract

        print(f"    Converting PDF to images...")
        images = convert_from_path(pdf_path, dpi=300)
        pages = []
        for i, img in enumerate(images):
            text = pytesseract.image_to_string(img, lang=lang)
            pages.append(text)
            print(f"    Page {i+1}/{len(images)} OCR done")
        return "\n".join(pages)
    except ImportError as e:
        print(f"    Missing OCR library: {e}")
        print(f"    Install: pip install pytesseract pdf2image")
        print(f"    Also need Tesseract-OCR installed with Chinese language data")
        return ""
    except Exception as e:
        print(f"    OCR error: {e}")
        return ""

def detect_scanned(text):
    """检测是否为扫描页（文本过少或乱码比例高）"""
    if len(text) < 50:
        return True
    # 检测乱码
    chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text))
    total_chars = len(text.strip())
    if total_chars > 0 and chinese_chars / total_chars < 0.1:
        return True
    return False

def parse_questions(text, paper_info):
    """解析提取出的文本为结构化题目"""
    questions = {
        "paper_id": paper_info.get("id", "unknown"),
        "year": paper_info.get("year", 0),
        "level": paper_info.get("level", "J"),
        "title": paper_info.get("title", ""),
        "choice": [],
        "reads": [],
        "completes": [],
        "raw_text": text  # 保留原文用于调试
    }

    # 清理文本
    lines = text.split("\n")
    lines = [l.strip() for l in lines if l.strip()]

    # 尝试识别各部分
    # CSP-J 第一部分：单项选择（15题，每题2分）
    # CSP-J 第二部分：阅读程序（判断+选择）
    # CSP-J 第三部分：完善程序（填空）

    current_section = None
    section_text = []

    for line in lines:
        # 识别章节标题
        if re.search(r'第[一1][部分章节].*选择|单项|单选', line):
            if current_section:
                section_text.append(("header", line))
            current_section = "choice"
            section_text = []
            continue
        elif re.search(r'第[二2][部分章节].*阅读|程序阅读|阅读程序', line):
            current_section = "read"
            section_text = []
            continue
        elif re.search(r'第[三3][部分章节].*完善|程序完善|完善程序|填空', line):
            current_section = "complete"
            section_text = []
            continue

        section_text.append((current_section, line))

    # 解析选择题
    choice_text = "\n".join([l for s, l in section_text if s == "choice"])
    questions["choice"] = parse_choice_section(choice_text, paper_info)

    return questions

def parse_choice_section(text, info):
    """解析选择题部分"""
    questions = []
    # 匹配题号和题目
    # 格式: 1. xxx  or  1．xxx  or  (1) xxx
    pattern = r'(?:^|\n)\s*(\d{1,2})[．.\)）]\s*'
    parts = re.split(pattern, text)

    # parts[0] 是空或前言，然后交替为题号和内容
    i = 1
    while i < len(parts) - 1:
        q_no = parts[i]
        q_content = parts[i + 1].strip()
        i += 2

        q = parse_single_choice(q_no, q_content, info)
        if q:
            questions.append(q)

    return questions

def parse_single_choice(no, content, info):
    """解析一道选择题"""
    # 第一行是题干，后面是选项
    lines = content.split("\n")
    lines = [l.strip() for l in lines if l.strip()]

    if not lines:
        return None

    # 找题干（可能跨多行，直到遇到 A. 或 A、）
    stem_lines = []
    option_lines = []
    in_options = False

    for line in lines:
        if re.match(r'^[A-F][．.\)、]', line):
            in_options = True
        if in_options:
            option_lines.append(line)
        else:
            stem_lines.append(line)

    stem = " ".join(stem_lines).strip()

    # 解析选项
    options = parse_options(option_lines)

    if not options or not stem:
        return None

    q = {
        "no": int(no),
        "stem": stem,
        "options": options,
        "answer": None,  # OCR 很难识别答案，需要人工填写
        "score": info.get("choice_score", 2),
        "analysis": ""
    }
    return q

def parse_options(lines):
    """解析选项行 A. xxx  B. xxx ..."""
    # 先把所有行合并
    text = " ".join(lines)
    # 分割选项 A. B. C. D.
    options = []
    pattern = r'([A-F])[．.\)、]\s*([^A-F]+?)(?=\s*[A-F][．.\)、]|$)'
    matches = re.findall(pattern, text)
    for letter, content in matches:
        content = content.strip()
        if content and len(content) > 1:
            options.append(content)
    return options if len(options) >= 2 else []

def auto_detect_paper_info(filename, text):
    """从文件名和文本自动识别试卷信息"""
    info = {"id": "", "year": 0, "level": "J", "title": "", "choice_score": 2}

    # 从文件名提取
    fname = os.path.filename if hasattr(os, 'filename') else filename
    # 找年份 (2020-2025)
    year_match = re.search(r'(20\d{2})', filename)
    if year_match:
        info["year"] = int(year_match.group(1))

    # 找级别
    if re.search(r'[Ss]-|S_|s_|-S|_S|提高', filename):
        info["level"] = "S"
        info["choice_score"] = 2  # CSP-S 每题 1.5 or 2 depending on year
    elif re.search(r'[Jj]-|J_|j_|-J|_J|入门', filename):
        info["level"] = "J"
        info["choice_score"] = 2

    # 生成 ID
    info["id"] = f"{info['year']}{info['level'].lower()}"
    info["title"] = f"{info['year']} 年 CSP-{info['level'].upper()} 第一轮"

    return info

def process_pdf(pdf_path):
    """处理单个 PDF"""
    filename = os.path.basename(pdf_path)
    print(f"\n{'='*60}")
    print(f"Processing: {filename}")

    print(f"  Step 1: PyPDF2 text extraction...")
    text = extract_text_pypdf2(pdf_path)

    if not text or detect_scanned(text):
        print(f"  Step 1 result: {'Empty' if not text else 'Scanned/invalid'} -> OCR needed")
        print(f"  Step 2: OCR extraction...")
        text = extract_text_ocr(pdf_path)
    else:
        print(f"  Step 1 result: OK ({len(text)} chars)")

    if not text:
        print(f"  FAILED: No text could be extracted")
        return None

    # 自动识别试卷信息
    info = auto_detect_paper_info(filename, text)
    print(f"  Detected: {info['title']} (ID: {info['id']})")

    # 保存提取的文本
    stem = Path(filename).stem
    text_path = os.path.join(EXTRACT_DIR, f"{stem}_raw.txt")
    with open(text_path, "w", encoding="utf-8") as f:
        # 只取前 50000 字符避免过大
        f.write(text[:50000])
    print(f"  Raw text saved: {text_path} ({len(text)} chars)")

    return {"text": text, "info": info, "pdf_path": pdf_path}

def main():
    print("=" * 60)
    print("CSP-J/S OCR Extraction Pipeline")
    print("=" * 60)

    if not os.path.exists(PDF_DIR):
        print(f"Creating PDF directory: {PDF_DIR}")

    pdfs = [f for f in os.listdir(PDF_DIR) if f.lower().endswith(".pdf")]

    if not pdfs:
        print(f"\nNo PDF files found in: {PDF_DIR}")
        print("Please place CSP-J/S PDF files there.")
        print("\nExpected filenames (auto-detection):")
        print("  csp-j-2024.pdf, csp-s-2024.pdf, csp-j-2023.pdf, etc.")
        return

    print(f"Found {len(pdfs)} PDF file(s):")
    for p in pdfs:
        print(f"  {p}")

    results = []
    for pdf_file in pdfs:
        pdf_path = os.path.join(PDF_DIR, pdf_file)
        result = process_pdf(pdf_path)
        if result:
            results.append(result)

    print(f"\n{'='*60}")
    print(f"Extraction complete: {len(results)}/{len(pdfs)} files processed")
    print(f"Output directory: {EXTRACT_DIR}")
    print(f"\nNext steps:")
    print(f"  1. Review extracted text files")
    print(f"  2. Manually fill in answers and fix OCR errors")
    print(f"  3. Run build_data.py to generate final data files")

if __name__ == "__main__":
    main()

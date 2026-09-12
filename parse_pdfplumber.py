import pdfplumber
from pathlib import Path

PDF_PATH = Path("csp_extracted/cspj2025.pdf")

if not PDF_PATH.exists():
    print("PDF文件不存在!")
    exit(1)

print("正在用pdfplumber读取PDF...")
all_text = ""
with pdfplumber.open(PDF_PATH) as pdf:
    total_pages = len(pdf.pages)
    print(f"共 {total_pages} 页")
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            all_text += text + "\n"
        print(f"已读取第 {i+1} 页，当前总字符数 {len(all_text)}")

# 保存文本
output_path = Path("csp_extracted/cspj2025_full.txt")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(all_text)
print(f"文本已保存到 {output_path}")
print("\n前5000字符预览:")
print(all_text[:5000])

import os
from PyPDF2 import PdfReader
from pathlib import Path

PDF_PATH = Path("csp_extracted/cspj2025.pdf")

if not PDF_PATH.exists():
    print("PDF文件不存在!")
    exit(1)

print("正在用PyPDF2读取PDF...")
reader = PdfReader(str(PDF_PATH))
total_pages = len(reader.pages)
print(f"共 {total_pages} 页")

all_text = ""
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    if text:
        all_text += text + "\n"
    print(f"已读取第 {i+1} 页，当前总字符数 {len(all_text)}")

# 保存文本
output_path = Path("csp_extracted/cspj2025_pypdf2.txt")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(all_text)
print(f"文本已保存到 {output_path}")
print("\n前3000字符预览:")
print(all_text[:3000])

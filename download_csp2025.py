import requests
import pdfplumber
import os
import re
import json
from pathlib import Path

# 1. 下载2025年CSP-J初赛真题PDF
PDF_URL = "https://www.noi.cn/ccf/contentcore/resource/download?ID=FE3A02AAC09506FDB9FED338389C460AE26CDC381F47BDDCFF956C2E37E7E4F8"
PDF_PATH = Path("csp_extracted/cspj2025.pdf")

# 创建目录
os.makedirs("csp_extracted", exist_ok=True)

# 下载PDF
print("正在下载2025年CSP-J初赛真题PDF...")
response = requests.get(PDF_URL, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.noi.cn/"
})
if response.status_code == 200:
    with open(PDF_PATH, "wb") as f:
        f.write(response.content)
    print(f"PDF下载成功，保存到 {PDF_PATH}，大小 {len(response.content)} 字节")
else:
    print(f"下载失败，状态码: {response.status_code}")
    exit(1)

# 2. 解析PDF内容
print("正在解析PDF内容...")
all_text = ""
with pdfplumber.open(PDF_PATH) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            all_text += text + "\n"

# 保存原始文本
with open("csp_extracted/cspj2025_raw.txt", "w", encoding="utf-8") as f:
    f.write(all_text)
print("PDF文本已保存到 csp_extracted/cspj2025_raw.txt")
print(f"总字符数: {len(all_text)}")
# 打印前2000字符看看结构
print("\n前2000字符:")
print(all_text[:2000])

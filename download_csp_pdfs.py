#!/usr/bin/env python3
"""尝试下载 CSP-J/S 第一轮 PDF 试题"""
import os
import sys
import time
import requests

# CSP-J/S 第一轮真题 PDF 的候选 URL 列表
# 来源：CCF 官方 NOI 网、常见镜像
URL_CANDIDATES = {}

# 已知的 CSP-J/S 第一轮发布新闻链接（可能需要从新闻页中提取 PDF 链接）
NEWS_URLS = [
    "https://www.noi.cn/xw/2025-09-01/888765.shtml",
    "https://www.noi.cn/xw/2024-09-22/843442.shtml",
    "https://www.noi.cn/xw/2023-09-17/789442.shtml",
    "https://www.noi.cn/xw/2022-09-17/768442.shtml",
    "https://www.noi.cn/xw/2021-09-17/742442.shtml",
    "https://www.noi.cn/xw/2020-09-17/723442.shtml",
]

# CCF 官方直接下载链接模式（从历史规律推测）
# 格式: https://www.noi.cn/upload/resources/file/YEAR/MONTH/DAY/FILEID.pdf
DIRECT_PDF_URLS = [
    # 2024 CSP-J/S
    "https://www.noi.cn/upload/resources/file/2024/09/20/457892.pdf",
    "https://www.noi.cn/upload/resources/file/2024/09/20/457893.pdf",
    "https://www.noi.cn/ccf/contentcore/resource/download?ID=843442",
    # 2023
    "https://www.noi.cn/upload/resources/file/2023/09/17/438976.pdf",
    "https://www.noi.cn/ccf/contentcore/resource/download?ID=789442",
    # 尝试普遍模式
    "https://www.noi.cn/ccf/contentcore/resource/download?ID=457892",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://www.noi.cn/",
}

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_pdfs")
os.makedirs(SAVE_DIR, exist_ok=True)

def try_download(url, name):
    """尝试下载一个文件"""
    for attempt in range(2):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
            content_type = resp.headers.get("Content-Type", "")
            if resp.status_code == 200 and len(resp.content) > 10000:
                # 检查是否为 PDF
                if b"%PDF" in resp.content[:20] or "pdf" in content_type.lower():
                    path = os.path.join(SAVE_DIR, name)
                    with open(path, "wb") as f:
                        f.write(resp.content)
                        print(f"  ✓ 已下载 {name} ({len(resp.content)} bytes)")
                        return path
                else:
                    print(f"  ✗ {url[:60]}... 不是PDF (Content-Type: {content_type}, 前20字节: {resp.content[:20]})")
                    return None
            else:
                print(f"  ✗ 状态码 {resp.status_code}, 大小 {len(resp.content)} bytes")
                return None
        except Exception as e:
            print(f"  ✗ 尝试 {attempt+1} 失败: {e}")
            time.sleep(1)
    return None

def main():
    print("=" * 60)
    print("CSP-J/S 第一轮 PDF 下载尝试")
    print("=" * 60)

    results = {}

    # 方法 1: 从新闻页提取 PDF 链接
    print("\n▶ 方法 1: 从新闻页扫描 PDF 下载链接...")
    for news_url in NEWS_URLS:
        try:
            resp = requests.get(news_url, headers=HEADERS, timeout=10)
            if resp.status_code == 200:
                text = resp.text
                # 搜索 PDF 链接
                import re
                pdf_links = re.findall(r'href="([^"]*\.pdf)"', text)
                pdf_links += re.findall(r'src="([^"]*\.pdf)"', text)
                if pdf_links:
                    print(f"  从 {news_url} 找到 {len(pdf_links)} 个PDF链接")
                    for i, link in enumerate(pdf_links):
                        if not link.startswith("http"):
                            link = "https://www.noi.cn" + link
                        name = f"news_{i}_{os.path.basename(link.split('?')[0])}"
                        if not name.endswith(".pdf"):
                            name += ".pdf"
                        result = try_download(link, name)
                        if result:
                            results[name] = result
                else:
                    print(f"  {news_url} - 状态码 {resp.status_code}, 未找到PDF链接 (页面长度: {len(text)})")
            else:
                print(f"  {news_url} - 状态码 {resp.status_code}")
        except Exception as e:
            print(f"  {news_url} - 错误: {e}")
        time.sleep(0.5)

    # 方法 2: 直接 URL 猜测下载
    print("\n▶ 方法 2: 直接下载链接...")
    for i, url in enumerate(DIRECT_PDF_URLS):
        name = f"direct_{i}.pdf"
        result = try_download(url, name)
        if result:
            results[name] = result
        time.sleep(0.5)

    # 方法 3: 尝试 CCF 下载接口的不同 ID
    print("\n▶ 方法 3: 扫描 CCF contentcore 下载接口...")
    # 从 CCF 常见 ID 范围扫描
    for file_id in range(450000, 460000, 100):
        url = f"https://www.noi.cn/ccf/contentcore/resource/download?ID={file_id}"
        name = f"ccf_{file_id}.pdf"
        result = try_download(url, name)
        if result:
            results[name] = result
        time.sleep(0.2)

    print("\n" + "=" * 60)
    if results:
        print(f"成功下载 {len(results)} 个文件到 {SAVE_DIR}")
        for name, path in results.items():
            print(f"  {name}")
    else:
        print("所有自动下载渠道均失败")
        print(f"\n请手动下载 CSP-J/S 第一轮 PDF 到: {SAVE_DIR}")
        print("来源建议:")
        print("  1. https://www.noi.cn/ - 历年资料/题目与数据")
        print("  2. 搜索 'CSP-J 20XX 第一轮 试题 PDF'")
    print("=" * 60)
    return results

if __name__ == "__main__":
    main()

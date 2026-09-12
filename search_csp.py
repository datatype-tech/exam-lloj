# -*- coding: utf-8 -*-
"""
Search for CSP-J/S articles using accessible search APIs
"""
import os, sys, re, time, json, hashlib, io, urllib.parse
import requests

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
}

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")
os.makedirs(SAVE_DIR, exist_ok=True)

def fetch(url):
    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        if r.status_code == 200:
            r.encoding = r.apparent_encoding or "utf-8"
            return r.text
        return ""
    except:
        return ""

def clean_html(raw):
    if not raw: return ""
    text = re.sub(r'<script[^>]*>.*?</script>', '', raw, flags=re.DOTALL|re.I)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL|re.I)
    text = re.sub(r'<(br|p|div|li|h[1-6]|td|tr)[^>]*>', '\n', text, flags=re.I)
    text = re.sub(r'</(p|div|li|h[1-6]|tr)[^>]*>', '\n', text, flags=re.I)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'&#x([0-9a-fA-F]+);', lambda m: chr(int(m.group(1),16)), text)
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def main():
    print("Searching for CSP-J/S articles...")
    
    # Try Bing search
    queries = [
        "CSP-J 2023 第一轮 试题 答案 解析 site:blog.csdn.net",
        "CSP-J 2022 第一轮 试题 答案 解析 site:blog.csdn.net",
        "CSP-S 2024 第一轮 试题 答案 解析 site:blog.csdn.net",
        "CSP-J 2024 入门组 初赛 第一轮 阅读程序 完善程序",
    ]
    
    for q in queries:
        encoded_q = urllib.parse.quote(q)
        url = f"https://cn.bing.com/search?q={encoded_q}&ensearch=0"
        print(f"\n[Bing] {q[:60]}")
        html = fetch(url)
        if html:
            # Extract result URLs
            urls = re.findall(r'<h2><a[^>]*href="([^"]+)"', html)
            print(f"  Found {len(urls)} results")
            for u in urls[:5]:
                print(f"    {u[:80]}")
        time.sleep(1)
    
    # Try fetching specific known CSDN articles
    # From the earlier successful fetch, we know these patterns work
    known_articles = [
        # 2024 J - already fetched
        ("j2024_csdn1", "https://blog.csdn.net/lq1990717/article/details/142548081"),
        ("j2024_csdn2", "https://blog.csdn.net/ya888g/article/details/142438769"),
        # Try to find 2023 J
        ("j2023_try1", "https://blog.csdn.net/lq1990717/article/details/133023456"),
        ("j2023_try2", "https://blog.csdn.net/ya888g/article/details/132934567"),
        ("j2023_try3", "https://blog.csdn.net/m0_50162049/article/details/133168089"),
        # Try 2022
        ("j2022_try1", "https://blog.csdn.net/lq1990717/article/details/126823456"),
        ("j2022_try2", "https://blog.csdn.net/ya888g/article/details/126934567"),
        # Try 2021
        ("j2021_try1", "https://blog.csdn.net/lq1990717/article/details/118234567"),
        # Try 2020
        ("j2020_try1", "https://blog.csdn.net/lq1990717/article/details/109234567"),
    ]
    
    for name, url in known_articles:
        print(f"\n[{name}] {url}")
        html = fetch(url)
        if html:
            text = clean_html(html)
            csp_score = text.count('CSP') + text.count('csp') + len(re.findall(r'格雷码|二进制|二叉树|时间复杂度|入栈|初赛|第.*轮|单项选择|阅读程序|完善程序', text))
            if csp_score > 3:
                print(f"  [MATCH] CSP content (score={csp_score}, len={len(text)})")
                path = os.path.join(SAVE_DIR, f"{name}.txt")
                with open(path, "w", encoding="utf-8") as f:
                    f.write(text[:100000])
                print(f"  Saved")
            else:
                print(f"  [SKIP] score={csp_score}, len={len(text)}")
        else:
            print(f"  [SKIP] No response")
        time.sleep(0.5)

if __name__ == "__main__":
    main()

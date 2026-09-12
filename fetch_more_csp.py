# -*- coding: utf-8 -*-
"""
Fetch CSP-J/S first round papers from multiple accessible URLs
"""
import os, sys, re, time, json, hashlib, io
import requests
from urllib.parse import quote

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://www.baidu.com/",
}

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")
os.makedirs(SAVE_DIR, exist_ok=True)

def fetch_page(url):
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20)
        if resp.status_code == 200:
            resp.encoding = resp.apparent_encoding or "utf-8"
            return resp.text
        return ""
    except:
        return ""

def clean_html(html_text):
    if not html_text:
        return ""
    text = re.sub(r'<script[^>]*>.*?</script>', '', html_text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<(br|p|div|li|h[1-6]|td)[^>]*>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</(p|div|li|h[1-6]|tr)[^>]*>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&#x([0-9a-fA-F]+);', lambda m: chr(int(m.group(1), 16)), text)
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def main():
    print("Fetching CSP-J/S first round papers...")
    
    # Try sources that might work
    targets = [
        # CSP-J 2024 from qq doc
        ("csp-j-2024-doc",
         "https://docs.qq.com/doc/DYnlpvcVFzY09IWHd1"),
        # CSP-J 2024 from gitee
        ("csp-j-2024-gitee",
         "https://gitee.com/api/v5/repos/csp-j/csp-j-2024/contents/"),
        # AlgOJ - known educational site
        ("csp-j-2024-alg",
         "https://www.algocq.com/post/csp-j-2024-firstround"),
        # CSP blog
        ("csp-j-2024-b",
         "https://csp.tianqihoubao.com/j/2024.html"),
        # Alternative sources 
        ("csp-j-2024-c",
         "https://iota-ljh.github.io/csp-j-2024.html"),
        ("csp-j-2024-d",
         "https://xuegong.njupt.edu.cn/csp-j-2024-first"),
        # Try to find pages on baidu baike
        ("baike-csp-2024",
         "https://baike.baidu.com/item/CSP-J%2FS2024"),
    ]
    
    for name, url in targets:
        print(f"\n[{name}]")
        html = fetch_page(url)
        if html:
            text = clean_html(html)
            path = os.path.join(SAVE_DIR, f"{name}.txt")
            with open(path, "w", encoding="utf-8") as f:
                f.write(text[:50000])
            print(f"  Saved {len(text)} chars")
            # Check if it has CSP content
            if 'CSP' in text or 'csp' in text:
                # Find questions
                questions = re.findall(r'\d{1,2}[．.\)）][^?\n]*\?', text[:50000])
                print(f"  Found {len(questions)} potential questions")
                for q in questions[:3]:
                    print(f"    {q[:60]}")
        else:
            print(f"  No content")
        time.sleep(0.5)

if __name__ == "__main__":
    main()

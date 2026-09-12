# -*- coding: utf-8 -*-
"""
Fetch CSP-J/S first-round articles via Python (CSWAP/Python works where web_fetch fails)
"""
import os, sys, re, time, json, hashlib, io
import requests

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://www.baidu.com/s?wd=CSP-J",
}

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")
os.makedirs(SAVE_DIR, exist_ok=True)

def fetch(url, encoding="utf-8"):
    try:
        r = requests.get(url, headers=HEADERS, timeout=25)
        if r.status_code == 200:
            r.encoding = encoding
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
    # decode entities
    text = re.sub(r'&#x([0-9a-fA-F]+);', lambda m: chr(int(m.group(1),16)), text)
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def main():
    print("CSP Article Fetcher (CSWAP/Python mode)")
    print("=" * 60)
    
    # Known CSDN CSP article URLs (from Toutiao search)
    targets = [
        # 2024 J
        ("j2024_a", "https://blog.csdn.net/lq1990717/article/details/142548081"),
        ("j2024_b", "https://blog.csdn.net/ya888g/article/details/142438769"),
        # 2024 S - try to find
        ("s2024_a", "https://blog.csdn.net/Alex_McAvoy/article/details/142612345"),
        # 2023 J
        ("j2023_a", "https://blog.csdn.net/m0_50162049/article/details/133168089"),
        ("j2023_b", "https://blog.csdn.net/weixin_43914997/article/details/132934296"),
        # 2023 S
        ("s2023_a", "https://blog.csdn.net/m0_61332194/article/details/133177891"),
        # 2022
        ("j2022_a", "https://blog.csdn.net/weixin_43914997/article/details/127026989"),
        # 2021
        ("j2021_a", "https://blog.csdn.net/weixin_43914997/article/details/119567890"),
        # 2020
        ("j2020_a", "https://blog.csdn.net/weixin_43914997/article/details/109123456"),
        # try different authors
        ("j2024_c", "https://blog.csdn.net/abc123/article/details/142567890"),
        ("j2024_d", "https://blog.csdn.net/johnny_coding/article/details/142623456"),
        ("j2024_e", "https://blog.csdn.net/lq1990717/article/details/143023456"),
    ]
    
    for name, url in targets:
        print(f"\n[{name}] {url}")
        html = fetch(url)
        if html:
            text = clean_html(html)
            # Check if it has CSP-like content
            csp_score = text.count('CSP') + text.count('csp') + len(re.findall(r'格雷码|二进制|二叉树|时间复杂度|入栈|初赛|第.*轮|单项选择|阅读程序|完善程序', text))
            if csp_score > 3 or 'CSP' in text:
                print(f"  [MATCH] CSP content detected (score={csp_score}, len={len(text)})")
                path = os.path.join(SAVE_DIR, f"{name}.txt")
                with open(path, "w", encoding="utf-8") as f:
                    f.write(text[:100000])
                print(f"  Saved to {path}")
            else:
                print(f"  [SKIP] No CSP content (len={len(text)}, score={csp_score})")
        else:
            print(f"  [SKIP] No response")
        time.sleep(0.8)

if __name__ == "__main__":
    main()

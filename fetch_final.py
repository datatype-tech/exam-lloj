# -*- coding: utf-8 -*-
import os, sys, re, time, json, hashlib, io
import requests

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://so.csdn.net/",
}

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")
os.makedirs(SAVE_DIR, exist_ok=True)

def fetch(url):
    try:
        r = requests.get(url, headers=HEADERS, timeout=25)
        if r.status_code == 200:
            r.encoding = "utf-8"
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
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def save(name, url):
    print(f"\n[{name}]")
    html = fetch(url)
    if html:
        text = clean_html(html)
        score = text.count('CSP') + text.count('csp') + len(re.findall(r'const|二进制|二叉树|哈夫曼|拓扑|格雷码|时间复杂度|初赛|第一轮|阅读程序|完善程序|单项选择', text))
        if score > 3:
            path = os.path.join(SAVE_DIR, f"{name}.txt")
            with open(path, "w", encoding="utf-8") as f:
                f.write(text[:100000])
            print(f"  OK (score={score}, len={len(text)})")
            return True
        print(f"  SKIP (score={score})")
    else:
        print(f"  FAIL")
    return False

def main():
    # 2022 articles - confirmed from search
    save("j2022_lq", "https://blog.csdn.net/lq1990717/article/details/126971665")
    save("j2022_lan", "https://blog.csdn.net/lan_in/article/details/139150340")
    save("j2022_kitty", "https://blog.csdn.net/kittyover/article/details/126933178")
    
    # 2021 - try known authors
    save("j2021_lq", "https://blog.csdn.net/lq1990717/article/details/118926398")
    save("j2021_qpf", "https://blog.csdn.net/Qpeterqiufengyi/article/details/118922784")
    save("j2021_kitty", "https://blog.csdn.net/kittyover/article/details/118933178")
    # From catalogue page: https://blog.csdn.net/lq1990717/article/details/143442733
    
    # 2020 - try known authors
    save("j2020_lq", "https://blog.csdn.net/lq1990717/article/details/109234567")
    save("j2020_kitty", "https://blog.csdn.net/kittyover/article/details/109233178")
    
    # 2024 J (already fetched, confirm)
    # 2023 S - try finding
    save("s2023_lq_all", "https://blog.csdn.net/lq1990717/article/details/142326398")
    
    print("\nDone.")

if __name__ == "__main__":
    main()

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
        score = len(re.findall(r'const|二进制|二叉树|哈夫曼|拓扑|格雷码|时间复杂度|初赛|第一轮|阅读程序|完善程序|单项选择|CSP|栈|队列|链表|遍历', text))
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
    # 2021 J
    save("j2021_lq", "https://blog.csdn.net/lq1990717/article/details/147364642")
    save("j2021_lan", "https://blog.csdn.net/lan_in/article/details/139150163")
    save("j2021_frank", "https://blog.csdn.net/frank2102/article/details/136210941")
    save("j2021_lq_c", "https://blog.csdn.net/lq1990717/article/details/142146891")
    
    # 2020 J
    save("j2020_zsj", "https://blog.csdn.net/zsjzliziyang/article/details/109060410")
    save("j2020_shq", "https://blog.csdn.net/shqjava/article/details/119859334")
    
    # 2025 J
    save("j2025_st", "https://blog.csdn.net/weixin_46785057/article/details/151895273")
    save("j2025_wm", "https://blog.csdn.net/wmh0122/article/details/151895446")
    
    # Additional 2024
    save("j2024_lan", "https://blog.csdn.net/lan_in/article/details/142827215")
    
    # Additional 2023 sources
    save("j2023_dll", "https://blog.csdn.net/dllglvzhenfeng/article/details/132938834")
    
    print("\nDone.")

if __name__ == "__main__":
    main()

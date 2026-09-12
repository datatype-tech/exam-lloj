# -*- coding: utf-8 -*-
"""
Fetch CSP-J/S first round articles from known CSDN URLs
"""
import os, sys, re, time, json, hashlib, io
import requests

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://so.csdn.net/so/search/s.do?q=CSP-J",
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
    text = re.sub(r'<(br|p|div|li|h[1-6]|td|tr|figcaption)[^>]*>', '\n', text, flags=re.I)
    text = re.sub(r'</(p|div|li|h[1-6]|tr)[^>]*>', '\n', text, flags=re.I)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'&#x([0-9a-fA-F]+);', lambda m: chr(int(m.group(1),16)), text)
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&lt;', '<', text)
    text = re.sub(r'&gt;', '>', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def main():
    print("CSP-J/S Article Fetcher")
    print("=" * 60)
    
    targets = [
        # 2023 J articles
        ("j2023_lq_all", "https://blog.csdn.net/lq1990717/article/details/132926398"),
        ("j2023_qpf", "https://blog.csdn.net/Qpeterqiufengyi/article/details/132922784"),
        ("j2023_gpy", "https://blog.csdn.net/gupuyi2012/article/details/132921234"),
        ("j2023_nb", "https://blog.csdn.net/nicholas_boy/article/details/141663875"),
        ("j2023_aa", "https://blog.csdn.net/as_asdf/article/details/150390294"),
        ("j2023_lq_read", "https://blog.csdn.net/lq1990717/article/details/133146141"),
        # 2022 J
        ("j2022_a", "https://blog.csdn.net/lq1990717/article/details/127026989"),
        ("j2022_b", "https://blog.csdn.net/it_scratch/article/details/126726577"),
        # 2021 J
        ("j2021_a", "https://blog.csdn.net/Qpeterqiufengyi/article/details/118923456"),
        ("j2021_b", "https://blog.csdn.net/lq1990717/article/details/119567890"),
        # 2020 J
        ("j2020_a", "https://blog.csdn.net/Qpeterqiufengyi/article/details/109234567"),
        ("j2020_b", "https://blog.csdn.net/lq1990717/article/details/109123456"),
        # 2024 S
        ("s2024_lq", "https://blog.csdn.net/lq1990717/article/details/142612345"),
        # 2023 S
        ("s2023_lq_read", "https://blog.csdn.net/lq1990717/article/details/142206465"),
        # Additional from search
        ("j2023_dll", "https://blog.csdn.net/dllglvzhenfeng/article/details/132938834"),
        ("j2023_fj", "https://blog.csdn.net/fjalali001/article/details/133487218"),
        ("j2023_bd", "https://blog.csdn.net/baby_dinosaur/article/details/132943839"),
    ]
    
    for name, url in targets:
        print(f"\n[{name}] {url}")
        html = fetch(url)
        if html:
            text = clean_html(html)
            csp_score = text.count('CSP') + text.count('csp') + len(re.findall(r'格雷码|二进制|二叉树|时间复杂度|入栈|初赛|第.*轮|单项选择|阅读程序|完善程序|哈夫曼|拓扑排序|const|unsigned|时间复杂度', text))
            if csp_score > 3:
                print(f"  [MATCH] score={csp_score}, len={len(text)}")
                path = os.path.join(SAVE_DIR, f"{name}.txt")
                with open(path, "w", encoding="utf-8") as f:
                    f.write(text[:100000])
                print(f"  Saved")
                # Show first question if any
                q_match = re.search(r'(\d{1,2}[．.\)）].*?[A-D][．.\)、].*?)(?:\n|$)', text[:5000])
                if q_match:
                    print(f"  First Q: {q_match.group(0)[:80]}")
            else:
                print(f"  [SKIP] score={csp_score}, len={len(text)}")
        else:
            print(f"  [SKIP] No response")
        time.sleep(0.8)

if __name__ == "__main__":
    main()

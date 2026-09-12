# -*- coding: utf-8 -*-
"""
CSP-J/S PDF downloader - fix encoding
"""
import os, sys, re, time, json, hashlib, io
import requests

# Force UTF-8 output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
}

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_pdfs")
os.makedirs(SAVE_DIR, exist_ok=True)

found_pdfs = []

def download_pdf(url, name, referer=None):
    h = dict(HEADERS)
    if referer:
        h["Referer"] = referer
    try:
        resp = requests.get(url, headers=h, timeout=20, allow_redirects=True)
        if resp.status_code == 200 and len(resp.content) > 5000:
            if b"%PDF" in resp.content[:1024]:
                path = os.path.join(SAVE_DIR, name)
                with open(path, "wb") as f:
                    f.write(resp.content)
                print(f"  [OK] {name} ({len(resp.content)//1024}KB)")
                return path
            else:
                ct = resp.headers.get("Content-Type", "?")
                print(f"  [--] skip: {url[:60]} (type: {ct})")
        else:
            print(f"  [404] {url[:60]} (status={resp.status_code}, size={len(resp.content)})")
    except Exception as e:
        print(f"  [ERR] {str(e)[:60]}")
    return None

def scan_page_pdfs(url):
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            return []
        text = resp.text
        # direct .pdf links
        links = re.findall(r'https?://[^\s"\'<>]+\.pdf', text, re.IGNORECASE)
        # noi.cn ccf download API
        links += re.findall(r'https?://www\.noi\.cn/ccf/contentcore/resource/download\?ID=[A-Za-z0-9+/=]+', text)
        # relative download links
        rel = re.findall(r'(?:href|src)="(/ccf/contentcore/resource/download\?[^"]+)"', text)
        for r in rel:
            links.append("https://www.noi.cn" + r)
        return list(set(links))
    except:
        return []

def main():
    print("=" * 60)
    print("CSP-J/S PDF fetcher")
    print("=" * 60)

    # Source 1: main page
    print("\n[1] Scanning noi.cn homepage...")
    links = scan_page_pdfs("https://www.noi.cn/")
    print(f"    Found {len(links)} potential PDF links")
    for l in links[:3]:
        print(f"    > {l[:80]}")

    # Source 2: lnzl page (past papers)
    print("\n[2] Scanning lnzl page...")
    for url in ["https://www.noi.cn/zxzy/lnzl/", "https://www.noi.cn/zxzy/lnzl/jszl/"]:
        links = scan_page_pdfs(url)
        print(f"    {url} -> {len(links)} links")
        for l in links[:5]:
            print(f"      {l[:80]}")

    # Source 3: news pages for CSP
    print("\n[3] Scanning news pages for CSP announcements...")
    try:
        resp = requests.get("https://www.noi.cn/xw/", headers=HEADERS, timeout=15)
        if resp.status_code == 200:
            news = re.findall(r'href="(/xw/\d{4}-\d{2}-\d{2}/\d+\.shtml)"', resp.text)
            csp_news = []
            for n in news[:30]:
                full = "https://www.noi.cn" + n
                try:
                    r2 = requests.get(full, headers=HEADERS, timeout=8)
                    title_m = re.search(r'<title>([^<]+)</title>', r2.text)
                    title = title_m.group(1) if title_m else ""
                    if any(kw in title for kw in ["CSP", "csp", "认证", "第一轮"]):
                        csp_news.append((full, title))
                except:
                    pass
            print(f"    Found {len(csp_news)} CSP-related news articles")
            for url, title in csp_news[:5]:
                print(f"    [{title[:40]}] {url}")
                # scan this news page for PDFs
                pdfs = scan_page_pdfs(url)
                for i, p in enumerate(pdfs):
                    name = f"csp_{hashlib.md5(p.encode()).hexdigest()[:8]}.pdf"
                    result = download_pdf(p, name, referer=url)
                    if result:
                        found_pdfs.append(result)
                    time.sleep(0.3)
    except Exception as e:
        print(f"    Error: {e}")

    # Source 4: try known CDN paths
    print("\n[4] Trying known CDN patterns...")
    known_paths = [
        "https://www.noi.cn/upload/resources/file/2024/09/22/457892.pdf",
        "https://www.noi.cn/upload/resources/file/2023/09/18/447892.pdf",
        "https://www.noi.cn/upload/resources/file/2022/09/18/437892.pdf",
        "https://www.noi.cn/upload/resources/file/2021/09/18/427892.pdf",
        "https://www.noi.cn/upload/resources/file/2020/09/18/417892.pdf",
    ]
    for i, url in enumerate(known_paths):
        name = f"noi_direct_{i}.pdf"
        result = download_pdf(url, name)
        if result:
            found_pdfs.append(result)
        time.sleep(0.3)

    # Source 5: CCF download API with known IDs
    print("\n[5] Scanning CCF download API...")
    # From the CSP-J/S 2025 page we already found the download IDs
    # Try various ID patterns
    for id_val in ["FE3A02AAC09506FDB9FED338389C460AE26CDC381F47BDDCFF956C2E37E7E4F8",
                   "843442", "789442", "7684442", "742442", "723442"]:
        url = f"https://www.noi.cn/ccf/contentcore/resource/download?ID={id_val}"
        result = download_pdf(url, f"ccf_{id_val[:16]}.pdf")
        if result:
            found_pdfs.append(result)

    # Summary
    print("\n" + "=" * 60)
    if found_pdfs:
        print(f"SUCCESS: Downloaded {len(found_pdfs)} PDF files:")
        for p in found_pdfs:
            sz = os.path.getsize(p) // 1024
            print(f"  {os.path.basename(p)} ({sz}KB)")
    else:
        print("FAILED: Could not automatically download any CSP PDF files.")
        print(f"\nPlease manually download CSP-J/S PDFs to: {SAVE_DIR}")
        print("Sources to try:")
        print("  - https://www.noi.cn/zxzy/lnzl/ (scroll to past years)")
        print("  - https://www.ccf.org.cn/ (CSP section)")
        print("  - Provincial education exam sites")
        print("\nAfter downloading PDF files, run: python extract_csp.py")
        print("=" * 60)

if __name__ == "__main__":
    main()

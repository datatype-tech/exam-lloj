# -*- coding: utf-8 -*-
"""
CSP PDF Fetcher v2 - with session handling and better detection
"""
import os, sys, re, time, json, hashlib, io
import requests
from urllib.parse import urljoin

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
}

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_pdfs")
os.makedirs(SAVE_DIR, exist_ok=True)

def main():
    print("=" * 60)
    print("CSP-J/S PDF Fetcher v2")
    print("=" * 60)

    session = requests.Session()
    session.headers.update(HEADERS)

    # Step 1: Get cookies from main page
    print("\n[1] Establishing session with noi.cn...")
    try:
        r = session.get("https://www.noi.cn/", timeout=15)
        print(f"    Homepage: status={r.status_code}, cookies={len(session.cookies)}")
        # Print all cookies
        for c in session.cookies:
            print(f"      {c.name}={c.value[:20]}...")
    except Exception as e:
        print(f"    Error: {e}")

    # Step 2: Access lnzl index and extract ALL links
    print("\n[2] Fetching lnzl page index...")
    all_news_links = []
    for page_url in ["https://www.noi.cn/zxzy/lnzl/jszl/",
                     "https://www.noi.cn/zxzy/lnzl/jszl/index_2.shtml",
                     "https://www.noi.cn/zxzy/lnzl/jszl/index_3.shtml"]:
        try:
            r = session.get(page_url, timeout=15)
            print(f"    {page_url} -> status={r.status_code}")
            if r.status_code == 200:
                # Find all news links
                links = re.findall(r'<a[^>]*href="(/zxzy/lnzl/jszl/\d{4}-\d{2}-\d{2}/\d+\.shtml)"[^>]*>', r.text)
                titles = re.findall(r'<a[^>]*href="/zxzy/lnzl/jszl/\d{4}-\d{2}-\d{2}/\d+\.shtml"[^>]*>([^<]+)</a>', r.text)
                for i, link in enumerate(links):
                    title = titles[i] if i < len(titles) else "?"
                    full_url = "https://www.noi.cn" + link
                    all_news_links.append((full_url, title))
                    print(f"      [{title[:50]}]")
        except Exception as e:
            print(f"    Error: {e}")
        time.sleep(0.5)

    # Step 3: Scan CSP-related news for PDF links
    print(f"\n[3] Found {len(all_news_links)} total news, scanning CSP-related ones...")
    csp_pattern = re.compile(r'CSP|csp|认证|NOIP|noip', re.IGNORECASE)
    found_pdfs = []

    for url, title in all_news_links:
        if not csp_pattern.search(title):
            continue
        print(f"\n  Scanning: [{title[:50]}]")
        try:
            r = session.get(url, timeout=15)
            if r.status_code != 200:
                print(f"    status={r.status_code}")
                continue

            # Find ALL download links in the page
            # Pattern 1: direct .pdf
            pdfs = re.findall(r'https?://[^\s"\'<>]+\.pdf', r.text, re.IGNORECASE)
            # Pattern 2: ccf download API
            pdfs += re.findall(r'/ccf/contentcore/resource/download\?ID=[A-Za-z0-9+/=]+', r.text)

            if pdfs:
                print(f"    Found {len(pdfs)} PDF link(s)")
                for p in pdfs:
                    if p.startswith("/"):
                        p = "https://www.noi.cn" + p
                    print(f"      {p[:100]}")
                    # Try to download
                    try:
                        resp = session.get(p, timeout=20, allow_redirects=True)
                        if resp.status_code == 200 and len(resp.content) > 5000:
                            if b"%PDF" in resp.content[:1024]:
                                h = hashlib.md5(p.encode()).hexdigest()[:12]
                                name = f"csp_{h}.pdf"
                                path = os.path.join(SAVE_DIR, name)
                                with open(path, "wb") as f:
                                    f.write(resp.content)
                                print(f"      >> SAVED: {name} ({len(resp.content)//1024}KB)")
                                found_pdfs.append(path)
                            else:
                                print(f"      >> Not PDF (type: {resp.headers.get('Content-Type','?')})")
                        else:
                            print(f"      >> Failed: status={resp.status_code}, size={len(resp.content)}")
                    except Exception as e:
                        print(f"      >> Download error: {str(e)[:40]}")
                    time.sleep(0.5)
            else:
                print(f"    No PDF links in page")
        except Exception as e:
            print(f"    Error: {e}")

    # Step 4: Summary
    print("\n" + "=" * 60)
    if found_pdfs:
        print(f"SUCCESS: Downloaded {len(found_pdfs)} PDF files:")
        for p in found_pdfs:
            print(f"  {os.path.basename(p)} ({os.path.getsize(p)//1024}KB)")
    else:
        print("FAILED: Could not download any CSP PDF files.")
        print(f"\nPlease manually download PDFs to: {SAVE_DIR}")
        print("\nSteps:")
        print(f"  1. Visit https://www.noi.cn/zxzy/lnzl/jszl/ in your browser")
        print(f"  2. Find CSP-J/S entries for each year")
        print(f"  3. Download PDFs to: {SAVE_DIR}")
        print(f"  4. Then run: python extract_csp.py")
    print("=" * 60)

if __name__ == "__main__":
    main()

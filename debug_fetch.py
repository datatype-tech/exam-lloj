# -*- coding: utf-8 -*-
import os, sys, re, io
import requests

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
}

session = requests.Session()
session.headers.update(HEADERS)

# First get cookies
session.get("https://www.noi.cn/", timeout=15)

# Fetch the lnzl page
url = "https://www.noi.cn/zxzy/lnzl/jszl/"
print(f"Fetching: {url}")
r = session.get(url, timeout=15)
print(f"Status: {r.status_code}")
print(f"Content length: {len(r.text)}")
print(f"Content-Type: {r.headers.get('Content-Type', '?')}")

# Save raw HTML
with open("debug_lnzl.html", "w", encoding="utf-8") as f:
    f.write(r.text)

# Show first 3000 chars
print("\n--- First 3000 chars ---")
print(r.text[:3000])

# Look for any link patterns
print("\n--- Link patterns found ---")
links1 = re.findall(r'href="([^"]*\.shtml)"[^>]*>([^<]+)<', r.text)
print(f"Pattern 1 (shtml links): {len(links1)}")
for l, t in links1[:10]:
    print(f"  [{t[:50]}] {l[:80]}")

links2 = re.findall(r'href="(/[^"]+)"[^>]*>([^<]*(?:CSP|csp|认证|NOIP)[^<]*)<', r.text, re.IGNORECASE)
print(f"\nPattern 2 (CSP-related links): {len(links2)}")
for l, t in links2:
    print(f"  [{t[:50]}] {l[:80]}")

# Look for download links
print("\n--- Download API links ---")
dlinks = re.findall(r'(/ccf/contentcore/resource/download\?ID=[^"\'<>\s]{10,})', r.text)
print(f"Download links: {len(dlinks)}")
for d in dlinks[:10]:
    print(f"  https://www.noi.cn{d}")

# -*- coding: utf-8 -*-
"""
Fetch CSP-J/S first-round text from accessible URLs
"""
import os, sys, re, time, json, hashlib, io
import requests

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
        else:
            print(f"  Status {resp.status_code}")
            return ""
    except Exception as e:
        print(f"  Error: {e}")
        return ""

def clean_html(html):
    """Remove HTML tags and clean text"""
    if not html:
        return ""
    # Remove scripts and styles
    text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)
    # Replace block-level tags with newlines
    text = re.sub(r'<(br|p|div|li|h[1-6])[^>]*>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</(p|div|li|h[1-6]|tr)[^>]*>', '\n', text, flags=re.IGNORECASE)
    # Remove remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    # Clean entities
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&lt;', '<', text)
    text = re.sub(r'&gt;', '>', text)
    text = re.sub(r'&quot;', '"', text)
    text = re.sub(r'&#\d+;', '', text)
    # Remove excessive whitespace
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n\s*\n', '\n\n', text)
    return text.strip()

def main():
    print("=" * 60)
    print("CSP-J/S First Round Text Fetcher")
    print("=" * 60)

    targets = [
        ("csp-j-2024-csdn", "https://blog.csdn.net/lq1990717/article/details/142548081"),
        ("csp-j-2024-yaoo", "https://blog.csdn.net/ya888g/article/details/142438769"),
        ("csp-j-2024-cnblogs", "https://www.cnblogs.com/myeln/p/18426404"),
        ("csp-j-2024-net", "https://www.163.com/dy/article/J9QGFT4M0552AN36.html"),
    ]

    results = {}
    for name, url in targets:
        print(f"\n[{name}]")
        print(f"  URL: {url}")
        html = fetch_page(url)
        if html:
            text = clean_html(html)
            # Extract main content (try common patterns)
            # Look for article body
            body_match = re.search(r'<article[^>]*>(.*?)</article>', html, re.DOTALL | re.IGNORECASE)
            if body_match:
                text = clean_html(body_match.group(1))
            else:
                # Try common content divs
                for pattern in [r'<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)</div>',
                               r'<div[^>]*id="[^"]*content[^"]*"[^>]*>(.*?)</div>',
                               r'<div[^>]*class="[^"]*article[^"]*"[^>]*>(.*?)</div>']:
                    m = re.search(pattern, html, re.DOTALL | re.IGNORECASE)
                    if m:
                        text = clean_html(m.group(1))
                        break

            # Save raw and cleaned
            path_raw = os.path.join(SAVE_DIR, f"{name}_raw.html")
            with open(path_raw, "w", encoding="utf-8") as f:
                f.write(html[:200000])  # limit size

            path_txt = os.path.join(SAVE_DIR, f"{name}.txt")
            with open(path_txt, "w", encoding="utf-8") as f:
                f.write(text[:100000])

            print(f"  Saved: {len(text)} chars (HTML: {len(html)})")
            results[name] = text[:50000]

            # Also search for CSP questions in the text
            questions = re.findall(r'\d{1,2}[．.\)）][^？?]*\?', text[:50000])
            if questions:
                print(f"  Found {len(questions)} potential questions")
                for q in questions[:5]:
                    print(f"    {q[:80]}")
        else:
            print(f"  No content fetched")
        time.sleep(0.5)

    # Save all results
    summary_path = os.path.join(SAVE_DIR, "_summary.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        # Save just first 5000 chars of each for summary
        summary = {k: v[:5000] for k, v in results.items()}
        json.dump(summary, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"Fetched {len(results)} pages. See: {SAVE_DIR}")
    print("=" * 60)

if __name__ == "__main__":
    main()

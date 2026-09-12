# -*- coding: utf-8 -*-
import os, sys, re, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")

def clean_text(text):
    text = re.sub(r'&#x([0-9a-fA-F]+);', lambda m: chr(int(m.group(1), 16)), text)
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&lt;', '<', text)
    text = re.sub(r'&gt;', '>', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r' +', ' ', text)
    text = re.sub(r'\\[a-zA-Z]+\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\[a-zA-Z]+', '', text)
    text = re.sub(r'\$+', '', text)
    text = re.sub(r'\{[^}]*\}', '', text)
    text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
    return text.strip()

def read_clean(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return clean_text(f.read())
    except:
        return ""

for fname in ["j2025_wm.txt", "j2025_st.txt", "j2020_zsj.txt"]:
    text = read_clean(os.path.join(SAVE_DIR, fname))
    print(f"\n{'='*60}")
    print(f"{fname}: {len(text)} chars")
    
    # Find non-empty content lines
    lines = text.split('\n')
    content_lines = [(j, l) for j, l in enumerate(lines) if l.strip()]
    
    for j, l in content_lines[:40]:
        print(f"  {j:4d}: {l.strip()[:60]}")
    
    # Check for option-like patterns anywhere
    for j, l in enumerate(lines):
        if re.match(r'^\s*[A-D][．\.\)、\s]', l.strip()):
            print(f"  >>> OPT at line {j}: {l.strip()[:50]}")
            if j > 10:
                break

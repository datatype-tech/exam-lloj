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

text = read_clean(os.path.join(SAVE_DIR, "j2025_wm.txt"))
lines = text.split('\n')

# Print lines around option markers (line 169)
print("Lines 79-200 (section start + options):")
for j in range(79, min(200, len(lines))):
    l = lines[j]
    if l.strip():
        print(f"  {j:4d}: {l.strip()[:70]}")

# Check what the regex would match
print("\nOption pattern matches around line 169:")
pattern = re.compile(r'^([A-D])[．\.\)、\s]+(.*)')
for j in range(160, min(200, len(lines))):
    m = pattern.match(lines[j].strip())
    if m:
        print(f"  line {j}: letter={m.group(1)}, text={m.group(2)[:50]}")

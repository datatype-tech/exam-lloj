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

with open(os.path.join(SAVE_DIR, "j2025_wm.txt"), 'r', encoding='utf-8') as f:
    raw = f.read()

text = clean_text(raw)
lines = text.split('\n')

# Find lines matching 'A ' pattern (options without punctuation)
print("Lines matching 'A 错误' or 'A 正确':")
for j, l in enumerate(lines):
    l_stripped = l.strip()
    if re.match(r'^[A-D]\s+[^\s]', l_stripped):
        print(f"  line {j}: {l_stripped[:60]}")
    if j > 500:
        break

print("\n--- Section markers ---")
# Find '一、单项选择题' or similar
for j, l in enumerate(lines):
    if any(marker in l for marker in ['一、', '选择', '第1题', '单项']):
        print(f"  line {j}: {l.strip()[:60]}")
    if j > 400:
        break

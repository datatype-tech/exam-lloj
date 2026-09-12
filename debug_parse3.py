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

# Read 2024 text
text = read_clean(os.path.join(SAVE_DIR, "j2024_csdn1.txt"))

# Find choice section
start_markers = ['一、单项选择题', '一、单项选择', '一、选择题']
start = -1
for m in start_markers:
    idx = text.find(m)
    if idx >= 0:
        start = idx + len(m)
        break

if start < 0:
    print("ERROR: Cannot find choice section")
    sys.exit(1)

end_markers = ['二、阅读程序', '二、完善程序', '第二部分']
end = len(text)
for m in end_markers:
    idx = text.find(m, start)
    if idx >= 0 and idx < end:
        end = idx

section = text[start:end].strip()
print(f"Section length: {len(section)} chars")
print("="*60)
print("First 600 chars of section:")
print(section[:600])

# Test answer regex
answer_pattern = re.compile(r'答\s*[：:]\s*([A-D])')
alt_pattern = re.compile(r'答\s*[：:]\s*.*?([A-D])')

test_cases = [
    "答：C",
    "答：选B。",
    "答：选 B。",
    "答: B",
    "答：D。",
    "答：A",
]

print("\n" + "="*60)
print("Testing answer patterns:")
for tc in test_cases:
    m1 = answer_pattern.search(tc)
    m2 = alt_pattern.search(tc)
    print(f"  '{tc}' -> strict: {m1.group(1) if m1 else 'None'}, alt: {m2.group(1) if m2 else 'None'}")

# Count potential answer markers
strict_count = len(answer_pattern.findall(section))
alt_count = len(alt_pattern.findall(section))
print(f"\nStrict answer markers found: {strict_count}")
print(f"Alt answer markers found: {alt_count}")

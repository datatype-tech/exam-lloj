# -*- coding: utf-8 -*-
import os, sys, re, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")

# The question numbers might be on the same line as the previous ending
with open(os.path.join(SAVE_DIR, "j2024_csdn1.txt"), "r", encoding="utf-8") as f:
    raw = f.read()

# Check specific patterns
print("Lines with question-like numbers:")
for i, line in enumerate(raw.split('\n')):
    if re.match(r'^\s*\d{1,2}\s*$', line):
        print(f"  Line {i}: '{line.strip()}' (number only)")
        if i + 1 < len(raw.split('\n')):
            next_line = raw.split('\n')[i+1]
            print(f"  Line {i+1}: '{next_line[:80]}'")

# Look for "1" followed by content on same line
print("\nChecking same-line format:")
sample = raw[raw.find('一、单项选择题'):raw.find('一、单项选择题')+2000]
# Split by lines and show no-space-joined
lines = [l for l in sample.split('\n') if l.strip()]
for l in lines[:10]:
    print(f"  [{l[:100]}]")

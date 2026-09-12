# -*- coding: utf-8 -*-
import os, sys, re, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")

# Read raw file
with open(os.path.join(SAVE_DIR, "j2024_csdn1.txt"), "r", encoding="utf-8") as f:
    raw = f.read()

print(f"Raw length: {len(raw)}")
print(f"First 500 chars:\n{raw[:500]}")
print(f"\n--- Looking for 单项选择 ---")
idx = raw.find('一、单项选择题')
print(f"Found at idx: {idx}")

# Check if it has the pattern
print(f"\n--- Checking for question patterns (direct search) ---")
# Direct search in raw text
matches = re.findall(r'^\s*(\d{1,2})[．\.\)）、]\s*.{10,}', raw, re.MULTILINE)
print(f"Question number pattern matches: {len(matches)}")
for m in matches[:5]:
    print(f"  Line: {m[:80]}")

# Also check for common math
print(f"\n--- Raw content after CSP marker ---")
csp_idx = raw.find('CSP-J 2024 入门级')
print(f"Found CSP at idx: {csp_idx}")
print(f"\nContent at that position ({csp_idx}):")
if csp_idx >= 0:
    print(raw[csp_idx:csp_idx+1000])

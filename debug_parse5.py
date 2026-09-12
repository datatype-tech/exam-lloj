# -*- coding: utf-8 -*-
import os, sys, re, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")

with open(os.path.join(SAVE_DIR, "j2020_zsj.txt"), 'r', encoding='utf-8') as f:
    text = f.read()

# Find first 30 occurrences of option-like patterns
found = 0
for m in re.finditer(r'(?:^|\s)[A-D][．\.\)、]', text, re.MULTILINE):
    pos = m.start()
    context = text[max(0,pos-20):pos+40]
    print(f'pos={pos}: {repr(context)}')
    found += 1
    if found >= 30:
        break

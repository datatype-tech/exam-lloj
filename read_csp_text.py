# -*- coding: utf-8 -*-
import os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")

# Read CSDN 2024
path = os.path.join(SAVE_DIR, "csp-j-2024-csdn.txt")
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Decode unicode escapes
print("=" * 60)
print("CSP-J 2024 CSDN Content")
print("=" * 60)
print(text[:5000])

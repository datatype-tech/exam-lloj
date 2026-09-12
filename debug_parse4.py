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

def find_choice_section(text):
    start_markers = ['一、单项选择题', '一、单项选择', '一、选择题']
    start = -1
    for m in start_markers:
        idx = text.find(m)
        if idx >= 0:
            start = idx + len(m)
            break
    if start < 0:
        return ""
    end_markers = ['二、阅读程序', '二、完善程序', '第二部分', '二、程序阅读', '三、完善程序', '三、阅读程序']
    end = len(text)
    for m in end_markers:
        idx = text.find(m, start)
        if idx >= 0 and idx < end:
            end = idx
    return text[start:end].strip()

def parse_questions(section_text, max_q=15):
    questions = []
    if not section_text:
        return questions
    
    lines = section_text.split('\n')
    n = len(lines)
    
    opt_lines = []
    for j in range(n):
        line = lines[j].strip()
        m = re.match(r'^([A-D])[．\.\)、\s]+(.*)', line)
        if m:
            opt_lines.append((j, m.group(1), m.group(2).strip()))
    
    print(f"  Option markers: {len(opt_lines)}")
    
    q_no = 1
    i = 0
    while i < len(opt_lines):
        if opt_lines[i][1] != 'A':
            i += 1
            continue
        if i + 3 >= len(opt_lines):
            break
        if opt_lines[i+1][1] != 'B' or opt_lines[i+2][1] != 'C' or opt_lines[i+3][1] != 'D':
            i += 1
            continue
        
        a_idx = opt_lines[i][0]
        d_idx = opt_lines[i+3][0]
        
        next_a_line = n
        for k in range(i+4, len(opt_lines)):
            if opt_lines[k][1] == 'A':
                next_a_line = opt_lines[k][0]
                break
        
        # Stem
        prev_answer_end = 0
        for k in range(a_idx - 1, -1, -1):
            if re.match(r'^\s*答\s*[：:]', lines[k].strip()):
                prev_answer_end = k + 1
                break
        
        stem_lines = [l.strip() for l in lines[prev_answer_end:a_idx] if l.strip()]
        stem = ' '.join(stem_lines).strip()
        stem = re.sub(r'^\d{1,2}[．\.\)、\s]+', '', stem)
        
        # Options
        options = [opt_lines[i+k][2] for k in range(4)]
        
        # Answer
        answer = None
        ans_line_idx = -1
        for k in range(d_idx + 1, min(next_a_line, n)):
            line = lines[k].strip()
            m = re.match(r'^\s*答\s*[：:]\s*.*?([A-D])', line)
            if m:
                answer = m.group(1)
                ans_line_idx = k
                break
        
        # Analysis
        analysis = ""
        if ans_line_idx >= 0:
            ana_lines = [l.strip() for l in lines[ans_line_idx+1:next_a_line] if l.strip()]
            analysis = ' '.join(ana_lines)[:300].strip()
        
        if stem and len(options) == 4 and answer:
            questions.append({
                "no": q_no,
                "stem": stem,
                "options": options,
                "answer": answer,
                "analysis": analysis,
                "score": 2
            })
            q_no += 1
        
        i += 4
    
    return questions

files = [
    ("j2024_csdn1.txt", "2024 CSDN1"),
    ("j2024_csdn2.txt", "2024 CSDN2"),
    ("j2024_lan.txt", "2024 lan"),
    ("j2023_lq_all.txt", "2023 lq_all"),
    ("j2023_nb.txt", "2023 nb"),
    ("j2022_lq.txt", "2022 lq"),
    ("j2021_lq.txt", "2021 lq"),
    ("j2020_zsj.txt", "2020 zsj"),
    ("j2025_st.txt", "2025 st"),
]

for fname, label in files:
    path = os.path.join(SAVE_DIR, fname)
    if not os.path.exists(path):
        print(f"\n{fname}: MISSING")
        continue
    text = read_clean(path)
    section = find_choice_section(text)
    print(f"\n{label}: section={len(section)} chars, exists={bool(section)}")
    qs = parse_questions(section, 15)
    print(f"  Parsed: {len(qs)} Qs")
    for q in qs:
        print(f"    Q{q['no']:2d}. {q['stem'][:35]}... ans={q['answer']}")

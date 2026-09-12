# -*- coding: utf-8 -*-
"""
Build CSP-J First-Round Database from multiple CSDN sources.
Handles format variance; deduplicates by option fingerprint.
Cleans stem to remove blog-title noise.
"""
import os, sys, re, json, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")
OUT_DIR = os.path.join(os.path.dirname(__file__), "csp_db")
os.makedirs(OUT_DIR, exist_ok=True)

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
    start_markers = [
        '一、单项选择题', '一、单项选择', '一、选择题', '一、选择',
        'CSP-J 20', 'CSP-J20', 'CSP-S 20', 'CSP-S20',
        '选择题', '单项选择', '第1题',
    ]
    start = -1
    for m in start_markers:
        idx = text.find(m)
        if idx >= 0 and (start < 0 or idx < start):
            start = idx + len(m)
    if start < 0:
        return ""

    end_markers = ['二、阅读程序', '二、完善程序', '第二部分', '二、程序阅读',
                   '三、完善程序', '三、阅读程序', '阅读程序题', '完善程序题',
                   '二、程序填空', '三、程序填空']
    end = len(text)
    for m in end_markers:
        idx = text.find(m, start)
        if idx >= 0 and idx < end:
            end = idx
    return text[start:end].strip()

def cleanup_stem(raw_stem_lines):
    """Clean blog-title noise from stem lines.
    The real question stem is usually the LAST 1-2 lines before options.
    Blog titles and analyses are mixed in at the beginning.
    """
    stem_lines = [l.strip() for l in raw_stem_lines if l.strip()]
    
    if not stem_lines:
        return ""
    
    if len(stem_lines) <= 2:
        return ' '.join(stem_lines)
    
    # Many lines: blog title/noise mixed in.
    # Strategy: find lines that look like actual question stems.
    # Question stems typically:
    #   - Start with a number (1. / 1、 / 第1题)
    #   - End with （ ）or （）, 。, ？, ?
    #   - Are reasonably long (> 5 chars)
    
    candidates = []
    for i, line in enumerate(stem_lines):
        if len(line) < 5:
            continue
        # Remove if it looks like blog noise
        if re.match(r'^(原创|版权|阅读|文章|修改|发布于|来自|订阅|收录|当前|CSP初赛|解答信奥|单选题部分|共\d+题|每题|原创|最新)', line):
            continue
        if 'CSDN博客' in line and len(line) < 50:
            continue
        if re.match(r'^[\s·\-\*]+$', line):
            continue
        candidates.append((i, line))
    
    if not candidates:
        # Fallback: return last 2 lines
        return ' '.join(stem_lines[-2:])
    
    # Take the last candidate (right before options) and optionally the one before it
    # if it also starts with a number.
    last_idx, last_line = candidates[-1]
    
    # Check if the line before also starts with a number (multi-stem rare)
    if len(candidates) >= 2:
        prev_idx, prev_line = candidates[-2]
        if prev_idx == last_idx - 1 and re.match(r'^\d', prev_line):
            return prev_line + ' ' + last_line
    
    # If the last_line doesn't end properly but is followed by nothing,
    # combine it with context
    return last_line

def parse_questions(section_text, max_q=50):
    """Parse choice questions from section text."""
    questions = []
    if not section_text:
        return questions

    lines = section_text.split('\n')
    n = len(lines)

    # Collect option markers
    opt_lines = []
    for j in range(n):
        line = lines[j].strip()
        m = re.match(r'^([A-D])[．\.\)、\s]+(.*)', line)
        if m and m.group(2).strip():
            opt_lines.append((j, m.group(1), m.group(2).strip()))

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

        # Stem: non-empty lines between previous answer-end and A
        prev_end = 0
        for k in range(a_idx - 1, -1, -1):
            s = lines[k].strip()
            if re.match(r'^\s*(答|正确答案|【答案】|答案)', s):
                prev_end = k + 1
                break

        raw_stem_lines = [l.strip() for l in lines[prev_end:a_idx] if l.strip()]
        stem = cleanup_stem(raw_stem_lines)

        if not stem or len(stem) < 10:
            i += 4
            continue
        if re.match(r'^(解析|答|名师|原创|文章|版权|转载|发表于|来自|订阅|阅读|二、|三、|四、|五、|选择|阅读|完善|部分)', stem):
            i += 4
            continue

        stem = re.sub(r'^\d{1,2}[．\.\)、\s]+', '', stem)
        stem = re.sub(r'^第?\d+题\s*', '', stem)
        stem = re.sub(r'^选择\s*', '', stem)

        # Final: truncate if stem is still very long (> 200 chars)
        # Try to find the last complete sentence
        if len(stem) > 200:
            # Find the last occurrence of （ ）, （）, or pattern ending with ）
            matches = list(re.finditer(r'[（(][^）)]*[）)]', stem))
            if matches:
                last_match = matches[-1]
                # Go back to find start of this question (find period, newline, or start)
                start_pos = 0
                for sep in ['。', '.', '\n', '；']:
                    pos = stem.rfind(sep, 0, last_match.start())
                    if pos > start_pos:
                        start_pos = pos + 1
                candidate = stem[start_pos:].strip()
                if len(candidate) > 10 and len(candidate) < 200:
                    stem = candidate
                else:
                    # Keep just around the parenthetical
                    stem = stem[last_match.start() - 50:last_match.end()].strip()
                    if len(stem) > 200:
                        stem = stem[:200]

        options = [opt_lines[i+k][2] for k in range(4)]

        # Answer
        answer = None
        ans_line_idx = -1
        for k in range(d_idx + 1, min(next_a_line, n)):
            s = lines[k].strip()
            m = re.match(r'^\s*(?:答|正确答案|【答案】|答案)\s*[：:]?\s*.*?([A-D])', s)
            if m:
                answer = m.group(1)
                ans_line_idx = k
                break

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

def opt_fingerprint(q):
    """Fingerprint based on option texts."""
    opt_text = '|'.join(q['options'])
    clean = re.sub(r'[^\u4e00-\u9fff\w]', '', opt_text)
    return clean[:60]

def build_paper_sources(paper_id, year, level, title, sources):
    all_questions = []
    seen_fps = set()

    for fname in sources:
        path = os.path.join(SAVE_DIR, fname)
        if not os.path.exists(path):
            continue
        text = read_clean(path)
        section = find_choice_section(text)
        if not section:
            section = text[:8000]
        questions = parse_questions(section)
        print(f"  {fname}: {len(questions)} Qs extracted")

        added = 0
        for q in questions:
            fp = opt_fingerprint(q)
            if fp in seen_fps:
                continue
            seen_fps.add(fp)
            all_questions.append(q)
            added += 1
        print(f"    -> {added} new Qs kept")

    for idx, q in enumerate(all_questions):
        q['no'] = idx + 1

    return {
        "paper_id": paper_id,
        "year": year,
        "level": level,
        "title": title,
        "full_score": 100,
        "choice": all_questions,
        "reads": [],
        "completes": []
    }

def main():
    print("=" * 60)
    print("  CSP-J First-Round Database Builder")
    print("=" * 60)

    papers = {}

    papers["2024j"] = build_paper_sources(
        "2024j", 2024, "J", "2024 CCF CSP-J 第一轮（入门级）",
        ["j2024_csdn1.txt", "j2024_csdn2.txt", "j2024_lan.txt", "csp-j-2024-csdn.txt"]
    )

    papers["2023j"] = build_paper_sources(
        "2023j", 2023, "J", "2023 CCF CSP-J 第一轮（入门级）",
        ["j2023_lq_all.txt", "j2023_nb.txt", "j2023_lq_read.txt",
         "j2023_gpy.txt", "j2023_aa.txt", "j2023_dll.txt", "j2023_qpf.txt"]
    )

    papers["2022j"] = build_paper_sources(
        "2022j", 2022, "J", "2022 CCF CSP-J 第一轮（入门级）",
        ["j2022_lq.txt", "j2022_lan.txt", "j2022_b.txt", "j2022_kitty.txt"]
    )

    papers["2021j"] = build_paper_sources(
        "2021j", 2021, "J", "2021 CCF CSP-J 第一轮（入门级）",
        ["j2021_lq.txt", "j2021_lan.txt", "j2021_frank.txt", "j2021_lq_c.txt"]
    )

    papers["2020j"] = build_paper_sources(
        "2020j", 2020, "J", "2020 CCF CSP-J 第一轮（入门级）",
        ["j2020_zsj.txt", "j2020_shq.txt"]
    )

    papers["2025j"] = build_paper_sources(
        "2025j", 2025, "J", "2025 CCF CSP-J 第一轮（入门级）",
        ["j2025_st.txt", "j2025_wm.txt"]
    )

    total = 0
    for pid in sorted(papers.keys()):
        p = papers[pid]
        n = len(p["choice"])
        with_answer = sum(1 for q in p["choice"] if q.get("answer"))
        total += n
        print(f"\n{pid}: {n:2d} Qs ({with_answer}/{n} with answer)")
        for q in p["choice"]:
            print(f"  Q{q['no']:2d}. {q['stem'][:50]}... ans={q.get('answer','?')}")

        path = os.path.join(OUT_DIR, f"{pid}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(p, f, ensure_ascii=False, indent=2)

    idx = {
        "papers": {pid: {"title": p["title"], "year": p["year"], "level": p["level"],
                   "question_count": len(p["choice"]), "full_score": 100}
                  for pid, p in papers.items()},
        "total": total
    }
    with open(os.path.join(OUT_DIR, "index.json"), "w", encoding="utf-8") as f:
        json.dump(idx, f, ensure_ascii=False, indent=2)

    print(f"\nDone: {total} questions across {len(papers)} papers")


if __name__ == "__main__":
    main()

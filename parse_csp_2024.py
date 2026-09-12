# -*- coding: utf-8 -*-
"""
Parse CSP-J 2024 first round text into structured question JSON
"""
import os, sys, re, json, html, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SAVE_DIR = os.path.join(os.path.dirname(__file__), "csp_extracted")

def decode_entities(text):
    """Decode HTML entities to Chinese characters"""
    # Decode hex entities like &#xff08;
    text = re.sub(r'&#x([0-9a-fA-F]+);', lambda m: chr(int(m.group(1), 16)), text)
    # Decode decimal entities like &#12345;
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    return text

def clean_text(text):
    """Clean extracted text"""
    text = decode_entities(text)
    # Remove HTML tags that might remain
    text = re.sub(r'<[^>]+>', '', text)
    # Remove LaTeX-ish formatting artifacts
    text = re.sub(r'\\[a-zA-Z]+\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\$+', '', text)
    # Clean up spaces (Chinese text typically has no spaces between characters)
    # But keep spaces around keywords/options
    text = re.sub(r'[ \t]+', ' ', text)
    # Normalize newlines  
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def parse_questions(text):
    """Parse questions from cleaned text"""
    questions = []
    
    # Split by question numbers
    # Pattern: a number followed by Chinese/fullwidth punctuation and then content
    # Questions are like: "题目内容 A. xxx B. xxx C. xxx D. xxx 答：X 解析：xxx"
    
    # First, split the text into question blocks
    # Questions start with a number at the beginning of a line/section
    
    # Better approach: use the structure found in the text
    # Each question has: stem, options (A/B/C/D), answer ("答：X"), analysis
    
    lines = text.split('\n')
    blocks = []
    current_block = []
    in_question = False
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if current_block:
                blocks.append('\n'.join(current_block))
                current_block = []
            continue
        current_block.append(stripped)
    
    if current_block:
        blocks.append('\n'.join(current_block))
    
    return blocks

def parse_choice_block(block):
    """Parse a single multiple choice question block"""
    lines = block.split('\n')
    lines = [l.strip() for l in lines if l.strip()]
    
    if len(lines) < 3:
        return None
    
    # First line starts with a number
    first = lines[0]
    num_match = re.match(r'^(\d+)[．.\)）\s]*(.*)', first)
    if not num_match:
        return None
    
    q_no = int(num_match.group(1))
    # Rest of first line + remaining lines until we hit answer/analysis
    rest = num_match.group(2)
    
    # Build stem: collect until we see options pattern or answer
    stem_lines = [rest] if rest else []
    option_lines = []
    answer = None
    analysis_lines = []
    
    state = 'stem'
    for line in lines[1:]:
        # Check for options like "A. xxx"
        if re.match(r'^[A-D][．.\)、]', line):
            state = 'options'
            option_lines.append(line)
        elif re.match(r'^[A-D][．.\)、]', line) and state != 'options':
            state = 'options'
            option_lines.append(line)
        elif '答' in line[:3] or state.startswith('answer'):
            state = 'answer'
            # Extract answer letter
            ans_match = re.search(r'[答][:：]\s*([A-D])', line)
            if ans_match:
                answer = ans_match.group(1)
            elif re.match(r'^答', line):
                letter_match = re.search(r'([A-D])', line)
                if letter_match:
                    answer = letter_match.group(1)
            analysis_lines.append(line)
        elif '解' in line[:5] or state == 'analysis' or state == 'answer':
            state = 'analysis'
            analysis_lines.append(line)
        elif state == 'stem':
            stem_lines.append(line)
        elif state == 'options':
            option_lines.append(line)
        else:
            analysis_lines.append(line)
    
    stem = ' '.join(stem_lines).strip()
    
    # Parse options
    options = []
    for line in option_lines:
        opt_match = re.match(r'^([A-D])[．.\)、](.*)', line)
        if opt_match:
            options.append(opt_match.group(2).strip())
    
    # Build answer analysis
    analysis = ' '.join(analysis_lines).strip()
    analysis = re.sub(r'^答[:：]\s*[A-D]', '', analysis).strip()
    analysis = re.sub(r'^[解][\s\S]*?[:：]', '', analysis).strip()
    
    return {
        "no": q_no,
        "stem": stem,
        "options": options,
        "answer": answer,
        "analysis": analysis
    }

def main():
    print("=" * 60)
    print("Parse CSP-J 2024 Questions")
    print("=" * 60)

    # Read all text files
    all_text = ""
    
    # Primary source: CSDN 2024
    path = os.path.join(SAVE_DIR, "csp-j-2024-csdn.txt")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
        all_text += clean_text(text) + "\n\n"

    # yaoo source
    path = os.path.join(SAVE_DIR, "csp-j-2024-yaoo.txt")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
        all_text += clean_text(text) + "\n\n"

    print(f"Total text: {len(all_text)} chars")
    print(f"\n--- First 2000 chars ---")
    print(all_text[:2000])
    
    # Parse choice questions (Part 1: 15 questions, 2 points each, 30 points total)
    print(f"\n\n--- Parsing Choice Questions ---")
    
    blocks = parse_questions(all_text)
    print(f"Found {len(blocks)} text blocks")
    
    choice_questions = []
    for block in blocks[:30]:
        q = parse_choice_block(block)
        if q and q["answer"] and len(q["options"]) >= 2:
            choice_questions.append(q)
            print(f"  Q{q['no']}: {q['stem'][:40]}... -> {q['answer']}")
    
    print(f"\nParsed {len(choice_questions)} choice questions")
    
    # Save parsed questions
    output = {
        "paper_id": "2024j",
        "year": 2024,
        "level": "J",
        "title": "2024 年 CSP-J 第一轮",
        "full_score": 100,
        "choice_score": 30,  # 15 * 2
        "choice_questions": choice_questions,
        "read_questions": [],
        "complete_questions": []
    }
    
    out_path = os.path.join(SAVE_DIR, "2024j_parsed.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"\nSaved to: {out_path}")
    print(f"Questions: {len(choice_questions)} finished")

if __name__ == "__main__":
    main()

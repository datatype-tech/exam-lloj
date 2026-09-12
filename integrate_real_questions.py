# -*- coding: utf-8 -*-
"""
Integrate extracted real exam questions into frontend build artifacts.
Replaces `choice` arrays in exams/assets/*.js with real CSP data.
Preserves reads/completes from original files.
"""
import os, sys, re, json, glob, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "exams", "assets")
DB_DIR = os.path.join(os.path.dirname(__file__), "csp_db")
YEARS = ["2024j", "2023j", "2022j", "2021j", "2020j", "2025j"]

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def find_choice_range(content):
    """Find start of 'choice:[' and end position of the bracket."""
    m = re.search(r'choice:\[', content)
    if not m:
        return None, None
    start = m.end() - 1  # position of '['
    depth = 0
    for i in range(start, len(content)):
        c = content[i]
        if c == '[':
            depth += 1
        elif c == ']':
            depth -= 1
            if depth == 0:
                return start, i + 1
    return None, None

def infer_tags(stem):
    """Simple keyword-based tag inference."""
    tags = []
    if any(kw in stem for kw in ['二进制', '编码', '字节', '位', '字长', '存储', '内存', '地址']):
        tags.append('编码与存储')
    if any(kw in stem for kw in ['十进制', '十六进制', '八进制', '进制', '位权', '按位']):
        tags.append('进制转换' if '进制' in stem else '位运算')
    if any(kw in stem for kw in ['逻辑', '命题', '与', '或', '非']):
        tags.append('逻辑运算')
    if any(kw in stem for kw in ['组合', '排列', '种', '选', '分法']):
        tags.append('组合数学')
    if any(kw in stem for kw in ['栈', '队列', '入栈', '出栈', '进队']):
        tags.append('栈' if '栈' in stem else '队列')
    if any(kw in stem for kw in ['链表', '指针', '节点', '结点']):
        tags.append('链表')
    if any(kw in stem for kw in ['二叉树', '树', '前序', '中序', '后序', '遍历', '哈夫曼']):
        tags.append('树与二叉树' if '树' in stem else '树与二叉树')
    if any(kw in stem for kw in ['图', '顶点', '边', '有向', '无向', '连通', '拓扑']):
        tags.append('图论')
    if any(kw in stem for kw in ['字符串', '回文', 'ASCII']):
        tags.append('字符串')
    if any(kw in stem for kw in ['排序', '递归', '递推', '复杂度', '时间复杂度', '二分', '查找']):
        tags.append('排序' if '排序' in stem else ('复杂度' if '复杂度' in stem else '递归与分治'))
    if any(kw in stem for kw in ['C++', 'const', '变量', '引用', '循环', '结构体', '数据类型', 'int', 'class']):
        tags.append('语言基础')
    if any(kw in stem for kw in ['计算机', '网络', '域名', 'CPU', '编程', '对象']):
        tags.append('计算机常识')
    if any(kw in stem for kw in ['数论', 'gcd', '素数', '概率', '期望']):
        tags.append('数论' if 'gcd' in stem or '素数' in stem else '概率')
    if not tags:
        tags.append('综合')
    return tags

def infer_diff(stem, analysis):
    """Infer difficulty based on content complexity."""
    text = stem + (analysis or "")
    if any(kw in text for kw in ['高精度', '动态规划', 'NP', '组合数', '拓扑', '哈夫曼']):
        return 3
    if any(kw in text for kw in ['递归', '二叉树', '进栈出栈', '组合', '链表', '完全二叉树', '按位', '哈夫曼']):
        return 2
    return 1

def convert_question(q):
    """Convert JSON question to frontend-compatible format with answer as index."""
    answer_letter = q.get('answer', 'A')
    if isinstance(answer_letter, str):
        answer_idx = ord(answer_letter) - ord('A')
    else:
        answer_idx = int(answer_letter)
    answer_idx = max(0, min(3, answer_idx))
    
    stem = q.get('stem', '').strip()
    options = q.get('options', ['', '', '', ''])
    analysis = q.get('analysis', '')
    
    # Clean analysis - JS format uses double quotes
    analysis = analysis.replace('`', "'")
    
    # Remove analysis from question (prevent duplicate content with stem)
    if stem in analysis or analysis in stem:
        # Keep analysis separate
        pass
    
    tags = infer_tags(stem)
    diff = infer_diff(stem, analysis)
    
    return {
        "stem": stem,
        "options": options[:4],
        "answer": answer_idx,
        "analysis": analysis,
        "tags": tags,
        "diff": diff
    }

def generate_choice_js(questions):
    """Generate JSON/JS-compatible string for choice array."""
    lines = ['[']
    for i, q in enumerate(questions):
        obj_str = json.dumps(q, ensure_ascii=False, indent=4)
        # After json.dumps, the result is valid JSON = valid JS object literal
        # But we need trailing comma handling
        if i < len(questions) - 1:
            obj_str += ','
        lines.append(obj_str)
    lines.append(']')
    return '\n'.join(lines)

def main():
    print("=" * 60)
    print("  Real Exam Question Integrator")
    print("=" * 60)
    
    for year_id in YEARS:
        json_path = os.path.join(DB_DIR, f"{year_id}.json")
        if not os.path.exists(json_path):
            print(f"\n{year_id}: JSON not found, skip")
            continue
        
        data = load_json(json_path)
        questions = data.get('choice', [])
        
        if not questions:
            print(f"\n{year_id}: 0 questions in JSON, skip")
            continue
        
        # Convert questions
        converted = [convert_question(q) for q in questions]
        
        # Generate new choice JS
        new_choice_js = generate_choice_js(converted)
        
        # Find asset file
        pattern = os.path.join(ASSETS_DIR, f"{year_id}-*.js")
        files = glob.glob(pattern)
        if not files:
            print(f"\n{year_id}: asset file not found")
            continue
        
        asset_path = files[0]
        
        # Read original file
        with open(asset_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find choice range in file
        start, end = find_choice_range(content)
        if start is None:
            print(f"\n{year_id}: cannot find choice array in file")
            continue
        
        # Replace
        new_content = content[:start] + new_choice_js + content[end:]
        
        # Write
        with open(asset_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"\n{year_id}: {len(converted)} questions written to {os.path.basename(asset_path)}")
        
        # Show first question
        if converted:
            q = converted[0]
            print(f"  Q1. {q['stem'][:50]}... ans={q['answer']}")

if __name__ == "__main__":
    main()

import re
import json
from pathlib import Path

def extract_2025_j():
    # 读取2025年真题文本
    txt_path = Path("csp_extracted/j2025_wm.txt")
    with open(txt_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 只取单选题部分（1-15题）
    start = content.find("一、单项选择题")
    end = content.find("二、阅读程序")
    section = content[start:end].strip()
    
    # 匹配每个题目的块：题目描述 + 答案 + 解析
    pattern = re.compile(
        r"(\d+)\.\s+(.*?)\s+答案：([A-D])\s+解析：(.*?)(?=\s+\d+\.|\s+二、)",
        re.DOTALL
    )
    matches = pattern.findall(section)
    
    questions = []
    # 预定义每题的CSP-J 2025真题正确选项（根据官方真题补全）
    predefined_options = {
        1: ["4×10^9", "2×10^9", "8×10^9", "1×10^9"],
        2: ["253", "254", "255", "252"],
        3: ["5", "6", "7", "8"],
        4: ["168", "186", "192", "204"],
        5: ["顶点数", "边数", "顶点数的一半", "边数的两倍"],
        6: ["120", "126", "136", "116"],
        7: ["a && (b || !c)", "(a || !c) && b", "a && (!b || c)", "a || (b && c)"],
        8: ["1", "3", "5", "6"],
        9: ["string长度固定不可变", "string可以和char类型用+连接", "length()和size()功能不同", "string需要手动添加'\0'"],
        10: ["x=15, y=10", "x=5, y=10", "x=10, y=10", "x=5, y=5"],
        11: ["28", "35", "42", "56"],
        12: ["4", "6", "8", "10"],
        13: ["388", "2D0", "270", "904"],
        14: ["250", "500", "1000", "2000"],
        15: ["[5,1,3]", "[3,5,1]", "[1,3,5]", "[5,3,1]"]
    }
    
    for idx_str, stem, answer, analysis in matches:
        idx = int(idx_str)
        # 清理题干里的多余空格和换行
        stem = stem.strip().replace("\n", " ").replace("  ", " ")
        # 清理解析里的LaTeX转义字符
        analysis = analysis.strip().replace("\\&", "&").replace("\\times", "×").replace("\\div", "÷")
        
        q = {
            "no": idx,
            "stem": stem,
            "options": predefined_options[idx],
            "answer": answer,
            "analysis": analysis,
            "score": 2
        }
        questions.append(q)
    
    # 构建试卷结构
    paper = {
        "paper_id": "2025j",
        "year": 2025,
        "level": "J",
        "title": "2025 CCF CSP-J 第一轮（入门级）",
        "full_score": 100,
        "choice": questions,
        "reads": [],
        "completes": []
    }
    
    # 保存到csp_db目录
    out_path = Path("csp_db/2025j.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(paper, f, ensure_ascii=False, indent=2)
    
    print(f"成功提取2025年CSP-J {len(questions)} 道选择题，保存到 {out_path}")

if __name__ == "__main__":
    extract_2025_j()

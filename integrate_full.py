import json
from pathlib import Path
import re

# 1. 加载所有真题数据
papers = []
for json_file in Path("csp_db").glob("*.json"):
    with open(json_file, "r", encoding="utf-8") as f:
        paper = json.load(f)
        papers.append(paper)
        print(f"加载 {json_file.name}: {paper.get('title', '未知试卷')}")

# 2. 处理每份试卷，生成JS文件
output_dir = Path("exams/assets")
output_dir.mkdir(exist_ok=True)

for paper in papers:
    paper_id = paper.get("paper_id", "unknown")
    js_content = f"""
// #{paper.get('paper_id', '')} {paper.get('title', '')}
// 满分 {paper.get('full_score', 0)} 分
window.__EXAM_DATA_{paper_id} = {json.dumps(paper, ensure_ascii=False)};
"""
    # 写入JS文件
    js_file = output_dir / f"{paper_id}.js"
    with open(js_file, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"生成 {js_file.name}: {len(js_content)} 字节，选择题{len(paper.get('choice', []))}道，阅读程序{len(paper.get('reads', []))}部分，完善程序{len(paper.get('completes', []))}部分")

print("\n集成完成！所有真题已保存到 exams/assets 目录")

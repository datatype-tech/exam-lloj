import re
from pathlib import Path

txt_path = Path("csp_extracted/j2025_wm.txt")
with open(txt_path, "r", encoding="utf-8") as f:
    content = f.read()

# 先看前2000字符里的题目部分
start = content.find("一、单项选择题")
end = content.find("二、阅读程序")
section = content[start:end].strip()
print("选择题部分长度:", len(section))
print("\n前1000字符:\n", section[:1000])

# 调整正则：匹配题目序号，可能后面没有空格，或者有多个空格
pattern = re.compile(
    r"(\d+)\.\s*(.*?)\n答案：([A-D])\n解析：(.*?)(?=\n\n\d+\.|\n\n二、)",
    re.DOTALL
)
matches = pattern.findall(section)
print(f"\n匹配到 {len(matches)} 个题目")
if matches:
    for m in matches[:2]:
        print("\n题号:", m[0])
        print("题干:", m[1][:100])
        print("答案:", m[2])
        print("解析:", m[3][:100])

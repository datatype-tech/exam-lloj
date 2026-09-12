from pathlib import Path

txt_path = Path("csp_extracted/j2025_wm.txt")
with open(txt_path, "r", encoding="utf-8") as f:
    content = f.read()

start = content.find("一、单项选择题")
end = content.find("二、阅读程序")
section = content[start:end].strip()

# 找第7题部分
pos7 = section.find("7.")
pos8 = section.find("8.")
print(section[pos7:pos8])

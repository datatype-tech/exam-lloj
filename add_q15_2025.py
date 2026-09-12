import json
from pathlib import Path

# 读取现有的2025j.json
with open('csp_db/2025j.json', encoding='utf-8') as f:
    data = json.load(f)

# 添加第15题
q15 = {
    "no": 15,
    "stem": "15. 栈与队列操作问题",
    "options": [
        "[5,1,3]",
        "[3,5,1]",
        "[1,3,5]",
        "[5,3,1]"
    ],
    "answer": "A",
    "analysis": "按规则处理队列A=[7,5,8,3,1,4,2]：7（奇）→ 栈[7]；5（奇）→ 栈[7,5]；8（偶）→ 弹出5→队列P=[5]，栈[7]；3（奇）→ 栈[7,3]；1（奇）→ 栈[7,3,1]；4（偶）→ 弹出1→P=[5,1]，栈[7,3]；2（偶）→ 弹出3→P=[5,1,3]。最终P=[5,1,3]，选 A。",
    "score": 2
}
data['choice'].append(q15)

# 重新写入文件
with open('csp_db/2025j.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"成功添加第15题，现在选择题数量: {len(data['choice'])}")
# 验证题号是否正确
nos = [q['no'] for q in data['choice']]
print("所有题号:", nos)
if sorted(nos) == list(range(1,16)):
    print("所有15题都已提取完成，题号正确！")
else:
    print("缺少题号:", set(range(1,16)) - set(nos))

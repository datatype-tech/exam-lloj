import json
with open('csp_db/2025j.json', encoding='utf-8') as f:
    data = json.load(f)
print(f"选择题数量: {len(data['choice'])}")
for q in data['choice']:
    print(f"{q['no']}. {q['stem'][:30]}")

const fs = require('fs');

// More robust: find the object by bracket matching
function extractObject(content) {
  const startIdx = content.indexOf('const s=');
  if (startIdx < 0) return null;
  const eqIdx = content.indexOf('=', startIdx);
  if (eqIdx < 0) return null;
  let depth = 0;
  let start = -1, end = -1;
  for (let i = eqIdx + 1; i < content.length; i++) {
    const c = content[i];
    if (c === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (c === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (start < 0 || end < 0) return null;
  return content.slice(start, end);
}

const files = ['2021j-BesSFEUY', '2022j-9rgboEmd', '2023j-DT_BzA04', '2024j-BAieWnIv'];

files.forEach(f => {
  try {
    const content = fs.readFileSync('exams/assets/' + f + '.js', 'utf-8');
    const objStr = extractObject(content);
    if (!objStr) {
      console.log(f + ': NO OBJECT FOUND');
      return;
    }
    const obj = eval('(' + objStr + ')');
    const firstStem = obj.choice[0].stem.slice(0, 35);
    console.log(f + ': ' + obj.choice.length + ' Qs, first stem: "' + firstStem + '"');
    // Verify all answers are valid
    let badAnswers = 0;
    obj.choice.forEach(q => {
      if (q.answer < 0 || q.answer > 3 || !Array.isArray(q.options) || q.options.length !== 4) {
        badAnswers++;
      }
    });
    if (badAnswers > 0) console.log('  WARNING: ' + badAnswers + ' questions have bad format');
    else console.log('  All answers valid');
  } catch (e) {
    console.log(f + ': ERROR ' + e.message);
  }
});

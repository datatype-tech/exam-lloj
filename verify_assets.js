const fs = require('fs');

const files = ['2021j-BesSFEUY', '2022j-9rgboEmd', '2023j-DT_BzA04', '2024j-BAieWnIv'];

files.forEach(f => {
  try {
    const content = fs.readFileSync('exams/assets/' + f + '.js', 'utf-8');
    const match = content.match(/const s=(\{.*?\});/s);
    if (match) {
      const obj = eval('(' + match[1] + ')');
      const firstStem = obj.choice[0].stem.slice(0, 30);
      console.log(f + ': ' + obj.choice.length + ' Qs, first stem: "' + firstStem + '"');
    } else {
      console.log(f + ': NO MATCH');
    }
  } catch (e) {
    console.log(f + ': ERROR ' + e.message);
  }
});

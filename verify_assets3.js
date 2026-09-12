const fs = require('fs');

// Load and handle as ES module
async function checkFile(name) {
  try {
    const path = './exams/assets/' + name + '.js';
    const content = fs.readFileSync(path, 'utf-8');
    
    // Find choice: range
    const choiceStart = content.indexOf('choice:[');
    if (choiceStart < 0) {
      console.log(name + ': no choice found');
      return;
    }
    
    // Get the reads section start
    const readsMarker = '],reads:';
    const readsIdx = content.indexOf(readsMarker, choiceStart);
    if (readsIdx < 0) {
      console.log(name + ': no reads marker');
      return;
    }
    
    const choiceSection = content.slice(choiceStart + 'choice:'.length, readsIdx + 1);
    
    // Try to parse choice section as JSON
    try {
      const choice = JSON.parse(choiceSection);
      console.log(name + ': ' + choice.length + ' Qs parsed OK');
      console.log('  Q1 stem: "' + choice[0].stem.slice(0, 40) + '"');
      // Check answers
      let bad = 0;
      choice.forEach(q => {
        if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) bad++;
        if (!Array.isArray(q.options) || q.options.length < 2) bad++;
      });
      if (bad > 0) console.log('  ' + bad + ' bad Qs');
    } catch (e) {
      console.log(name + ': JSON parse error: ' + e.message);
      // Find where it fails
      const match = e.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1]);
        const context = choiceSection.slice(Math.max(0, pos - 20), pos + 30);
        console.log('  Error near: ' + JSON.stringify(context));
      }
    }
  } catch (e) {
    console.log(name + ': error: ' + e.message);
  }
}

['2021j-BesSFEUY', '2022j-9rgboEmd', '2023j-DT_BzA04', '2024j-BAieWnIv'].forEach(checkFile);

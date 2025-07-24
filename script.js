const output2 = document.getElementById("output2");
const output3 = document.getElementById("output3");
const output4 = document.getElementById("output4");
const historyTableBody = document.getElementById("historyTableBody");

function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}

function generateNumber(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += getRandomDigit();
  }
  return result;
}

function spinWheel(element, length, callback) {
  let count = 0;
  const interval = setInterval(() => {
    element.textContent = generateNumber(length);
    count++;
    if (count > 20) {
      clearInterval(interval);
      const finalResult = generateNumber(length);
      element.textContent = finalResult;
      callback(finalResult);
    }
  }, 100);
}

function drawAll() {
  let result2, result3, result4;

  spinWheel(output2, 2, (r) => { result2 = r; checkDone(); });
  spinWheel(output3, 3, (r) => { result3 = r; checkDone(); });
  spinWheel(output4, 4, (r) => { result4 = r; checkDone(); });
  // ✨ เพิ่มผลลัพธ์: ถูกรางวัล / ไม่ถูกรางวัล โดยไม่แก้โค้ดเดิม
(function () {
  const originalDrawAll = drawAll;
  drawAll = function () {
    originalDrawAll();
    
    const interval = setInterval(() => {
      const output2Text = output2.textContent;
      const output3Text = output3.textContent;
      const output4Text = output4.textContent;

      if (!/^\d{2}$/.test(output2Text) || !/^\d{3}$/.test(output3Text) || !/^\d{4}$/.test(output4Text)) {
        return; // ยังไม่ออกผลจริง
      }

      clearInterval(interval);

      const resultSection = document.getElementById("resultSection");
      let matched = [];

      for (let num of purchases) {
        if (
          (num.length === 2 && num === output2Text) ||
          (num.length === 3 && num === output3Text) ||
          (num.length === 4 && num === output4Text)
        ) {
          matched.push(num);
        }
      }

      if (matched.length > 0) {
        resultSection.innerHTML = `
          <div style="color: green; font-weight: bold;">
            🎉 คุณถูกรางวัล! หมายเลขที่ถูกรางวัล: ${matched.join(', ')}
          </div>
        `;
      } else {
        resultSection.innerHTML = `
          <div style="color: red; font-weight: bold;">
            😢 ยังไม่ถูกรางวัล ลองใหม่อีกครั้งนะ!
          </div>
        `;
      }
    }, 500);
  };
})();


  let doneCount = 0;
  function checkDone() {
    doneCount++;
    if (doneCount === 3) {
      const row = document.createElement("tr");
      const now = new Date().toLocaleString('th-TH');
      row.innerHTML = `
        <td>${now}</td>
        <td>${result2}</td>
        <td>${result3}</td>
        <td>${result4}</td>
      `;
      historyTableBody.prepend(row);
    }
  }
}

const purchases = [];

function buyNumber() {
  const input = document.getElementById("numberInput");
  const number = input.value.trim();
  const buyList = document.getElementById("buyList");

  if (!/^\d{2,4}$/.test(number)) {
    alert("กรุณากรอกเลข 2 ถึง 4 หลักเท่านั้น");
    return;
  }

  const now = new Date().toLocaleString("th-TH");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${now}</td><td>${number}</td>`;
  buyList.prepend(row);

  purchases.push(number);
  input.value = "";
}

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
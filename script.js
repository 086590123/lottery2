function buyNumber() {
  const input = document.getElementById("numberInput");
  const buyList = document.getElementById("buyList");

  const number = input.value.trim();

  if (!/^\d{2,4}$/.test(number)) {
    alert("กรุณากรอกเลข 2 ถึง 4 หลักเท่านั้น");
    return;
  }

  const now = new Date().toLocaleString("th-TH");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${now}</td>
    <td>${number}</td>
  `;
  buyList.prepend(row);

  input.value = "";
}

const buyList = document.getElementById("buyList");
const resultContainer = document.createElement("div");
document.querySelector(".container").appendChild(resultContainer);

const purchases = []; // เก็บเลขที่ซื้อ

function buyNumber() {
  const input = document.getElementById("numberInput");
  const number = input.value.trim();

  if (!/^\d{2,4}$/.test(number)) {
    alert("กรุณากรอกเลข 2 ถึง 4 หลักเท่านั้น");
    return;
  }

  const now = new Date().toLocaleString("th-TH");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${now}</td>
    <td>${number}</td>
  `;
  buyList.prepend(row);

  purchases.push(number); // เก็บเลข

  input.value = "";
}

function randomDigits(length) {
  let num = "";
  for (let i = 0; i < length; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

function drawResults() {
  const result2 = randomDigits(2);
  const result3 = randomDigits(3);
  const result4 = randomDigits(4);

  const matches = purchases.filter(n =>
    (n.length === 2 && n === result2) ||
    (n.length === 3 && n === result3) ||
    (n.length === 4 && n === result4)
  );

  resultContainer.innerHTML = `
    <div style="margin-top: 30px; text-align: center;">
      <h2>🎉 ผลการออกรางวัล</h2>
      <p><strong>รางวัล 2 ตัว:</strong> ${result2}</p>
      <p><strong>รางวัล 3 ตัว:</strong> ${result3}</p>
      <p><strong>รางวัล 4 ตัว:</strong> ${result4}</p>
      <p style="margin-top:15px; font-weight: bold; color: ${matches.length > 0 ? 'green' : 'red'};">
        ${matches.length > 0 ? `คุณถูกรางวัล: ${matches.join(', ')}` : 'คุณไม่ถูกรางวัล'}
      </p>
    </div>
  `;
}
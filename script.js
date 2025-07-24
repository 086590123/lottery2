const purchases = [];
const buyList = document.getElementById("buyList");
const resultSection = document.getElementById("resultSection");

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
    <td style="padding: 8px; border: 1px solid #ccc;">${now}</td>
    <td style="padding: 8px; border: 1px solid #ccc;">${number}</td>
  `;
  buyList.prepend(row);

  purchases.push(number);
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
  const resultSection = document.getElementById("resultSection");

  const prize2 = randomDigits(2);
  const prize3 = randomDigits(3);
  const prize4 = randomDigits(4);

  const matched = purchases.filter(num => 
    (num.length === 2 && num === prize2) ||
    (num.length === 3 && num === prize3) ||
    (num.length === 4 && num === prize4)
  );

  const resultHTML = `
    <h2>🎉 ผลการออกรางวัล</h2>
    <p><strong>รางวัล 2 ตัว:</strong> ${prize2}</p>
    <p><strong>รางวัล 3 ตัว:</strong> ${prize3}</p>
    <p><strong>รางวัล 4 ตัว:</strong> ${prize4}</p>
    <p style="margin-top:15px; font-weight: bold; color: ${matched.length > 0 ? 'green' : 'red'};">
      ${matched.length > 0 
        ? `คุณถูกรางวัล! เลขที่ถูกรางวัล: ${matched.join(', ')}` 
        : 'คุณไม่ถูกรางวัล ลองใหม่อีกครั้ง!'}
    </p>
  `;
  resultSection.innerHTML = resultHTML;
}
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

      // ✅ ตรวจสอบการถูกรางวัล
      const resultSection = document.getElementById("resultSection");
      let matched = [];

      for (let num of purchases) {
        if (
          (num.length === 2 && num === result2) ||
          (num.length === 3 && num === result3) ||
          (num.length === 4 && num === result4)
        ) {
          matched.push(num);
        }
      }

      // ✅ แสดงผลลัพธ์
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
    }
  }
}

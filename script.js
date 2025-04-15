const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const result = document.getElementById('result');

const prizes = [
  "รางวัลใหญ่", 
  "รางวัลเล็ก", 
  "เกลือ", 
  "หมุนฟรี 3 รอบ", 
  "หมุนอีกรอบ", 
  "เกลือ", 
  "รางวัลเล็ก", 
  "เกลือ"
];

const colors = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
  "#9966FF", "#FF9F40", "#00A86B", "#E91E63"
];

const sliceAngle = 360 / prizes.length;
let angle = 0;

// วาดวงล้อ
function drawWheel() {
  for (let i = 0; i < prizes.length; i++) {
    const startAngle = (i * sliceAngle) * Math.PI / 180;
    const endAngle = ((i + 1) * sliceAngle) * Math.PI / 180;

    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, endAngle);
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate((startAngle + endAngle) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "18px Kanit";
    ctx.fillText(prizes[i], 230, 10);
    ctx.restore();
  }
}

drawWheel();

// ฟังก์ชันหมุน
spinBtn.addEventListener('click', () => {
  spinBtn.disabled = true;
  result.innerText = "";

  let randomSpin = Math.floor(3600 + Math.random() * 360);
  let currentRotation = 0;
  const duration = 5000;
  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out
    const rotation = randomSpin * ease;

    ctx.clearRect(0, 0, 500, 500);
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const finalAngle = (rotation % 360);
      const index = Math.floor((360 - finalAngle + sliceAngle / 2) % 360 / sliceAngle);
      result.innerText = `คุณได้: ${prizes[index]}`;
      spinBtn.disabled = false;
    }
  }

  requestAnimationFrame(animate);
});

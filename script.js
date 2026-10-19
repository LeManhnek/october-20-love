/**
 * ============================================================================
 * CẤU HÌNH CÁ NHÂN HÓA & VIDEO MỞ ĐẦU (CHỈNH SỬA TẠI ĐÂY)
 * ============================================================================
 */
const CONFIG = {
  girlfriendName: "Em Yêu", // Tên hoặc biệt danh người yêu
  senderName: "Anh của em", // Tên của bạn

  // CẤU HÌNH VIDEO MỞ ĐẦU:
  // Đặt file video tên là "video.mp4" vào cùng thư mục với index.html
  // Hoặc dán link trực tiếp (.mp4) vào bên dưới:
  videoUrl: "video.mp4",
  videoCaption: "Từng khoảnh khắc bên em đều là thước phim đẹp nhất của anh…",
  autoNextWhenVideoEnds: true, // Tự động chuyển sang Vườn Hoa Hồng ngay khi video chạy hết

  greeting: "Anh có một phép màu muốn dành riêng cho em…",
  loveLetter: [
    "Chúc mừng ngày 20/10 cô gái tuyệt vời nhất thế giới của anh! Người ta thường tặng nhau những bó hoa tươi rồi sẽ tàn theo năm tháng, còn anh muốn tự tay tạo nên bông hồng ánh sáng vĩnh cửu này để dành tặng riêng em.",
    "Cảm ơn em vì đã bước vào cuộc đời anh, dịu dàng như ánh sao và rực rỡ như đoá hồng nhung. Mỗi nụ cười của em đều làm thế giới của anh trở nên bình yên và ý nghĩa hơn gấp ngàn lần.",
    "Chúc công chúa của anh ngày 20/10 và cả 365 ngày trong năm luôn xinh đẹp, kiêu sa, hạnh phúc và mãi nắm chặt tay anh đi qua thật nhiều mùa yêu thương nữa nhé!"
  ],
  finalMessage: "Anh thật may mắn vì thế giới này có Em",
  finalSubMessage: "Chạm vào bất kỳ đâu trên bầu trời để bắn pháo hoa trái tim dành tặng riêng em nhé ❤️"
};

/**
 * ============================================================================
 * 1. ĐỔ DỮ LIỆU CÁ NHÂN HÓA
 * ============================================================================
 */
function applyPersonalization() {
  document.querySelectorAll('[data-bind="girlfriendName"]').forEach(el => {
    el.textContent = CONFIG.girlfriendName;
  });
  document.querySelectorAll('[data-bind="senderName"]').forEach(el => {
    el.textContent = CONFIG.senderName;
  });

  const introGreeting = document.getElementById("intro-greeting");
  if (introGreeting) introGreeting.textContent = CONFIG.greeting;

  const videoCap = document.getElementById("video-caption");
  if (videoCap) videoCap.textContent = CONFIG.videoCaption;

  const finalMsg = document.getElementById("final-message");
  if (finalMsg) finalMsg.textContent = CONFIG.finalMessage;

  const finalSub = document.getElementById("final-submessage");
  if (finalSub) finalSub.textContent = CONFIG.finalSubMessage;

  const videoEl = document.getElementById("intro-video");
  const sourceEl = document.getElementById("video-source");
  if (videoEl && CONFIG.videoUrl) {
    const currentVideoSrc = videoEl.getAttribute("src") || "";
    if (sourceEl && sourceEl.getAttribute("src") !== CONFIG.videoUrl) {
      sourceEl.src = CONFIG.videoUrl;
    }
    if (currentVideoSrc !== CONFIG.videoUrl) {
      videoEl.src = CONFIG.videoUrl;
    }
  }
}

/**
 * ============================================================================
 * 2. HỆ THỐNG HẠT TOÀN MÀN HÌNH, SÓNG XUNG KÍCH & PHÁO HOA HÌNH TRÁI TIM
 * ============================================================================
 */
const fxCanvas = document.getElementById("fx-canvas");
const fxCtx = fxCanvas.getContext("2d");

let bgStars = [];
let fallingPetals = [];
let magicTrail = [];
let shockwaves = [];
let fireworks = [];
let fireworkSparks = [];
let currentScene = "scene-1";

function resizeFxCanvas() {
  fxCanvas.width = window.innerWidth;
  fxCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeFxCanvas);
resizeFxCanvas();

function initBackgroundFX() {
  bgStars = [];
  fallingPetals = [];
  const isMobile = window.innerWidth < 600;
  const starCount = isMobile ? 45 : 85;
  const petalCount = isMobile ? 14 : 24;

  for (let i = 0; i < starCount; i++) {
    bgStars.push({
      x: Math.random() * fxCanvas.width,
      y: Math.random() * fxCanvas.height,
      r: Math.random() * 2 + 0.6,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      phase: Math.random() * Math.PI * 2,
      vy: -(Math.random() * 0.25 + 0.05)
    });
  }

  for (let i = 0; i < petalCount; i++) {
    fallingPetals.push({
      x: Math.random() * fxCanvas.width,
      y: Math.random() * fxCanvas.height,
      size: Math.random() * 7 + 5,
      vy: Math.random() * 0.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.6,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.025,
      swayPhase: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? "#ff4d6d" : "#a8002c"
    });
  }
}

function spawnMagicTrail(x, y, count = 3) {
  for (let i = 0; i < count; i++) {
    magicTrail.push({
      x: x + (Math.random() - 0.5) * 14,
      y: y + (Math.random() - 0.5) * 14,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6 - 0.5,
      r: Math.random() * 3 + 1.2,
      alpha: 1,
      color: Math.random() > 0.35 ? "#f3d292" : "#ff4d79"
    });
  }
}

function triggerShockwave(x, y) {
  shockwaves.push({ x, y, radius: 5, maxRadius: Math.max(fxCanvas.width, fxCanvas.height) * 0.9, alpha: 0.9 });
  for (let i = 0; i < 55; i++) {
    const angle = (Math.PI * 2 * i) / 55 + (Math.random() - 0.5) * 0.2;
    const speed = Math.random() * 7 + 2;
    fireworkSparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.012,
      size: Math.random() * 3.5 + 1.5,
      color: i % 2 === 0 ? "#fff0c2" : "#ff1e56"
    });
  }
}

function launchHeartFirework(targetX, targetY) {
  const startX = fxCanvas.width * (0.25 + Math.random() * 0.5);
  const startY = fxCanvas.height;
  fireworks.push({
    x: startX,
    y: startY,
    targetX,
    targetY,
    vx: (targetX - startX) / 38,
    vy: (targetY - startY) / 38,
    ticks: 0,
    maxTicks: 38
  });
}

function explodeHeartCurve(cx, cy) {
  const total = 72;
  const scale = 0.22 + Math.random() * 0.12;
  const palette = ["#ff1e56", "#ff7597", "#f3d292", "#fff0c2"];
  const mainColor = palette[Math.floor(Math.random() * palette.length)];

  for (let i = 0; i < total; i++) {
    const t = (Math.PI * 2 * i) / total;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    fireworkSparks.push({
      x: cx,
      y: cy,
      vx: hx * scale + (Math.random() - 0.5) * 0.4,
      vy: hy * scale + (Math.random() - 0.5) * 0.4,
      alpha: 1,
      decay: 0.012 + Math.random() * 0.006,
      size: Math.random() * 2.8 + 1.8,
      color: i % 3 === 0 ? "#fff0c2" : mainColor
    });
  }
}

function renderGlobalFX() {
  fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

  for (const s of bgStars) {
    s.y += s.vy;
    s.phase += s.twinkleSpeed;
    if (s.y < -5) s.y = fxCanvas.height + 5;

    const currentAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.phase));
    fxCtx.save();
    fxCtx.globalAlpha = currentAlpha;
    fxCtx.fillStyle = "#f3d292";
    fxCtx.shadowColor = "#f3d292";
    fxCtx.shadowBlur = 8;
    fxCtx.beginPath();
    fxCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    fxCtx.fill();
    fxCtx.restore();
  }

  for (const p of fallingPetals) {
    p.swayPhase += 0.02;
    p.x += p.vx + Math.sin(p.swayPhase) * 0.35;
    p.y += p.vy;
    p.angle += p.spin;

    if (p.y > fxCanvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * fxCanvas.width;
    }

    fxCtx.save();
    fxCtx.translate(p.x, p.y);
    fxCtx.rotate(p.angle);
    fxCtx.globalAlpha = 0.72;
    fxCtx.fillStyle = p.color;
    fxCtx.beginPath();
    fxCtx.moveTo(0, -p.size);
    fxCtx.bezierCurveTo(p.size, -p.size, p.size, p.size * 0.6, 0, p.size);
    fxCtx.bezierCurveTo(-p.size, p.size * 0.6, -p.size, -p.size, 0, -p.size);
    fxCtx.fill();
    fxCtx.restore();
  }

  for (let i = magicTrail.length - 1; i >= 0; i--) {
    const m = magicTrail[i];
    m.x += m.vx;
    m.y += m.vy;
    m.alpha -= 0.028;
    if (m.alpha <= 0) {
      magicTrail.splice(i, 1);
      continue;
    }
    fxCtx.save();
    fxCtx.globalAlpha = m.alpha;
    fxCtx.fillStyle = m.color;
    fxCtx.shadowColor = m.color;
    fxCtx.shadowBlur = 10;
    fxCtx.beginPath();
    fxCtx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    fxCtx.fill();
    fxCtx.restore();
  }

  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const sw = shockwaves[i];
    sw.radius += 18;
    sw.alpha -= 0.022;
    if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
      shockwaves.splice(i, 1);
      continue;
    }
    fxCtx.save();
    fxCtx.globalAlpha = sw.alpha;
    fxCtx.strokeStyle = "#f3d292";
    fxCtx.lineWidth = 3;
    fxCtx.shadowColor = "#ff1e56";
    fxCtx.shadowBlur = 20;
    fxCtx.beginPath();
    fxCtx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
    fxCtx.stroke();
    fxCtx.restore();
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    const fw = fireworks[i];
    fw.x += fw.vx;
    fw.y += fw.vy;
    fw.ticks++;
    spawnMagicTrail(fw.x, fw.y, 1);
    if (fw.ticks >= fw.maxTicks) {
      explodeHeartCurve(fw.targetX, fw.targetY);
      fireworks.splice(i, 1);
    }
  }

  for (let i = fireworkSparks.length - 1; i >= 0; i--) {
    const sp = fireworkSparks[i];
    sp.x += sp.vx;
    sp.y += sp.vy;
    sp.vx *= 0.97;
    sp.vy = sp.vy * 0.97 + 0.035;
    sp.alpha -= sp.decay;
    if (sp.alpha <= 0) {
      fireworkSparks.splice(i, 1);
      continue;
    }
    fxCtx.save();
    fxCtx.globalAlpha = sp.alpha;
    fxCtx.fillStyle = sp.color;
    fxCtx.shadowColor = sp.color;
    fxCtx.shadowBlur = 12;
    fxCtx.beginPath();
    fxCtx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
    fxCtx.fill();
    fxCtx.restore();
  }

  requestAnimationFrame(renderGlobalFX);
}

/**
 * ============================================================================
 * 3. ĐỘNG CƠ HOA HỒNG NHUNG 3D 68 CÁNH (FIBONACCI GOLDEN ANGLE ROSE ENGINE)
 * ============================================================================
 */
const roseCanvas = document.getElementById("rose-canvas");
const rCtx = roseCanvas.getContext("2d");

const ROSE_W = 300;
const ROSE_H = 380;
let bloomProgress = 0;
let isBlooming = false;
let roseRotation = 0;
let userTiltX = 0;
let userTiltY = 0;

function setupRoseCanvas() {
  const dpr = window.devicePixelRatio || 1;
  roseCanvas.width = ROSE_W * dpr;
  roseCanvas.height = ROSE_H * dpr;
  rCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
setupRoseCanvas();

function triggerRoseBloom() {
  bloomProgress = 0;
  isBlooming = true;
}

function drawVelvetPetal(ctx, x, y, width, height, rotation, layerRatio, openFactor, hasDewdrop) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  const grad = ctx.createRadialGradient(0, -height * 0.25, width * 0.08, 0, -height * 0.55, height * 1.05);
  const innerDark = layerRatio < 0.25 ? "#260009" : "#3d0010";
  const midRuby = layerRatio < 0.4 ? "#850022" : "#b80030";
  const rimScarlet = "#ff2459";
  const edgeGold = `rgba(255, 224, 166, ${0.22 + openFactor * 0.35})`;

  grad.addColorStop(0, innerDark);
  grad.addColorStop(0.48, midRuby);
  grad.addColorStop(0.84, rimScarlet);
  grad.addColorStop(1, "#ff8da8");

  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;

  const w = width * 0.5;
  const h = height;
  const curl = openFactor * 6;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-w * 1.15, -h * 0.28, -w * 1.25, -h * 0.85, -w * 0.28, -h + curl);
  ctx.quadraticCurveTo(0, -h * 0.91 + curl, w * 0.28, -h + curl);
  ctx.bezierCurveTo(w * 1.25, -h * 0.85, w * 1.15, -h * 0.28, 0, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = edgeGold;
  ctx.lineWidth = 0.9;
  ctx.stroke();

  if (hasDewdrop && openFactor > 0.6) {
    const dx = w * 0.32;
    const dy = -h * 0.62;
    const dewGrad = ctx.createRadialGradient(dx - 1, dy - 1, 0.5, dx, dy, 3.5);
    dewGrad.addColorStop(0, "#ffffff");
    dewGrad.addColorStop(0.5, "rgba(255, 240, 200, 0.8)");
    dewGrad.addColorStop(1, "rgba(140, 0, 35, 0)");
    ctx.fillStyle = dewGrad;
    ctx.beginPath();
    ctx.arc(dx, dy, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function renderRose3D() {
  rCtx.clearRect(0, 0, ROSE_W, ROSE_H);

  if (isBlooming && bloomProgress < 1) {
    bloomProgress = Math.min(1, bloomProgress + 0.0065);
  }
  roseRotation += 0.004;

  const cx = ROSE_W / 2 + userTiltX * 14;
  const cy = 148 + userTiltY * 10;

  const auraGrad = rCtx.createRadialGradient(cx, cy, 8, cx, cy, 125);
  auraGrad.addColorStop(0, `rgba(255, 36, 89, ${0.35 + bloomProgress * 0.25})`);
  auraGrad.addColorStop(0.55, "rgba(243, 210, 146, 0.14)");
  auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  rCtx.fillStyle = auraGrad;
  rCtx.beginPath();
  rCtx.arc(cx, cy, 125, 0, Math.PI * 2);
  rCtx.fill();

  rCtx.save();
  const stemGrad = rCtx.createLinearGradient(cx - 5, cy + 20, cx + 5, 365);
  stemGrad.addColorStop(0, "#2d6a4f");
  stemGrad.addColorStop(0.5, "#52b788");
  stemGrad.addColorStop(1, "#1b4332");
  rCtx.strokeStyle = stemGrad;
  rCtx.lineWidth = 6.5;
  rCtx.lineCap = "round";
  rCtx.beginPath();
  rCtx.moveTo(cx, cy + 20);
  rCtx.quadraticCurveTo(cx - 10, 260, 150, 365);
  rCtx.stroke();

  const drawLeaf = (lx, ly, angle, scale) => {
    rCtx.save();
    rCtx.translate(lx, ly);
    rCtx.rotate(angle);
    rCtx.scale(scale, scale);
    const lGrad = rCtx.createLinearGradient(0, 0, 42, -18);
    lGrad.addColorStop(0, "#1b4332");
    lGrad.addColorStop(0.6, "#40916c");
    lGrad.addColorStop(1, "#f3d292");
    rCtx.fillStyle = lGrad;
    rCtx.beginPath();
    rCtx.moveTo(0, 0);
    rCtx.quadraticCurveTo(22, -22, 46, -8);
    rCtx.quadraticCurveTo(22, 16, 0, 0);
    rCtx.fill();
    rCtx.strokeStyle = "rgba(243, 210, 146, 0.55)";
    rCtx.lineWidth = 1;
    rCtx.beginPath();
    rCtx.moveTo(0, 0);
    rCtx.lineTo(38, -7);
    rCtx.stroke();
    rCtx.restore();
  };

  drawLeaf(cx - 4, 245, -2.4, 1);
  drawLeaf(cx - 2, 280, -0.5, 0.92);

  for (let i = 0; i < 24; i++) {
    const t = i / 24;
    const sy = 360 - t * 185;
    const sx = 150 + Math.sin(t * 10 + roseRotation * 6) * (16 * (1 - t * 0.4));
    rCtx.fillStyle = "#fff0c2";
    rCtx.shadowColor = "#f3d292";
    rCtx.shadowBlur = 8;
    rCtx.beginPath();
    rCtx.arc(sx, sy, 1.8, 0, Math.PI * 2);
    rCtx.fill();
  }
  rCtx.restore();

  const TOTAL_PETALS = 68;
  const GOLDEN_ANGLE = 2.399963229728653;
  const petals3D = [];

  for (let i = 0; i < TOTAL_PETALS; i++) {
    const layerRatio = i / (TOTAL_PETALS - 1);
    const delay = (1 - layerRatio) * 0.42;
    const localBloom = Math.max(0, Math.min(1, (bloomProgress - delay) / 0.58));
    const easedBloom = 1 - Math.pow(1 - localBloom, 3);

    const theta = i * GOLDEN_ANGLE + roseRotation * (0.6 + layerRatio * 0.4);
    const radius = 3 + Math.pow(layerRatio, 0.85) * (14 + easedBloom * 48);

    const px = Math.cos(theta) * radius;
    const py = Math.sin(theta) * radius * 0.62;
    const pz = Math.sin(theta) * radius - layerRatio * 18;

    const petalW = 16 + layerRatio * (26 + easedBloom * 22);
    const petalH = 22 + layerRatio * (30 + easedBloom * 24);
    const rot = Math.atan2(py, px) + Math.PI / 2;

    petals3D.push({
      x: cx + px,
      y: cy + py - (1 - layerRatio) * 8,
      z: pz - layerRatio * 30,
      w: petalW,
      h: petalH,
      rot,
      layerRatio,
      openFactor: easedBloom,
      hasDewdrop: i % 11 === 0 && i > 20
    });
  }

  petals3D.sort((a, b) => a.z - b.z);

  for (const pt of petals3D) {
    drawVelvetPetal(rCtx, pt.x, pt.y, pt.w, pt.h, pt.rot, pt.layerRatio, pt.openFactor, pt.hasDewdrop);
  }

  const coreGlow = rCtx.createRadialGradient(cx, cy - 6, 1, cx, cy - 6, 22);
  coreGlow.addColorStop(0, `rgba(255, 240, 194, ${0.5 + 0.4 * Math.sin(roseRotation * 5)})`);
  coreGlow.addColorStop(1, "rgba(255, 30, 86, 0)");
  rCtx.fillStyle = coreGlow;
  rCtx.beginPath();
  rCtx.arc(cx, cy - 6, 22, 0, Math.PI * 2);
  rCtx.fill();

  requestAnimationFrame(renderRose3D);
}

/**
 * ============================================================================
 * 4. TRÁI TIM 3D BẰNG HẠT SÁNG Ở SCENE 4
 * ============================================================================
 */
const heart3dCanvas = document.getElementById("heart-3d-canvas");
const hCtx = heart3dCanvas.getContext("2d");
let heartPoints = [];
let heartAngle = 0;

function initHeart3D() {
  const dpr = window.devicePixelRatio || 1;
  heart3dCanvas.width = 240 * dpr;
  heart3dCanvas.height = 220 * dpr;
  hCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  heartPoints = [];
  for (let i = 0; i < 220; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());
    const x = 16 * Math.pow(Math.sin(t), 3) * r;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
    const z = (Math.random() - 0.5) * 10 * r;
    heartPoints.push({
      x, y, z,
      color: i % 3 === 0 ? "#fff0c2" : "#ff1e56",
      size: Math.random() * 2 + 1
    });
  }
}
initHeart3D();

function renderHeart3D() {
  hCtx.clearRect(0, 0, 240, 220);
  heartAngle += 0.025;
  const beat = 1 + 0.08 * Math.sin(heartAngle * 3.2);
  const scale = 4.6 * beat;

  for (const pt of heartPoints) {
    const rx = pt.x * Math.cos(heartAngle) - pt.z * Math.sin(heartAngle);
    const rz = pt.x * Math.sin(heartAngle) + pt.z * Math.cos(heartAngle);
    const proj = 180 / (180 + rz * 4);

    const sx = 120 + rx * scale * proj;
    const sy = 105 + pt.y * scale * proj;

    hCtx.save();
    hCtx.fillStyle = pt.color;
    hCtx.shadowColor = pt.color;
    hCtx.shadowBlur = 8;
    hCtx.beginPath();
    hCtx.arc(sx, sy, pt.size * proj, 0, Math.PI * 2);
    hCtx.fill();
    hCtx.restore();
  }

  requestAnimationFrame(renderHeart3D);
}

/**
 * ============================================================================
 * 5. HIỆU ỨNG VIẾT THƯ PHÉP THUẬT (TYPEWRITER)
 * ============================================================================
 */
let typingTimers = [];

function startTypewriterLetter() {
  clearTypewriter();
  const container = document.getElementById("letter-body");
  const skipBtn = document.getElementById("btn-skip-typing");
  if (skipBtn) {
    skipBtn.style.display = "inline-block";
    skipBtn.textContent = "Hiện toàn bộ thư";
  }
  container.innerHTML = "";

  let delay = 0;
  CONFIG.loveLetter.forEach((paragraphText) => {
    const p = document.createElement("p");
    container.appendChild(p);

    for (let i = 0; i < paragraphText.length; i++) {
      const timer = setTimeout(() => {
        p.textContent += paragraphText[i];
      }, delay);
      typingTimers.push(timer);
      delay += 20;
    }
    delay += 300;
  });

  const finishTimer = setTimeout(() => {
    if (skipBtn) skipBtn.style.display = "none";
    const finaleBtn = document.getElementById("btn-to-finale");
    if (finaleBtn) {
      finaleBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, delay + 100);
  typingTimers.push(finishTimer);
}

function clearTypewriter() {
  typingTimers.forEach(t => clearTimeout(t));
  typingTimers = [];
}

function showFullLetterImmediately() {
  clearTypewriter();
  const container = document.getElementById("letter-body");
  const skipBtn = document.getElementById("btn-skip-typing");
  if (skipBtn) skipBtn.style.display = "none";
  container.innerHTML = "";
  CONFIG.loveLetter.forEach((paragraphText) => {
    const p = document.createElement("p");
    p.textContent = paragraphText;
    container.appendChild(p);
  });
  const finaleBtn = document.getElementById("btn-to-finale");
  if (finaleBtn) {
    setTimeout(() => {
      finaleBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
}

/**
 * ============================================================================
 * 6. HỘP NHẠC PIANO ĐA ÂM SẮC (TỰ BẬT KHI QUA MÀN VIDEO)
 * ============================================================================
 */
let audioCtx = null;
let isPlayingMusic = false;
let musicTimer = null;

const melodySequence = [
  [261.63, 523.25], [329.63], [392.00], [493.88],
  [220.00, 440.00], [261.63], [329.63], [392.00],
  [174.61, 349.23], [220.00], [261.63], [349.23],
  [196.00, 392.00], [246.94], [293.66], [392.00]
];
let stepIdx = 0;

function playChordNotes(freqs) {
  if (!audioCtx || !isPlayingMusic) return;
  const now = audioCtx.currentTime;

  freqs.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = idx === 0 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(idx === 0 ? 0.06 : 0.08, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.9);
  });
}

function startMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === "suspended") audioCtx.resume();
  if (isPlayingMusic) return;

  isPlayingMusic = true;
  document.getElementById("music-label").textContent = "♪ Nhạc: Bật";
  document.getElementById("music-dot").classList.add("playing");

  playChordNotes(melodySequence[stepIdx]);
  musicTimer = setInterval(() => {
    stepIdx = (stepIdx + 1) % melodySequence.length;
    playChordNotes(melodySequence[stepIdx]);
  }, 520);
}

function stopMusic() {
  isPlayingMusic = false;
  document.getElementById("music-label").textContent = "♪ Nhạc: Tắt";
  document.getElementById("music-dot").classList.remove("playing");
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}

/**
 * ============================================================================
 * 7. ĐIỀU HƯỚNG CÁC MÀN (CÓ MÀN VIDEO ĐẦU TIÊN)
 * ============================================================================
 */
let autoFireworkInterval = null;

function switchScene(sceneId) {
  triggerShockwave(window.innerWidth / 2, window.innerHeight / 2);

  // Dừng video nếu rời khỏi màn hình video
  const introVideo = document.getElementById("intro-video");
  if (sceneId !== "scene-video" && introVideo) {
    introVideo.pause();
  }

  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(sceneId);
  if (target) target.classList.add("active");

  currentScene = sceneId;
  const replayBtn = document.getElementById("replay-btn");
  replayBtn.classList.toggle("hidden", sceneId === "scene-1");

  if (autoFireworkInterval) {
    clearInterval(autoFireworkInterval);
    autoFireworkInterval = null;
  }

  // Khi vào màn Video: tạm tắt nhạc nền web để nghe rõ tiếng trong video
  if (sceneId === "scene-video" && introVideo) {
    stopMusic();
    introVideo.classList.remove("hidden");
    const fallbackMsg = document.getElementById("video-fallback-msg");
    if (fallbackMsg) fallbackMsg.classList.add("hidden");

    try {
      if (introVideo.readyState >= 1) {
        introVideo.currentTime = 0;
      }
    } catch (e) {
      // ignore
    }

    const btnVideoPlay = document.getElementById("btn-video-play");
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (btnVideoPlay) btnVideoPlay.textContent = "⏸ Tạm dừng";
      }).catch((err) => {
        console.warn("Autoplay was prevented:", err);
        if (btnVideoPlay) btnVideoPlay.textContent = "▶ Phát video";
      });
    }
  }

  // Khi bước từ Video sang Vườn Hoa Hồng (Scene 2): Bật nhạc nền + nở hoa 3D
  if (sceneId === "scene-2") {
    startMusic();
    triggerRoseBloom();
  }

  // Màn 4: Bắn pháo hoa trái tim
  if (sceneId === "scene-4") {
    launchHeartFirework(window.innerWidth * 0.5, window.innerHeight * 0.28);
    setTimeout(() => launchHeartFirework(window.innerWidth * 0.3, window.innerHeight * 0.35), 400);
    setTimeout(() => launchHeartFirework(window.innerWidth * 0.7, window.innerHeight * 0.32), 800);

    autoFireworkInterval = setInterval(() => {
      if (currentScene === "scene-4") {
        const tx = window.innerWidth * (0.2 + Math.random() * 0.6);
        const ty = window.innerHeight * (0.18 + Math.random() * 0.32);
        launchHeartFirework(tx, ty);
      }
    }, 2200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyPersonalization();
  initBackgroundFX();
  renderGlobalFX();
  renderRose3D();
  renderHeart3D();

  const introVideo = document.getElementById("intro-video");
  const btnVideoPlay = document.getElementById("btn-video-play");
  const btnVideoMute = document.getElementById("btn-video-mute");
  const fallbackMsg = document.getElementById("video-fallback-msg");

  // Đảm bảo video hiển thị khi sẵn sàng
  introVideo.addEventListener("loadeddata", () => {
    introVideo.classList.remove("hidden");
    if (fallbackMsg) fallbackMsg.classList.add("hidden");
  });

  // Báo hướng dẫn nếu thực sự không tìm thấy hoặc lỗi video
  introVideo.addEventListener("error", () => {
    if (introVideo.error && (!introVideo.currentSrc || introVideo.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) {
      introVideo.classList.add("hidden");
      if (fallbackMsg) fallbackMsg.classList.remove("hidden");
    }
  });

  // Tự động sang Vườn Hoa Hồng khi video phát xong
  introVideo.addEventListener("ended", () => {
    btnVideoPlay.textContent = "↺ Xem lại video";
    if (CONFIG.autoNextWhenVideoEnds) {
      setTimeout(() => {
        if (currentScene === "scene-video") {
          switchScene("scene-2");
        }
      }, 900);
    }
  });

  // Nút Tạm dừng / Phát tiếp video
  btnVideoPlay.addEventListener("click", () => {
    if (introVideo.paused) {
      introVideo.play();
      btnVideoPlay.textContent = "⏸ Tạm dừng";
    } else {
      introVideo.pause();
      btnVideoPlay.textContent = "▶ Phát tiếp";
    }
  });

  // Nút Bật / Tắt tiếng video
  btnVideoMute.addEventListener("click", () => {
    introVideo.muted = !introVideo.muted;
    btnVideoMute.textContent = introVideo.muted ? "🔇 Đang tắt tiếng" : "🔊 Có tiếng";
  });

  // Vuốt / di chuột tạo bụi sao
  window.addEventListener("pointermove", (e) => {
    spawnMagicTrail(e.clientX, e.clientY, 2);
    userTiltX = (e.clientX / window.innerWidth - 0.5) * 2;
    userTiltY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener("pointerdown", (e) => {
    spawnMagicTrail(e.clientX, e.clientY, 10);
    if (currentScene === "scene-4" && !e.target.closest("button")) {
      launchHeartFirework(e.clientX, e.clientY);
    }
  });

  // 1. Bấm nút ở Màn 1 -> Mở Màn Video Đầu Tiên
  document.getElementById("btn-open-gift").addEventListener("click", () => {
    switchScene("scene-video");
  });

  // 2. Bấm nút từ Màn Video -> Sang Màn Hoa Hồng 3D (Scene 2)
  document.getElementById("btn-after-video").addEventListener("click", () => {
    switchScene("scene-2");
  });

  // Nút xem hoa nở lại
  document.getElementById("btn-rebloom").addEventListener("click", () => {
    triggerRoseBloom();
    triggerShockwave(window.innerWidth / 2, window.innerHeight * 0.45);
  });

  // 3. Từ Màn Hoa Hồng -> Sang Màn Phong Thư (Scene 3)
  document.getElementById("btn-to-letter").addEventListener("click", () => {
    switchScene("scene-3");
  });

  // Mở phong thư Hoàng Gia
  const luxuryEnvelope = document.getElementById("luxury-envelope");
  const envelopeStage = document.getElementById("envelope-stage");
  const letterModal = document.getElementById("letter-modal");
  const envelopeTitle = document.getElementById("envelope-title");

  luxuryEnvelope.addEventListener("click", (e) => {
    if (luxuryEnvelope.classList.contains("open")) return;
    luxuryEnvelope.classList.add("open");
    const rect = e.currentTarget.getBoundingClientRect();
    triggerShockwave(rect.left + rect.width / 2, rect.top + rect.height / 2);
    envelopeTitle.textContent = "Lá Thư Dành Riêng Cho Em";

    setTimeout(() => {
      envelopeStage.classList.add("hidden");
      letterModal.classList.remove("hidden");
      startTypewriterLetter();
    }, 950);
  });

  document.getElementById("btn-skip-typing").addEventListener("click", showFullLetterImmediately);

  // 4. Từ Màn Lá Thư -> Sang Màn Pháo Hoa Cuối (Scene 4)
  document.getElementById("btn-to-finale").addEventListener("click", () => {
    switchScene("scene-4");
  });

  // Nút bắn đại tiệc pháo hoa
  document.getElementById("btn-mega-fireworks").addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const tx = window.innerWidth * (0.18 + Math.random() * 0.64);
        const ty = window.innerHeight * (0.15 + Math.random() * 0.35);
        launchHeartFirework(tx, ty);
      }, i * 260);
    }
  });

  // Bật/Tắt nhạc nền
  document.getElementById("music-toggle").addEventListener("click", () => {
    if (isPlayingMusic) stopMusic();
    else startMusic();
  });

  // Xem lại từ đầu
  document.getElementById("replay-btn").addEventListener("click", () => {
    clearTypewriter();
    luxuryEnvelope.classList.remove("open");
    envelopeStage.classList.remove("hidden");
    letterModal.classList.add("hidden");
    const skipBtn = document.getElementById("btn-skip-typing");
    if (skipBtn) skipBtn.style.display = "inline-block";
    envelopeTitle.textContent = "Chạm vào ấn sáp vàng để mở thư";
    switchScene("scene-1");
  });
});
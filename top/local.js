/**

- SAVE POINT 上原田 - タウンページ専用JavaScript
- town-page.js
  */

// === グローバル変数 === //
let clockInterval;
let shishimaiMessages = [
“過去と未来をつなぐ案内役です。\n何かお困りのことはありませんか？”,
“水路の流れに沿って、\n各ページを巡ってみてください。”,
“先祖からの手紙を\nまだ読んでいませんね？”,
“花田ICは時空の結合点。\n多くの物語が交差しています。”,
“上原田の水は\n全てのページをつないでいます。”
];

// === 初期化 === //
document.addEventListener(‘DOMContentLoaded’, function() {
initializeClock();
initializeShishimai();
initializeModal();
initializeNavigation();
addPageLoadAnimation();
});

// === 時計機能 === //
function updateTime() {
const now = new Date();
const timeString = formatDateTime(now);
const clockElement = document.getElementById(‘current-time’);

if (clockElement) {
clockElement.textContent = timeString;
}
}

function formatDateTime(date) {
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, ‘0’);
const day = String(date.getDate()).padStart(2, ‘0’);
const hours = String(date.getHours()).padStart(2, ‘0’);
const minutes = String(date.getMinutes()).padStart(2, ‘0’);
const seconds = String(date.getSeconds()).padStart(2, ‘0’);

return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function initializeClock() {
updateTime(); // 即座に表示
clockInterval = setInterval(updateTime, 1000);
}

// === 獅子舞ナビゲーター === //
function showGuide() {
const randomIndex = Math.floor(Math.random() * shishimaiMessages.length);
const message = shishimaiMessages[randomIndex];

// カスタムアラート風モーダルを作成
showCustomAlert(“獅子舞ナビゲーター”, message);
}

function showCustomAlert(title, message) {
// 既存のカスタムアラートがあれば削除
const existingAlert = document.getElementById(‘custom-alert’);
if (existingAlert) {
existingAlert.remove();
}

// カスタムアラートHTML作成
const alertHtml = `<div id="custom-alert" class="modal" style="display: block;"> <div class="modal-content" style="max-width: 400px; text-align: center;"> <span class="close" onclick="closeCustomAlert()">&times;</span> <h3 style="color: var(--shishimai-red); margin-bottom: 1rem;"> 🦁 ${title} </h3> <p style="line-height: 1.6; white-space: pre-line;">${message}</p> <button onclick="closeCustomAlert()" style=" background: var(--shishimai-red); color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 20px; cursor: pointer; margin-top: 1rem; font-weight: bold; ">了解</button> </div> </div>`;

document.body.insertAdjacentHTML(‘beforeend’, alertHtml);
}

function closeCustomAlert() {
const alert = document.getElementById(‘custom-alert’);
if (alert) {
alert.style.animation = ‘modalDisappear 0.3s ease-out’;
setTimeout(() => alert.remove(), 300);
}
}

function initializeShishimai() {
const shishimai = document.querySelector(’.shishimai-guide’);
if (shishimai) {
// ランダムな間隔で微妙に動かす
setInterval(() => {
if (Math.random() < 0.3) { // 30%の確率で動く
shishimai.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
setTimeout(() => {
shishimai.style.transform = ‘’;
}, 500);
}
}, 3000);
}
}

// === モーダル機能 === //
function openLetter() {
const modal = document.getElementById(‘letter-modal’);
if (modal) {
modal.style.display = ‘block’;
document.body.style.overflow = ‘hidden’; // スクロール防止
}
}

function closeLetter() {
const modal = document.getElementById(‘letter-modal’);
if (modal) {
modal.style.display = ‘none’;
document.body.style.overflow = ‘’; // スクロール復活
}
}

function initializeModal() {
// モーダル外クリックで閉じる
window.addEventListener(‘click’, function(event) {
const modal = document.getElementById(‘letter-modal’);
const customAlert = document.getElementById(‘custom-alert’);

```
if (event.target === modal) {
  closeLetter();
}
if (event.target === customAlert) {
  closeCustomAlert();
}
```

});

// ESCキーでモーダルを閉じる
document.addEventListener(‘keydown’, function(event) {
if (event.key === ‘Escape’) {
closeLetter();
closeCustomAlert();
}
});
}

// === ナビゲーション機能 === //
function initializeNavigation() {
const navItems = document.querySelectorAll(’.nav-item’);
const navContainer = document.getElementById(‘nav-items’);
const prevBtn = document.getElementById(‘nav-prev’);
const nextBtn = document.getElementById(‘nav-next’);

// 水の流れエフェクト
navItems.forEach(item => {
item.addEventListener(‘click’, function(e) {
createWaterRipple(e.target);
});
});

// ナビゲーション制御ボタン
if (prevBtn && nextBtn && navContainer) {
prevBtn.addEventListener(‘click’, function() {
// アニメーション速度を速くする
navContainer.style.animationDuration = ‘10s’;
setTimeout(() => {
navContainer.style.animationDuration = ‘20s’;
}, 3000);
});

```
nextBtn.addEventListener('click', function() {
  // アニメーション速度を遅くする
  navContainer.style.animationDuration = '30s';
  setTimeout(() => {
    navContainer.style.animationDuration = '20s';
  }, 3000);
});

// ホバー時にアニメーション一時停止
navContainer.parentElement.addEventListener('mouseenter', function() {
  navContainer.style.animationPlayState = 'paused';
});

navContainer.parentElement.addEventListener('mouseleave', function() {
  navContainer.style.animationPlayState = 'running';
});
```

}
}

function createWaterRipple(element) {
const ripple = document.createElement(‘div’);
ripple.style.cssText = `position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.6); transform: scale(0); animation: ripple 0.6s linear; pointer-events: none;`;

const rect = element.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
ripple.style.width = ripple.style.height = size + ‘px’;
ripple.style.left = (rect.width - size) / 2 + ‘px’;
ripple.style.top = (rect.height - size) / 2 + ‘px’;

element.style.position = ‘relative’;
element.appendChild(ripple);

setTimeout(() => ripple.remove(), 600);
}

// === ページロードアニメーション === //
function addPageLoadAnimation() {
const contentCards = document.querySelectorAll(’.content-card’);

// カードを順次表示
contentCards.forEach((card, index) => {
card.style.opacity = ‘0’;
card.style.transform = ‘translateY(20px)’;

```
setTimeout(() => {
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  card.style.opacity = '1';
  card.style.transform = 'translateY(0)';
}, index * 200);
```

});
}

// === ユーティリティ関数 === //
function getRandomShishimaiMessage() {
return shishimaiMessages[Math.floor(Math.random() * shishimaiMessages.length)];
}

function formatTime(date) {
return date.toLocaleTimeString(‘ja-JP’, {
hour: ‘2-digit’,
minute: ‘2-digit’,
second: ‘2-digit’
});
}

// === 水路アニメーション制御 === //
function pauseWaterFlow() {
const waterNav = document.querySelector(’.water-navigation::before’);
if (waterNav) {
waterNav.style.animationPlayState = ‘paused’;
}
}

function resumeWaterFlow() {
const waterNav = document.querySelector(’.water-navigation::before’);
if (waterNav) {
waterNav.style.animationPlayState = ‘running’;
}
}

// === クリーンアップ === //
window.addEventListener(‘beforeunload’, function() {
if (clockInterval) {
clearInterval(clockInterval);
}
});

// === CSS動的追加（リップルエフェクト用） === //
const rippleStyle = document.createElement(‘style’);
rippleStyle.textContent = `
@keyframes ripple {
to {
transform: scale(4);
opacity: 0;
}
}

@keyframes modalDisappear {
from {
opacity: 1;
transform: scale(1) translateY(0);
}
to {
opacity: 0;
transform: scale(0.8) translateY(-50px);
}
}
`;
document.head.appendChild(rippleStyle);

// === デバッグ用（開発時のみ） === //
if (window.location.hostname === ‘localhost’ || window.location.hostname === ‘127.0.0.1’) {
console.log(‘🦁 SAVE POINT 上原田 - タウンページが読み込まれました’);
console.log(‘🌊 水路ナビゲーション:’, document.querySelector(’.water-navigation’) ? ‘✓’ : ‘✗’);
console.log(‘⏰ デジタル時計:’, document.getElementById(‘current-time’) ? ‘✓’ : ‘✗’);
console.log(‘📜 先祖の手紙:’, document.getElementById(‘letter-modal’) ? ‘✓’ : ‘✗’);
}
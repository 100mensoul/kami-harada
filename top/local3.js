`;
document.head.appendChild(rippleStyle);

// ページの読み込みとウィンドウサイズ変更時に実行
window.addEventListener('load', setFooterHeight);
window.addEventListener('resize', setFooterHeight);

// === デバッグ用（開発時のみ） === //
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
console.log('🦁 SAVE POINT 上原田 - タウンページが読み込まれました');
console.log('🌊 水路ナビゲーション:', document.querySelector('.water-navigation') ? '✓' : '✗');
console.log('⏰ デジタル時計:', document.getElementById('current-time') ? '✓' : '✗');
console.log('📜 先祖の手紙:', document.getElementById('letter-modal') ? '✓' : '✗');
}
}

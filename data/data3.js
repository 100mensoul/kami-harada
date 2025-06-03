document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeAnimations();
    initializeScrollEffects();
    initializeNavigation();
});

// カウンターアニメーション初期化
function initializeCounters() {
    const numbers = document.querySelectorAll('.hierarchy-number[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    numbers.forEach(number => {
        counterObserver.observe(number);
    });
}

// カウンターアニメーション実行
function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000; // 2秒
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数（ease-out）
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (target - startValue) * easeOut;
        
        // 小数点を含む数値の表示調整
        if (target < 10 && target % 1 !== 0) {
            element.textContent = currentValue.toFixed(2);
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // 最終値を正確に表示
            if (target < 10 && target % 1 !== 0) {
                element.textContent = target;
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// カードアニメーション初期化
function initializeAnimations() {
    const cards = document.querySelectorAll('.stat-card, .appeal-card, .hierarchy-card, .vision-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        cardObserver.observe(card);
    });
}

// スクロール効果の初期化
function initializeScrollEffects() {
    // ヘッダーの視差効果
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const rate = scrollY * -0.3;
        header.style.transform = `translateY(${rate}px)`;
    });

    // セクション間のスムーズなトランジション
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// ナビゲーション機能の初期化
function initializeNavigation() {
    // 内部リンクのスムーズスクロール
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // アクティブ状態のハイライト
                highlightActiveSection(targetElement);
            }
        });
    });
}

// アクティブセクションのハイライト
function highlightActiveSection(element) {
    // 既存のハイライトを削除
    document.querySelectorAll('.section-active').forEach(el => {
        el.classList.remove('section-active');
    });
    
    // 新しいセクションをハイライト
    element.classList.add('section-active');
    
    // 3秒後にハイライトを削除
    setTimeout(() => {
        element.classList.remove('section-active');
    }, 3000);
}

// 広域ルートマップ表示機能（未実装ページ用）
function showRouteMap() {
    showModal({
        title: '広域ルートマップ',
        content: `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🗺️</div>
                <h3 style="color: #34495e; margin-bottom: 15px;">広域ルートマップページ</h3>
                <p style="color: #5a6c7d; line-height: 1.6; margin-bottom: 20px;">
                    上原田から各都市へのアクセスルートを視覚化したマップページを準備中です。<br>
                    高速道路、一般道路、公共交通機関を組み合わせた最適ルートを表示予定です。
                </p>
                <button class="btn-detail" onclick="closeModal()">了解</button>
            </div>
        `
    });
}

// ビジョン詳細表示機能
function showVisionDetails() {
    showModal({
        title: '目指すべき未来 - 詳細ビジョン',
        content: `
            <div style="padding: 20px;">
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #34495e; margin-bottom: 15px;">🌾 花田の原風景を残す</h3>
                    <p style="color: #5a6c7d; line-height: 1.8; margin-bottom: 20px;">
                        急速な都市化が進む中で、この地域が持つ豊かな田園風景と自然環境を次世代に継承することを目指します。
                        開発と保全のバランスを取りながら、持続可能な地域づくりを進めていきます。
                    </p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #34495e; margin-bottom: 15px;">🤝 持続可能なコミュニティ</h3>
                    <p style="color: #5a6c7d; line-height: 1.8; margin-bottom: 20px;">
                        地域住民、企業、来訪者が協力し合い、共に成長できるコミュニティの形成を目指します。
                        経済的な発展と環境保全、文化の継承を両立させる取り組みを推進します。
                    </p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #34495e; margin-bottom: 15px;">💡 革新と伝統の融合</h3>
                    <p style="color: #5a6c7d; line-height: 1.8; margin-bottom: 20px;">
                        姫路の伝統的な皮革産業と新しい技術・アイデアを融合し、
                        この地域ならではの新しい価値を創造していきます。
                        アートとクラフトマンシップの融合による新たな産業の創出を目指します。
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #5a6c7d; font-style: italic; margin-bottom: 20px;">
                        株式会社SPACE代表 福本理恵
                    </p>
                    <button class="btn-future" onclick="closeModal()">ビジョンに共感する</button>
                </div>
            </div>
        `
    });
}

// モーダル表示機能
function showModal({title, content}) {
    // モーダルが既に存在する場合は削除
    const existingModal = document.getElementById('dynamicModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // モーダルHTML作成
    const modalHTML = `
        <div id="dynamicModal" class="modal-overlay">
            <div class="modal-content-wrapper">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <span class="modal-close" onclick="closeModal()">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    // モーダルをbodyに追加
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // モーダルスタイルを追加（未定義の場合）
    if (!document.getElementById('modalStyles')) {
        const modalStyles = `
            <style id="modalStyles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(8px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content-wrapper {
                    background: white;
                    border-radius: 20px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 30px 30px 20px;
                    border-bottom: 1px solid #e8eae2;
                }
                
                .modal-header h2 {
                    color: #34495e;
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin: 0;
                }
                
                .modal-close {
                    font-size: 28px;
                    cursor: pointer;
                    color: #5a6c7d;
                    transition: color 0.3s ease;
                    padding: 5px;
                    line-height: 1;
                }
                
                .modal-close:hover {
                    color: #34495e;
                }
                
                .modal-body {
                    padding: 30px;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }
    
    // ESCキーでモーダルを閉じる
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // モーダル外クリックで閉じる
    const modal = document.getElementById('dynamicModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// モーダル閉じる機能
function closeModal() {
    const modal = document.getElementById('dynamicModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // ESCキーイベントリスナーを削除
    document.removeEventListener('keydown', handleEscape);
}

// 未実装ページ用のプレースホルダー関数
function showRoadStationDetail() {
    showModal({
        title: '道の駅計画詳細',
        content: `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🏪</div>
                <h3 style="color: #34495e; margin-bottom: 15px;">道の駅詳細計画ページ</h3>
                <p style="color: #5a6c7d; line-height: 1.6; margin-bottom: 20px;">
                    道の駅の詳細計画、設計図、集客予測、経済効果分析などの<br>
                    専門情報をまとめたページを準備中です。
                </p>
                <button class="btn-detail" onclick="closeModal()">了解</button>
            </div>
        `
    });
}

function showInboundDetail() {
    showModal({
        title: 'インバウンド観光詳細分析',
        content: `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🌏</div>
                <h3 style="color: #34495e; margin-bottom: 15px;">インバウンド詳細分析ページ</h3>
                <p style="color: #5a6c7d; line-height: 1.6; margin-bottom: 20px;">
                    外国人観光客の動向、ニーズ分析、受け入れ体制の評価などの<br>
                    詳細データをまとめたページを準備中です。
                </p>
                <button class="btn-detail" onclick="closeModal()">了解</button>
            </div>
        `
    });
}

function showLeatherIndustry() {
    showModal({
        title: '世界に誇る姫路の皮革産業',
        content: `
            <div style="padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🎨</div>
                    <h3 style="color: #34495e; margin-bottom: 15px;">世界に誇る姫路の皮革産業</h3>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <h4 style="color: #34495e; margin-bottom: 10px;">🏭 産業の歴史と規模</h4>
                    <p style="color: #5a6c7d; line-height: 1.6;">
                        姫路の皮革産業は400年以上の歴史を持ち、市川東岸地域を中心に発展してきました。
                        現在でも全国有数の皮革生産地として、高品質な革製品を世界に供給しています。
                    </p>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <h4 style="color: #34495e; margin-bottom: 10px;">🎯 アートとの融合</h4>
                    <p style="color: #5a6c7d; line-height: 1.6;">
                        伝統的な職人技術と現代アートの融合により、新しい文化価値を創造しています。
                        アートインレジデンスプログラムなどを通じて、国際的な注目を集めています。
                    </p>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <h4 style="color: #34495e; margin-bottom: 10px;">🌍 国際展開の可能性</h4>
                    <p style="color: #5a6c7d; line-height: 1.6;">
                        高い技術力と品質により、欧米やアジア市場での評価が高まっています。
                        インバウンド観光との連携により、体験型観光の新たな核となる可能性があります。
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn-detail" onclick="closeModal()">詳細ページ準備中</button>
                </div>
            </div>
        `
    });
}

// ページ読み込み完了時の初期化
function initializePageFeatures() {
    // URLハッシュに基づくページ内ナビゲーション
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                highlightActiveSection(targetElement);
            }, 1000);
        }
    }
    
    // パフォーマンス最適化：画像の遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ページ全体の初期化（DOMContentLoaded後に実行）
function initializeComplete() {
    initializeCounters();
    initializeAnimations();
    initializeScrollEffects();
    initializeNavigation();
    initializePageFeatures();
    
    // ページ読み込み完了を示すクラスを追加
    document.body.classList.add('page-loaded');
    
    console.log('上原田統計データページの初期化が完了しました');
}

// ページ読み込み時の実行
document.addEventListener('DOMContentLoaded', initializeComplete);

// ウィンドウリサイズ時の処理
window.addEventListener('resize', debounce(() => {
    // レスポンシブ対応の再計算など
    console.log('ページサイズが変更されました');
}, 250));

// デバウンス関数（パフォーマンス最適化）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ページ離脱前の処理
window.addEventListener('beforeunload', () => {
    // 必要に応じてデータ保存など
    console.log('ページを離脱します');
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('ページエラーが発生しました:', e.error);
});

// グローバル関数として公開（HTML内のonclick等で使用）
window.showRouteMap = showRouteMap;
window.showVisionDetails = showVisionDetails;
window.showRoadStationDetail = showRoadStationDetail;
window.showInboundDetail = showInboundDetail;
window.showLeatherIndustry = showLeatherIndustry;
window.closeModal = closeModal;
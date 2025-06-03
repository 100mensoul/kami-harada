// グローバル変数
        let locationData = [];
        let filteredData = [];
        let selectedItems = new Set();
        let currentView = 'gallery';
        let charts = {};

        // JSONデータ読み込み
        async function loadLocationData() {
            try {
                const response = await fetch('./spot.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                locationData = await response.json();
                filteredData = [...locationData];
                return true;
            } catch (error) {
                console.error('スポットデータの読み込みに失敗しました:', error);
                // フォールバック：エラー時は空配列を使用
                locationData = [];
                filteredData = [];
                return false;
            }
        }

        // ページ初期化
        async function init() {
            // データ読み込み完了まで待機
            const dataLoaded = await loadLocationData();
            
            if (!dataLoaded) {
                // データ読み込み失敗時の処理
                showErrorMessage();
                return;
            }

            renderView();
            setupEventListeners();
            initCharts();
        }

        // エラーメッセージ表示
        function showErrorMessage() {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: rgba(255,255,255,0.9); border-radius: 20px;">
                    <h3 style="color: #2c3e31; margin-bottom: 16px;">データの読み込みに失敗しました</h3>
                    <p style="color: #6b7d6f;">スポットデータを取得できませんでした。ページを再読み込みしてください。</p>
                    <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 16px;">再読み込み</button>
                </div>
            `;
        }

        // イベントリスナー設定
        function setupEventListeners() {
            document.getElementById('typeFilter').addEventListener('change', applyFilters);
            document.getElementById('areaFilter').addEventListener('change', applyFilters);
            document.getElementById('distanceFilter').addEventListener('change', applyFilters);
            document.getElementById('searchInput').addEventListener('input', applyFilters);
        }

        // チャート初期化
        function initCharts() {
            // チャート機能は削除済み
        }

        // 開発ポテンシャルデータ取得（削除済み）

        // 種別分布データ取得
        function getTypeDistribution() {
            const types = {};
            locationData.forEach(item => {
                const typeLabel = getTypeLabel(item.type);
                types[typeLabel] = (types[typeLabel] || 0) + 1;
            });
            return {
                labels: Object.keys(types),
                values: Object.values(types)
            };
        }

        // 種別ラベル取得
        function getTypeLabel(type) {
            const labels = {
                store: '店舗',
                vacant: '空き地',
                residential: '住宅',
                agriculture: '農地',
                development: '開発予定'
            };
            return labels[type] || type;
        }

        // ビュー表示
        function renderView() {
            if (currentView === 'gallery') {
                renderGallery();
            } else {
                renderList();
            }
            updateStats();
        }

        // ギャラリー表示
        function renderGallery() {
            const gallery = document.getElementById('gallery');
            gallery.style.display = 'grid';
            document.getElementById('listView').style.display = 'none';
            
            gallery.innerHTML = '';
            filteredData.forEach(item => {
                const card = createCard(item);
                gallery.appendChild(card);
            });
        }

        // リスト表示
        function renderList() {
            document.getElementById('gallery').style.display = 'none';
            const listView = document.getElementById('listView');
            listView.style.display = 'block';
            
            const tbody = document.getElementById('listTableBody');
            tbody.innerHTML = '';
            
            filteredData.forEach(item => {
                const row = createListRow(item);
                tbody.appendChild(row);
            });
        }

        // カード作成
        function createCard(item) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <input type="checkbox" class="checkbox" onchange="toggleSelection(${item.id})" ${selectedItems.has(item.id) ? 'checked' : ''}>
                <div class="card-header">
                    <div>
                        <div class="card-title">${item.name}</div>
                        <div class="card-address">${item.address}</div>
                    </div>
                    <div class="card-type">${item.category}</div>
                </div>
                <div class="card-info">
                    <div class="info-item">
                        <div class="info-label">面積</div>
                        <div class="info-value">${item.area.toLocaleString()}m²</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">区分</div>
                        <div class="info-value">${item.zoning}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">姫路駅まで</div>
                        <div class="info-value">車で${item.accessibility.himejiStation}分</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">状態</div>
                        <div class="info-value">${item.status}</div>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary btn-small" onclick="showDetail(${item.id})">詳細を見る</button>
                    <button class="btn btn-secondary btn-small" onclick="showOnMap(${item.id})">地図で見る</button>
                </div>
            `;
            return card;
        }

        // リスト行作成
        function createListRow(item) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" onchange="toggleSelection(${item.id})" ${selectedItems.has(item.id) ? 'checked' : ''}></td>
                <td>${item.name}</td>
                <td>${getTypeLabel(item.type)}</td>
                <td>${item.area.toLocaleString()}m²</td>
                <td>車で${item.accessibility.himejiStation}分</td>
                <td>${item.status}</td>
                <td>
                    <button class="btn btn-primary btn-small" onclick="showDetail(${item.id})">詳細</button>
                    <button class="btn btn-secondary btn-small" onclick="showOnMap(${item.id})">地図</button>
                </td>
            `;
            return row;
        }

        // フィルター適用
        function applyFilters() {
            const typeFilter = document.getElementById('typeFilter').value;
            const areaFilter = document.getElementById('areaFilter').value;
            const distanceFilter = document.getElementById('distanceFilter').value;
            const searchText = document.getElementById('searchInput').value.toLowerCase();

            filteredData = locationData.filter(item => {
                if (typeFilter && item.type !== typeFilter) return false;

                if (areaFilter) {
                    const [min, max] = areaFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v) || 0);
                    if (item.area < min || (max !== Infinity && item.area >= max)) return false;
                }

                if (distanceFilter) {
                    const [min, max] = distanceFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v) || 0);
                    if (item.accessibility.himejiStation < min || 
                        (max !== Infinity && item.accessibility.himejiStation >= max)) return false;
                }

                if (searchText) {
                    const searchableText = `${item.name} ${item.address} ${item.category}`.toLowerCase();
                    if (!searchableText.includes(searchText)) return false;
                }

                return true;
            });

            renderView();
        }

        // アイテム選択切り替え
        function toggleSelection(id) {
            if (selectedItems.has(id)) {
                selectedItems.delete(id);
            } else {
                selectedItems.add(id);
            }
            updateStats();
        }

        // グローバル関数として定義（HTMLから呼び出される）
        window.toggleSelection = toggleSelection;
        window.showDetail = showDetail;
        window.showOnMap = showOnMap;
        window.exportSelected = exportSelected;
        window.clearSelection = clearSelection;
        window.setView = setView;
        window.closeModal = closeModal;

        // 統計情報更新
        function updateStats() {
            const totalSpots = filteredData.length;
            const storeCount = filteredData.filter(item => item.type === 'store').length;
            const vacantCount = filteredData.filter(item => item.type === 'vacant' || item.type === 'development').length;
            const selectedCount = selectedItems.size;
            
            document.getElementById('totalSpots').textContent = totalSpots;
            document.getElementById('storeCount').textContent = storeCount;
            document.getElementById('vacantCount').textContent = vacantCount;
            document.getElementById('selectedCount').textContent = selectedCount;
            
            console.log('統計更新:', { totalSpots, storeCount, vacantCount, selectedCount });
        }

        // 詳細表示
        function showDetail(id) {
            const item = locationData.find(item => item.id == id);
            if (!item) {
                console.error('アイテムが見つかりません:', id);
                return;
            }

            document.getElementById('modalTitle').textContent = item.name;
            document.getElementById('modalBody').innerHTML = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>基本情報</h3>
                        <div class="info-item">
                            <div class="info-label">種別</div>
                            <div class="info-value">${item.category}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">住所</div>
                            <div class="info-value">${item.address}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">面積</div>
                            <div class="info-value">${item.area.toLocaleString()}m²</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">区分</div>
                            <div class="info-value">${item.zoning}</div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h3>アクセス・交通</h3>
                        <div class="info-item">
                            <div class="info-label">JR姫路駅まで</div>
                            <div class="info-value">車で${item.accessibility.himejiStation}分</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">花田ICまで</div>
                            <div class="info-value">車で${item.accessibility.hanedaIC}分</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">山陽姫路ICまで</div>
                            <div class="info-value">車で${item.accessibility.sanyoHimejiIC}分</div>
                        </div>
                        ${item.accessibility.kobe ? `
                        <div class="info-item">
                            <div class="info-label">神戸まで</div>
                            <div class="info-value">車で${item.accessibility.kobe}分</div>
                        </div>
                        ` : ''}
                        ${item.accessibility.osaka ? `
                        <div class="info-item">
                            <div class="info-label">大阪まで</div>
                            <div class="info-value">車で${item.accessibility.osaka}分</div>
                        </div>
                        ` : ''}
                    </div>
                    <div class="detail-section">
                        <h3>道路・交通状況</h3>
                        ${item.infrastructure.roadType ? `
                        <div class="info-item">
                            <div class="info-label">道路区分</div>
                            <div class="info-value">${item.infrastructure.roadType}</div>
                        </div>
                        ` : ''}
                        ${item.infrastructure.roadWidth ? `
                        <div class="info-item">
                            <div class="info-label">道路幅</div>
                            <div class="info-value">${item.infrastructure.roadWidth}</div>
                        </div>
                        ` : ''}
                        ${item.infrastructure.traffic ? `
                        <div class="info-item">
                            <div class="info-label">交通量（朝/昼/夜）</div>
                            <div class="info-value">${item.infrastructure.traffic.morning}/${item.infrastructure.traffic.noon}/${item.infrastructure.traffic.evening}</div>
                        </div>
                        ` : ''}
                    </div>
                    <div class="detail-section">
                        <h3>インフラ</h3>
                        <div class="info-item">
                            <div class="info-label">上下水道</div>
                            <div class="info-value">${item.infrastructure.water}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">電力</div>
                            <div class="info-value">${item.infrastructure.electricity}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">ガス</div>
                            <div class="info-value">${item.infrastructure.gas}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">通信</div>
                            <div class="info-value">${item.infrastructure.internet}</div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h3>運営状況</h3>
                        <div class="info-item">
                            <div class="info-label">状態</div>
                            <div class="info-value">${item.status}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">収益性</div>
                            <div class="info-value">${item.revenue}</div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('detailModal').style.display = 'block';
        }

        // モーダル閉じる
        function closeModal() {
            document.getElementById('detailModal').style.display = 'none';
        }

        // 地図で表示
        function showOnMap(id) {
            const item = locationData.find(item => item.id == id);
            if (!item) {
                console.error('アイテムが見つかりません:', id);
                return;
            }
            
            // Google Mapsの既存URLがある場合はそれを使用、なければ座標で表示
            let url;
            if (item.googleMapsUrl && item.googleMapsUrl !== "") {
                url = item.googleMapsUrl;
            } else {
                url = `https://www.google.com/maps/search/?api=1&query=${item.coordinates.lat},${item.coordinates.lng}`;
            }
            window.open(url, '_blank');
        }

        // チャート表示切り替え（削除済み）

        // CSV出力
        function exportSelected() {
            console.log('CSV出力開始、選択数:', selectedItems.size);
            console.log('選択されたアイテム:', Array.from(selectedItems));
            
            if (selectedItems.size === 0) {
                alert('エクスポートする項目を選択してください。');
                return;
            }

            const selectedData = locationData.filter(item => selectedItems.has(item.id));
            console.log('エクスポート対象データ:', selectedData);
            
            const csvContent = convertToCSV(selectedData);
            downloadCSV(csvContent, '播州ロケーションデータ.csv');
        }

        // CSV変換
        function convertToCSV(data) {
            const headers = [
                '名称', '種別', 'カテゴリ', '住所', '面積(m²)', '区分', '状態',
                '姫路駅まで(分)', '花田ICまで(分)', '山陽姫路ICまで(分)',
                '上下水道', '電力', 'ガス', '通信'
            ];

            const rows = data.map(item => [
                item.name,
                getTypeLabel(item.type),
                item.category,
                item.address,
                item.area,
                item.zoning,
                item.status,
                item.accessibility.himejiStation,
                item.accessibility.hanedaIC,
                item.accessibility.sanyoHimejiIC,
                item.infrastructure.water,
                item.infrastructure.electricity,
                item.infrastructure.gas,
                item.infrastructure.internet
            ]);

            return [headers, ...rows].map(row => 
                row.map(field => `"${field}"`).join(',')
            ).join('\n');
        }

        // CSVダウンロード
        function downloadCSV(content, filename) {
            const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // 選択解除
        function clearSelection() {
            selectedItems.clear();
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = false);
            updateStats();
        }

        // 表示切り替え
        function setView(viewType) {
            const galleryBtn = document.getElementById('galleryBtn');
            const listBtn = document.getElementById('listBtn');
            
            galleryBtn.classList.remove('active');
            listBtn.classList.remove('active');
            
            if (viewType === 'gallery') {
                galleryBtn.classList.add('active');
                currentView = 'gallery';
            } else {
                listBtn.classList.add('active');
                currentView = 'list';
            }
            
            renderView();
        }

        // ページロード時の初期化
        document.addEventListener('DOMContentLoaded', init);

        // モーダル外クリックで閉じる
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('detailModal');
            if (event.target === modal) {
                closeModal();
            }
        });

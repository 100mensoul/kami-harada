        // サンプルデータ - 実際のスポット情報に更新
        const locationData = [
            {
                id: 1,
                name: "セブンイレブン姫路上原田店",
                type: "store",
                category: "コンビニエンスストア",
                address: "兵庫県姫路市花田町上原田",
                area: 600,
                zoning: "商業地域",
                status: "営業中",
                revenue: "高",
                coordinates: { lat: 34.823456, lng: 134.623456 },
                googleMapsUrl: "https://maps.app.goo.gl/8Vp2631oNY4gL2j47",
                accessibility: {
                    himejiStation: 15,
                    hanedaIC: 2,
                    sanyoHimejiIC: 8,
                    kobe: 45,
                    osaka: 65,
                    kyoto: 90
                },
                infrastructure: {
                    roadType: "県道",
                    roadWidth: "片側一車線",
                    traffic: { morning: "中", noon: "低", evening: "高" },
                    water: "整備済み",
                    electricity: "整備済み",
                    gas: "整備済み",
                    internet: "光ファイバー対応"
                }
            },
            {
                id: 2,
                name: "西松屋 花田店",
                type: "store",
                category: "子供用品店",
                address: "兵庫県姫路市花田町上原田",
                area: 1200,
                zoning: "商業地域",
                status: "営業中",
                revenue: "中",
                coordinates: { lat: 34.823356, lng: 134.623356 },
                googleMapsUrl: "https://maps.app.goo.gl/PitdUhCmTTCYjQBC7",
                accessibility: {
                    himejiStation: 16,
                    hanedaIC: 3,
                    sanyoHimejiIC: 9,
                    kobe: 46,
                    osaka: 66,
                    kyoto: 91
                },
                infrastructure: {
                    roadType: "県道",
                    roadWidth: "片側一車線",
                    traffic: { morning: "中", noon: "中", evening: "高" },
                    water: "整備済み",
                    electricity: "整備済み",
                    gas: "整備済み",
                    internet: "光ファイバー対応"
                }
            },
            {
                id: 3,
                name: "ラ・ムー",
                type: "store",
                category: "スーパーマーケット",
                address: "兵庫県姫路市花田町上原田",
                area: 1800,
                zoning: "商業地域",
                status: "営業中",
                revenue: "高",
                coordinates: { lat: 34.823256, lng: 134.623256 },
                googleMapsUrl: "https://maps.app.goo.gl/5J75h49UHn7a9buW6",
                accessibility: {
                    himejiStation: 17,
                    hanedaIC: 4,
                    sanyoHimejiIC: 10,
                    kobe: 47,
                    osaka: 67,
                    kyoto: 92
                },
                infrastructure: {
                    roadType: "県道",
                    roadWidth: "片側一車線",
                    traffic: { morning: "高", noon: "中", evening: "高" },
                    water: "整備済み",
                    electricity: "整備済み",
                    gas: "整備済み",
                    internet: "光ファイバー対応"
                }
            },
            {
                id: 4,
                name: "マクドナルド花田フレッツガーデン店",
                type: "store",
                category: "飲食店",
                address: "兵庫県姫路市花田町上原田",
                area: 800,
                zoning: "商業地域",
                status: "営業中",
                revenue: "高",
                coordinates: { lat: 34.823156, lng: 134.623156 },
                googleMapsUrl: "https://maps.app.goo.gl/2HnVvRdxnoRxsVhz6",
                accessibility: {
                    himejiStation: 18,
                    hanedaIC: 5,
                    sanyoHimejiIC: 11,
                    kobe: 48,
                    osaka: 68,
                    kyoto: 93
                },
                infrastructure: {
                    roadType: "県道",
                    roadWidth: "片側一車線",
                    traffic: { morning: "中", noon: "高", evening: "高" },
                    water: "整備済み",
                    electricity: "整備済み",
                    gas: "整備済み",
                    internet: "光ファイバー対応"
                }
            },
            {
                id: 5,
                name: "ヤマダデンキ テックランド姫路店",
                type: "store",
                category: "家電量販店",
                address: "兵庫県姫路市花田町上原田",
                area: 2800,
                zoning: "商業地域",
                status: "営業中",
                revenue: "高",
                coordinates: { lat: 34.823056, lng: 134.623056 },
                googleMapsUrl: "https://maps.app.goo.gl/3vhSckBMswNYsnZ78",
                https://maps.app.goo.gl/KBF4FbFTK9ypuQjr6
                accessibility: {
                    himejiStation: 18,
                    hanedaIC: 5,
                    sanyoHimejiIC: 12,
                    kobe: 48,
                    osaka: 68,
                    kyoto: 93
                },
                infrastructure: {
                    roadType: "県道",
                    roadWidth: "片側一車線",
                    traffic: { morning: "中", noon: "中", evening: "高" },
                    water: "整備済み",
                    electricity: "整備済み",
                    gas: "整備済み",
                    internet: "光ファイバー対応"
                }
            },
            {
                id: 6,
                name: "道の駅（候補地）",
                type: "development",
                category: "公共施設開発予定",
                address: "兵庫県姫路市花田町上原田（花田IC東側）",
                area: 15000,
                zoning: "市街化調整区域",
                status: "2025年7月公募予定",
                revenue: "計画中",
                coordinates: { lat: 34.822956, lng: 134.622956 },
                googleMapsUrl: "https://maps.app.goo.gl/KBF4FbFTK9ypuQjr6",
                accessibility: {
                    himejiStation: 16,
                    hanedaIC: 1,
                    sanyoHimejiIC: 8,
                    kobe: 45,
                    osaka: 65,
                    kyoto: 90
                },
                infrastructure: {
                    roadType: "国道・県道接続",
                    roadWidth: "片側二車線予定",
                    traffic: { morning: "予測高", noon: "予測中", evening: "予測高" },
                    water: "整備予定",
                    electricity: "整備予定",
                    gas: "整備予定",
                    internet: "光ファイバー対応予定"
                }
            }
        ];

        let filteredData = [...locationData];
        let selectedItems = new Set();
        let currentView = 'gallery';
        let charts = {};

        // ページ初期化
        function init() {
            renderView();
            setupEventListeners();
            initCharts();
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

        // 統計情報更新
        function updateStats() {
            document.getElementById('totalSpots').textContent = filteredData.length;
            document.getElementById('storeCount').textContent = filteredData.filter(item => item.type === 'store').length;
            document.getElementById('vacantCount').textContent = filteredData.filter(item => item.type === 'vacant' || item.type === 'development').length;
            document.getElementById('selectedCount').textContent = selectedItems.size;
        }

        // 詳細表示
        function showDetail(id) {
            const item = locationData.find(item => item.id === id);
            if (!item) return;

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
            const item = locationData.find(item => item.id === id);
            if (!item) return;
            
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
            if (selectedItems.size === 0) {
                alert('エクスポートする項目を選択してください。');
                return;
            }

            const selectedData = locationData.filter(item => selectedItems.has(item.id));
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

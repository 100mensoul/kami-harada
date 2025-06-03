// グローバル変数
        let locationData = [];
        let filteredData = [];
        let selectedItems = new Set();
        let currentView = 'gallery';
        let charts = {};
        let categories = [];

        // カテゴリ情報とデータ読み込み
        async function loadAllData() {
            try {
                console.log('データ読み込み開始...');
                
                // Step 1: カテゴリ情報を読み込み
                const categoriesResponse = await fetch('./categories.json');
                if (!categoriesResponse.ok) {
                    throw new Error(`カテゴリファイル読み込みエラー: ${categoriesResponse.status}`);
                }
                const categoriesData = await categoriesResponse.json();
                categories = categoriesData.categories;
                console.log('カテゴリ情報読み込み完了:', categories.length, 'カテゴリ');

                // Step 2: 各カテゴリのJSONファイルを並行読み込み
                const dataPromises = categories.map(async (category) => {
                    try {
                        const response = await fetch(`./${category.filename}`);
                        if (!response.ok) {
                            console.warn(`${category.filename} の読み込みに失敗: ${response.status}`);
                            return { categoryId: category.id, data: [] };
                        }
                        const data = await response.json();
                        console.log(`${category.filename} 読み込み完了:`, data.length, '件');
                        
                        // カテゴリIDを各データに追加
                        const dataWithCategory = data.map(item => ({
                            ...item,
                            categoryId: category.id,
                            categoryName: category.name,
                            categoryIcon: category.icon,
                            categoryColor: category.color
                        }));
                        
                        return { categoryId: category.id, data: dataWithCategory };
                    } catch (error) {
                        console.error(`${category.filename} 読み込みエラー:`, error);
                        return { categoryId: category.id, data: [] };
                    }
                });

                // Step 3: 全データを統合
                const results = await Promise.all(dataPromises);
                locationData = [];
                results.forEach(result => {
                    locationData = locationData.concat(result.data);
                });

                filteredData = [...locationData];
                console.log('全データ統合完了:', locationData.length, '件');
                
                return true;
            } catch (error) {
                console.error('データ読み込み失敗:', error);
                locationData = [];
                filteredData = [];
                categories = [];
                return false;
            }
        }

        // ページ初期化
        async function init() {
            console.log('アプリケーション初期化開始...');
            
            // データ読み込み完了まで待機
            const dataLoaded = await loadAllData();
            
            if (!dataLoaded) {
                showErrorMessage();
                return;
            }

            // UI初期化
            setupCategoryFilter();
            renderView();
            setupEventListeners();
            initCharts();
            
            console.log('アプリケーション初期化完了');
        }

        // カテゴリフィルターのセットアップ
        function setupCategoryFilter() {
            const typeFilter = document.getElementById('typeFilter');
            if (!typeFilter) return;
            
            // 既存のオプションをクリア
            typeFilter.innerHTML = '<option value="">すべて</option>';
            
            // カテゴリ別オプションを追加
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = `${category.icon} ${category.name}`;
                typeFilter.appendChild(option);
            });
            
            // 従来の種別フィルターも追加
            const traditionalTypes = [
                { value: 'store', label: '店舗' },
                { value: 'vacant', label: '空き地' },
                { value: 'residential', label: '住宅' },
                { value: 'agriculture', label: '農地' },
                { value: 'development', label: '開発予定' }
            ];
            
            traditionalTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.value;
                option.textContent = type.label;
                typeFilter.appendChild(option);
            });
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

        // 種別分布データ取得
        function getTypeDistribution() {
            const types = {};
            locationData.forEach(item => {
                const typeLabel = item.categoryName || getTypeLabel(item.type);
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

        // カード作成（カテゴリ情報を反映）
        function createCard(item) {
            const card = document.createElement('div');
            card.className = 'card';
            
            // カテゴリカラーをカードに適用
            const categoryStyle = item.categoryColor ? 
                `style="border-left: 4px solid ${item.categoryColor};"` : '';
            
            card.innerHTML = `
                <input type="checkbox" class="checkbox" onchange="toggleSelection(${item.id})" ${selectedItems.has(item.id) ? 'checked' : ''}>
                <div class="card-header">
                    <div>
                        <div class="card-title">${item.name}</div>
                        <div class="card-address">${item.address}</div>
                    </div>
                    <div class="card-type" style="background: ${item.categoryColor || '#a4b89a'};">
                        ${item.categoryIcon || ''} ${item.category}
                    </div>
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
            
            // カテゴリカラーを適用
            if (item.categoryColor) {
                card.setAttribute('style', `border-left: 4px solid ${item.categoryColor};`);
            }
            
            return card;
        }

        // リスト行作成
        function createListRow(item) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" onchange="toggleSelection(${item.id})" ${selectedItems.has(item.id) ? 'checked' : ''}></td>
                <td>
                    <span style="color: ${item.categoryColor || '#2c3e31'};">
                        ${item.categoryIcon || ''} ${item.name}
                    </span>
                </td>
                <td>${item.categoryName || getTypeLabel(item.type)}</td>
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

        // フィルター適用（カテゴリフィルター対応）
        function applyFilters() {
            const typeFilter = document.getElementById('typeFilter').value;
            const areaFilter = document.getElementById('areaFilter').value;
            const distanceFilter = document.getElementById('distanceFilter').value;
            const searchText = document.getElementById('searchInput').value.toLowerCase();

            filteredData = locationData.filter(item => {
                // カテゴリフィルター（新機能）
                if (typeFilter && typeFilter !== item.categoryId && typeFilter !== item.type) return false;

                // 面積フィルター
                if (areaFilter) {
                    const [min, max] = areaFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v) || 0);
                    if (item.area < min || (max !== Infinity && item.area >= max)) return false;
                }

                // 距離フィルター
                if (distanceFilter) {
                    const [min, max] = distanceFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v) || 0);
                    if (item.accessibility.himejiStation < min || 
                        (max !== Infinity && item.accessibility.himejiStation >= max)) return false;
                }

                // キーワード検索
                if (searchText) {
                    const searchableText = `${item.name} ${item.address} ${item.category} ${item.categoryName || ''}`.toLowerCase();
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

        // 統計情報更新（カテゴリ別統計）
        function updateStats() {
            const totalSpots = filteredData.length;
            const storeCount = filteredData.filter(item => 
                item.type === 'store' || item.categoryId === 'commercial' || item.categoryId === 'restaurant'
            ).length;
            const vacantCount = filteredData.filter(item => 
                item.type === 'vacant' || item.type === 'development' || item.categoryId === 'tourism'
            ).length;
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
                            <div class="info-label">カテゴリ</div>
                            <div class="info-value">
                                <span style="color: ${item.categoryColor || '#2c3e31'};">
                                    ${item.categoryIcon || ''} ${item.categoryName || getTypeLabel(item.type)}
                                </span>
                            </div>
                        </div>
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

        // CSV出力（カテゴリ情報も含む）
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

        // CSV変換（カテゴリ情報追加）
        function convertToCSV(data) {
            const headers = [
                'カテゴリ', '名称', '種別', 'カテゴリ詳細', '住所', '面積(m²)', '区分', '状態',
                '姫路駅まで(分)', '花田ICまで(分)', '山陽姫路ICまで(分)',
                '上下水道', '電力', 'ガス', '通信'
            ];

            const rows = data.map(item => [
                item.categoryName || getTypeLabel(item.type),
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

        // グローバル関数として定義（HTMLから呼び出される）
        window.toggleSelection = toggleSelection;
        window.showDetail = showDetail;
        window.showOnMap = showOnMap;
        window.exportSelected = exportSelected;
        window.clearSelection = clearSelection;
        window.setView = setView;
        window.closeModal = closeModal;

        // ページロード時の初期化
        document.addEventListener('DOMContentLoaded', init);

        // モーダル外クリックで閉じる
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('detailModal');
            if (event.target === modal) {
                closeModal();
            }
        });
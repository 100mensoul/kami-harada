# 福本正 篆刻作品集

## 概要
福本正氏の篆刻作品を展示するウェブギャラリーです。

## ファイル構成
```
/tenkoku/
├── index.html    # メインページ
├── images/       # 篆刻作品画像
└── README.md     # このファイル
```

## 機能
- 作品ギャラリー（グリッド表示）
- カテゴリー別フィルタ（雅号印、成語印、詩句印、絵入印など）
- 検索機能（作品名、印文での検索）
- モーダルでの詳細表示
- レスポンシブ対応

## 作品データ
作品データは`index.html`内の`sealData`配列に格納されています。
新しい作品を追加する場合は、以下の形式で追加してください：

```javascript
{
    id: 番号,
    title: "作品タイトル",
    category: "カテゴリー", // name, phrase, poetry, picture, other
    image: "./images/ファイル名.jpg",
    description: "作品の説明",
    inmon: "印文",
    size: "サイズ",
    material: "材質",
    year: "制作年",
    isNew: true/false
}
```

## 画像の追加
1. 作品画像を`images/`フォルダに配置
2. 推奨サイズ: 800x800px以上（正方形推奨）
3. ファイル形式: JPG, PNG

## 関連ページ
- [写仏画ギャラリー](../hotoke/index.html)
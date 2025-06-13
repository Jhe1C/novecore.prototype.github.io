# NovaCore Gaming Platform

## 🎮 關於 NovaCore

NovaCore 是一個現代化的遊戲平台，提供完整的遊戲發現、購買和社群體驗。採用 React + TypeScript + Tailwind CSS 構建，提供流暢的用戶體驗和響應式設計。

## ✨ 主要功能

- 🎯 **遊戲發現** - 瀏覽精選和熱門遊戲
- 🛒 **購物車系統** - 完整的購買流程
- ❤️ **願望清單** - 收藏喜愛的遊戲
- 🌟 **遊戲評價** - 查看和發表遊戲評論
- 🎨 **現代化 UI** - 基於 Tailwind CSS 的響應式設計
- 📱 **移動端優化** - 完美的移動設備體驗
- 🚀 **高性能** - Vite 構建工具，快速載入

## 🛠 技術棧

- **框架**: React 18 + TypeScript
- **構建工具**: Vite
- **樣式**: Tailwind CSS v4
- **UI 組件**: Radix UI
- **圖標**: Lucide React
- **動畫**: Framer Motion
- **通知**: Sonner
- **部署**: Vercel

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 開發服務器

```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看應用。

### 構建生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

### 類型檢查

```bash
npm run type-check
```

### 代碼檢查

```bash
npm run lint
```

## 📁 專案結構

```
novacore/
├── public/                 # 靜態資源
│   ├── favicon.svg
│   ├── site.webmanifest
│   └── sw.js              # Service Worker
├── components/            # React 組件
│   ├── ui/               # UI 基礎組件
│   ├── Header.tsx        # 頭部導航
│   ├── GameCard.tsx      # 遊戲卡片
│   └── ...
├── imports/              # SVG 和資源導入
├── styles/               # 樣式文件
│   └── globals.css       # 全局 CSS
├── App.tsx              # 主應用組件
├── main.tsx             # 應用入口點
└── index.html           # HTML 模板
```

## 🎨 設計系統

### 顏色系統

- **主色調**: Midnight Black (#0B0D17)
- **強調色**: Blue (#3B82F6), Purple (#8B5CF6)
- **功能色**: Green (#10B981), Orange (#F59E0B)
- **文字**: Primary (#FFFFFF), Secondary (#9CA3AF)

### 組件

使用 Radix UI 作為底層，確保無障礙訪問和一致的用戶體驗。

## 📱 響應式設計

- **手機**: < 640px
- **平板**: 640px - 1024px
- **桌面**: > 1024px

所有組件都針對不同屏幕尺寸進行了優化。

## 🔧 配置文件

- `vite.config.ts` - Vite 配置
- `tailwind.config.js` - Tailwind CSS 配置
- `tsconfig.json` - TypeScript 配置
- `vercel.json` - Vercel 部署配置

## 🚀 部署到 Vercel

1. 推送代碼到 GitHub 倉庫
2. 在 Vercel 中導入專案
3. Vercel 會自動檢測 Vite 專案並進行部署

### 環境變量

在 Vercel 中設置以下環境變量（如果需要）：

```bash
NODE_ENV=production
```

## 📊 性能優化

- **代碼分割**: 自動分割 vendor 和 UI 組件
- **圖片優化**: 使用 WebP 格式和適當尺寸
- **緩存策略**: Service Worker 提供離線支持
- **懶加載**: 組件和路由懶加載

## 🔒 安全性

- **CSP**: 內容安全政策
- **HTTPS**: 強制 HTTPS 連接
- **XSS 防護**: 內建 XSS 保護
- **點擊劫持防護**: X-Frame-Options 設置

## 🌐 PWA 功能

- **離線支持**: Service Worker 緩存
- **安裝提示**: 可安裝為桌面應用
- **推送通知**: 支持遊戲更新通知

## 🤝 貢獻指南

1. Fork 此倉庫
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📝 許可證

此專案採用 MIT 許可證 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 👥 團隊

- **設計**: NovaCore Design Team
- **開發**: NovaCore Development Team
- **產品**: NovaCore Product Team

## 📞 聯繫我們

- **官網**: [novacore-gaming.vercel.app](https://novacore-gaming.vercel.app)
- **支援**: support@novacore.dev
- **社群**: [Discord](https://discord.gg/novacore)

---

**NovaCore** - 終極遊戲體驗，從這裡開始 🚀
# Code Pattern Visualizer

Kod yapısını görsel olarak analiz eden modern bir web uygulaması. JavaScript ve TypeScript kodlarınızın AST (Abstract Syntax Tree) ağaç yapısını interaktif olarak görselleştirir.

## 🚀 Özellikler

- **Canlı Kod Editörü**: Monaco Editor (VSCode'un editör motoru) ile syntax highlighting
- **Çoklu Dil Desteği**: JavaScript, TypeScript (Python, Java, C++ için destek geliştirme aşamasında)
- **İnteraktif Ağaç Görselleştirmesi**: React Flow ile zoom, pan ve minimap özellikleri
- **Akıllı Renklendirme**: 
  - 🔵 Mavi: Fonksiyonlar
  - 🟢 Yeşil: Değişkenler
  - 🟠 Turuncu: Döngüler
  - 🟣 Mor: Class yapıları
  - 🔴 Kırmızı: Koşullu ifadeler
- **Modern UI**: Karanlık tema, developer-friendly tasarım

## 🛠️ Teknolojiler

### Frontend Framework
- **React 18** - UI component kütüphanesi
- **TypeScript** - Type-safe geliştirme
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Utility-first CSS framework

### Kod Analizi
- **Acorn** - JavaScript/TypeScript parser (browser-uyumlu)
- **Acorn Walk** - AST traversal

### UI Components
- **Monaco Editor** - VSCode editör motoru
- **React Flow** - Node-based UI framework
- **shadcn/ui** - Radix UI tabanlı component kütüphanesi
- **Lucide React** - İkon seti

### State Management
- **TanStack Query** - Server state yönetimi
- **React Router** - Client-side routing

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Yerel Geliştirme

```bash
# Repository'yi klonlayın
git clone https://github.com/Can-Ozan/30-days-of-typescript/tree/master/Day-12-Code-Pattern-Visualizer.git
cd Code-Pattern-Visualizer

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```


## 🏗️ Build

```bash
# Production build oluşturun
npm run build

# Build'i preview edin
npm run preview
```

## 📝 Kullanım

1. **Kod Editörüne Girin**: Sol panelde JavaScript/TypeScript kodunuzu yazın veya yapıştırın
2. **Dil Seçin**: Üst kısımdan analiz etmek istediğiniz dili seçin
3. **Analiz Et**: "Analiz Et" butonuna tıklayın
4. **Görselleştirin**: Sağ panelde ağaç yapısını inceleyin
   - Zoom: Mouse wheel veya kontroller
   - Pan: Sürükle-bırak
   - Minimap: Sağ alt köşede genel bakış

## 🎯 Proje Yapısı

```
src/
├── components/
│   ├── ui/              # shadcn/ui component'leri
│   ├── CodeEditor.tsx   # Monaco editör wrapper
│   ├── LanguageSelector.tsx
│   └── TreeVisualizer.tsx
├── utils/
│   └── codeParser.ts    # AST parsing logic
├── pages/
│   ├── Index.tsx        # Ana sayfa
│   └── NotFound.tsx     # 404 sayfası
├── index.css            # Design system (Tailwind)
└── App.tsx              # Root component
```

## 🔧 Geliştirme

### Yeni Dil Desteği Ekleme

1. `src/components/LanguageSelector.tsx` içine yeni dil ekleyin
2. `src/utils/codeParser.ts` içinde ilgili parser'ı entegre edin
3. Dil-spesifik parsing fonksiyonu oluşturun

### Stil Değişiklikleri

Tüm renkler ve stiller `src/index.css` ve `tailwind.config.ts` dosyalarında tanımlıdır. Semantic token sistemi kullanılır:

```css
--node-function: hsl(...);
--node-variable: hsl(...);
--node-loop: hsl(...);
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Mesajları

Conventional Commits formatı kullanın:
- `feat:` - Yeni özellik
- `fix:` - Bug düzeltme
- `docs:` - Dokümantasyon
- `style:` - Stil değişikliği
- `refactor:` - Kod yeniden yapılandırma
- `test:` - Test ekleme/düzeltme

## 📄 Lisans

MIT License - Detaylar için `LICENSE` dosyasına bakın.

## 🐛 Bilinen Sorunlar

- [ ] Python, Java, C++ parser desteği henüz implemente edilmedi
- [ ] Büyük dosyalar (>1000 satır) için performans optimizasyonu gerekebilir
- [ ] Dosya/klasör yükleme özelliği geliştirilme aşamasında

## 🗺️ Roadmap

- [ ] Dosya sistemi entegrasyonu (klasör analizi)
- [ ] Python, Java, C++ dil desteği
- [ ] AST görselini PNG/SVG olarak export
- [ ] Kod karmaşıklık metrikleri (cyclomatic complexity)
- [ ] Kod kalitesi analizi
- [ ] Tema özelleştirme paneli

## 📞 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

**Not**: Bu proje aktif geliştirme aşamasındadır. Yeni özellikler ve iyileştirmeler sürekli eklenmektedir.

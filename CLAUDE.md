# AtölyeKart — Atelier Ecem

Vibe coding kursunun haftalık ödev projesi (6 hafta). Kurstaki ana proje BizCard'ın yanında yürüyen ikinci örnek.

## Atölye

- **Adı:** Atelier Ecem
- **Tanıtım cümlesi:** "Elde işlenen pırlanta takılar."
- **Sektör:** El yapımı lüks pırlanta takı. Seri üretim yok; her parça atölyede elde yapılır.
- **Taşlar:** Büyük karatlı, parlak, kesimi iyi pırlantalar.
- **Stok mantığı:** Her tasarımdan az sayıda üretilir. Tükenen parça, atölyede yeniden işlenince koleksiyona döner (bu yüzden "Stoğa girince haber ver" var).
- **Konum:** İstanbul, randevu ile. E-posta: info@atelierecem.com (hayali).

## Hedef kitle

Zengin, lüks tüketen, kaliteden anlayan ve özgün tasarım isteyen müşteriler.

## Ürünler

| Ürün | Fiyat | Stok | Buton |
|---|---|---|---|
| Pırlanta Kolye | 20.000.000 TL | 2 | Sipariş ver |
| Pırlanta Yüzük | 5.000.000 TL | 3 | Sipariş ver |
| Pırlanta Bileklik | 13.000.000 TL | 0 (tükendi) | Stoğa girince haber ver |

- **Stok** (`stock`): elle girilir, `products.js`te. 0 ise kart "Tükendi" gösterir. Kartta adet görünmez.
- **Renkler** (`colors`): Altın, Beyaz Altın, Rose, her üründe. Stok renkler arasında ortak (renk müşterinin tercihi, parça o renkte işlenir). Fiyat renge göre değişmez. Kartta renk yuvarlakları var, ilk açılışta Altın seçili.

Ürün açıklamaları ve "Hakkımızda" metni şimdilik bilerek boş. Ecem sonra yazacak.

## Tasarım

- İlham: Beyaz zemin, ince ve zarif harfler, sade ve ferah.
- İmza rengi: koyu nar çiçeği **#C8102E**. Butonlar, "Tükendi" yazısı, başlık altındaki çizgi ve e-posta bağlantısında kullanılır.
- Yazı tipleri: başlıklar Bodoni Moda, metinler Jost.
- Görseller: React sürümünde ince çizgi çizimler (`react/public/gorseller/*.svg`), `products.js`teki `image` alanıyla bağlı. HTML sürümünde yok. İleride telifsiz fotoğraf (Unsplash/Pexels) ya da Ecem'in kendi fotoğrafları. Başka markaların fotoğrafları kullanılmaz.
- Sayfa bölümleri: Üst kısım → Koleksiyon → Hakkımızda → Randevu / İletişim.

## Sonraki adımlar için alınmış kararlar

- **1.6'ya not:** Sipariş penceresi kartta seçili rengi alır. Adet seçimi 1'den `stock`a kadar. Webhook'a ödev alanlarına ek olarak `color` gider.
- **2. hafta veri modeli (veritabanı gerekir, şimdilik sadece plan):**
  - Sipariş: ürün, adet, renk, müşteri bilgileri, durum (`rezerv` → `odendi` / `suresi_doldu` / `iptal`), rezerv bitiş saati (oluşturulma + 2 saat). Gerçek sipariş ancak ödeme gelince oluşur; stok o zaman düşer.
  - Ödeme kaydı: tutar, yöntem, ödeme şirketinin işlem numarası, tarih. Kart bilgisi bizde asla tutulmaz.
  - Satılabilir adet = stok − aktif rezervler. 0 ise kart "Tükendi" + "Stoğa girince haber ver".

- **Sipariş penceresi (React aşaması):** isim, telefon, e-posta, açıklama, adet. Gönderince ekranda onay + webhook.
- **Stok bildirimi penceresi:** isim, telefon, e-posta, açıklama.
- **Vazgeçme kaydı:** Pencere açılıp gönderilmeden kapatılırsa webhook'a "vazgeçti" kaydı gider (ürün, buton türü, saat). Müşterinin yarım yazdığı bilgiler kaydedilmez (KVKK).
- **Webhook veri sözleşmesi (ödevden):**
  - Sipariş: event, name, productId, productName, phone, email, quantity, source
  - Stok bildirimi: event, name, productId, productName, email, source
- **Rapor:** 1. haftada webhook.site üzerinden. Site içi rapor sayfası 2. haftada (backend).
- Fikir: Siparişler ileride Ecem'in e-postasına da gidebilir (2. hafta).

## Çalışma kuralları

- Sitenin dili Türkçe.
- **Ecem "başla" demeden hiçbir dosyayı oluşturma ya da değiştirme.** Önce kararları birlikte ver, özetle, onay bekle.
- Ürün verisini (ad, fiyat, durum) değiştirmeden önce sor.

## Klasör düzeni

- `index.html` — 1.1'deki düz HTML sürümü. Karşılaştırma için olduğu gibi duruyor, değiştirilmez.
- `react/` — React sürümü (Vite). Asıl proje artık bu.
  - `src/data/products.js` — ürün listesi (sadece veri)
  - `src/components/ProductCard.jsx` — tek ürün kartının kalıbı
  - `src/components/ProductImage.jsx` — kartın görsel alanı (fotoğraf yoksa boş gri alan)
  - `src/components/ProductList.jsx` — koleksiyon; listeyi kartlara döker
  - `src/App.jsx` — ana sayfa, parçaları birleştirir
  - `src/index.css` — bütün stiller

## Çalıştırma

`react` klasöründe terminalde `npm run dev`, sonra tarayıcıda http://localhost:5173

## Hafta 1 yol haritası

Ödev metni: `../Odev_AtolyeKart_Hafta1.pdf`

- [x] 1.1 HTML sayfası + CLAUDE.md
- [x] 1.2 React'e geçiş (ProductCard, ProductList, ProductImage) + revizyon döngüsü
- [x] 1.3 /plan ile veri modeli planlama: stok adedi + renkler eklendi, rezerv/ödeme modeli 2. haftaya planlandı. Etkilenen dosyalar: products.js, ProductCard.jsx, index.css, CLAUDE.md.
- [x] 1.4 Hata turu: bilerek yanlış prop adı → terminal çıktısıyla düzelt; bozuk CSS → ekran görüntüsüyle düzelt
- [ ] 1.5 AtölyeKart skill'i (bileşen standartları + webhook formatı), GitHub'da repo + ilk commit, katalogda QR kod (opsiyonel), sub-agent (opsiyonel)
- [ ] 1.6 Sipariş ve stok bildirimi pencereleri + webhook (webhook.site ile test), vazgeçme kayıtları
- [ ] Teslim: proje klasörü ya da GitHub linki ekran görüntüsü, çalışan React sayfası ekran görüntüsü (en sonda), webhook.site'ta iki ayrı kayıt, "Kısa düşünce" cevapları (Ecem kendi cümleleriyle)

## Durum

- 1.1: HTML sayfası hazır.
- 1.2: React'e geçiş yapıldı; sayfa HTML sürümüyle aynı görünüyor. Butonlar henüz çalışmıyor.
- 1.2 revizyon döngüsü yapıldı: fiyatlar kalın, kartlara ince çerçeve (sadece `index.css` değişti, `products.js` aynı kaldı).
- 1.3: `inStock` yerine `stock` (sayı) ve `colors` eklendi; kartta renk seçimi (React state ile).
- 1.4: Hata turu yapıldı (yanlış prop adı terminalle, bozuk CSS ekran görüntüsüyle düzeltildi). Sonrasında `npm run build` hatasız.
- 1.5: GitHub repo açıldı ve ilk commit yüklendi: https://github.com/ecemtg/AtolyeKart (public, dal: `main`).
- Sıradaki: 1.5'in kalanı (skill'leri kontrol et; QR kod ve sub-agent opsiyonel).

---
name: bilesen-standartlari
description: AtölyeKart (Atelier Ecem) React projesinde yeni bir bileşen yazarken ya da var olanı değiştirirken kullan. Dosya yeri, isimlendirme, stil ve görünüm kurallarını içerir.
---

# AtölyeKart bileşen standartları

## Dosya ve isim

- Her bileşen `react/src/components/` içinde, kendi dosyasında durur.
- Bileşen adı İngilizce ve her kelimenin ilk harfi büyük: `ProductCard`, `OrderForm`. Dosya adı aynı: `OrderForm.jsx`.
- Dosyanın en üstünde, ne işe yaradığını anlatan kısa bir Türkçe yorum olur. Örnek:
  ```jsx
  // ÜRÜN KARTI — tek bir ürünün kalıbı.
  ```

## Görev ayrımı

- Ürün bilgileri (ad, fiyat, stok, renk) sadece `react/src/data/products.js`te durur. Bileşenin içine yazılmaz.
- Bütün stiller `react/src/index.css`te durur. Bileşen dosyasında stil yazılmaz.
- CSS sınıf adları Türkçe: `urun`, `fiyat`, `buton`, `tukendi`.

## Görünüm

- Renkler sadece `index.css`teki hazır değişkenlerden alınır: `--zemin`, `--yazi`, `--soluk`, `--cizgi`, `--gorsel`, `--nar`. Yeni renk kodu uydurulmaz.
- Başlıklarda Bodoni Moda, metinlerde Jost yazı tipi kullanılır.
- Butonlar mevcut `buton` (dolu, nar rengi) ve `buton ikincil` (çerçeveli) stillerini kullanır.
- Sitedeki bütün yazılar Türkçe.

## Kontrol

- Bileşen değiştikten sonra `products.js`in bozulmadığını kontrol et.
- Telefon ekranında da düzgün görünmeli (`index.css`teki `@media (max-width: 800px)` bölümü).

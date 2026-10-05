---
name: webhook-formati
description: AtölyeKart (Atelier Ecem) projesinde sipariş, stok bildirimi ya da vazgeçme webhook'u yazarken veya değiştirirken kullan. Her paketin alanlarını ve ortak kuralları içerir.
---

# AtölyeKart webhook formatı

Alan adları İngilizce ve ödevdeki yazımın aynısı. Sıra aşağıdaki gibi.

## 1. Sipariş — `event: "order"`

Ödev alanları: `event`, `name`, `productId`, `productName`, `phone`, `email`, `quantity`, `source`
Ek alanlar: `color`, `note`

```json
{
  "event": "order",
  "name": "Ayşe Yılmaz",
  "productId": "pirlanta-kolye",
  "productName": "Pırlanta Kolye",
  "phone": "05xx xxx xx xx",
  "email": "ayse@ornek.com",
  "quantity": 1,
  "color": "Rose",
  "note": "",
  "source": "atolyekart-web"
}
```

## 2. Stok bildirimi — `event: "stock_notify"`

Ödev alanları: `event`, `name`, `productId`, `productName`, `email`, `source`
Ek alanlar: `phone`, `note`

## 3. Vazgeçme — `event: "abandoned"`

Pencere açılıp gönderilmeden kapatılınca gider.

Alanlar: `event`, `productId`, `productName`, `formType` (`"order"` ya da `"stock_notify"`), `time`, `source`

Bu pakette isim, telefon, e-posta, not gibi kişisel bilgiler asla bulunmaz (KVKK). Müşterinin yarım yazdığı bilgiler gönderilmez.

## Ortak kurallar

- `source` her pakette `"atolyekart-web"`.
- Webhook adresi kodun içine dağıtılmaz, tek bir yerde durur.
- Gönderim başarısız olursa müşteriye sade, Türkçe bir hata mesajı gösterilir.
- 1. haftada test webhook.site ile yapılır. Gizli adres koruması ve backend 2. haftada.

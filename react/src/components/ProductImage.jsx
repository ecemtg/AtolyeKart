// ÜRÜN GÖRSELİ — kartın içindeki görsel alanı.
// Fotoğraf yoksa boş gri bir alan gösterir.

function ProductImage({ src, alt }) {
  if (!src) {
    return <div className="urun-gorsel" />
  }

  return <img className="urun-gorsel" src={src} alt={alt} />
}

export default ProductImage

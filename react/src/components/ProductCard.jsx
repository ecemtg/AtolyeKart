// ÜRÜN KARTI — tek bir ürünün kalıbı.
// Hangi ürün verilirse onu bu kalıba döker.

import { useState } from 'react'
import ProductImage from './ProductImage.jsx'

function formatPrice(price) {
  return price.toLocaleString('tr-TR') + ' TL'
}

function ProductCard({ product }) {
  // Kartın hafızası: hangi renk seçili? İlk açılışta listedeki ilk renk.
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  return (
    <article className="urun">
      <ProductImage src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="fiyat">{formatPrice(product.price)}</p>

      <div className="renkler">
        {product.colors.map((color) => (
          <button
            key={color}
            type="button"
            className={'renk' + (color === selectedColor ? ' secili' : '')}
            data-renk={color}
            title={color}
            aria-label={color}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <p className="renk-adi">{selectedColor}</p>

      <p className="aciklama">{product.description}</p>

      {product.stock > 0 ? (
        <button className="buton" type="button">Sipariş ver</button>
      ) : (
        <>
          <p className="tukendi">Tükendi</p>
          <button className="buton ikincil" type="button">Stoğa girince haber ver</button>
        </>
      )}
    </article>
  )
}

export default ProductCard

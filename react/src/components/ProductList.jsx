// KOLEKSİYON — ürün listesini alır, her ürünü ProductCard kalıbına döker.

import ProductCard from './ProductCard.jsx'

function ProductList({ products }) {
  return (
    <section className="koleksiyon">
      <h2>Koleksiyon</h2>

      <div className="vitrin">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductList

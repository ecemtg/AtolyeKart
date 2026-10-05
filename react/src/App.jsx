// ANA SAYFA — bütün parçaları bir araya getirir.

import ProductList from './components/ProductList.jsx'
import { products } from './data/products.js'

function App() {
  return (
    <>
      <header className="ust">
        <h1>Atelier Ecem</h1>
        <div className="nar-cizgi" />
        <p>Elde işlenen pırlanta takılar.</p>
      </header>

      <main>
        <ProductList products={products} />

        <section className="hakkimizda">
          <h2>Hakkımızda</h2>
          <p>{/* metin sonra eklenecek */}</p>
        </section>

        <section className="iletisim">
          <h2>Randevu / İletişim</h2>
          <p>İstanbul</p>
          <p>Randevu ile</p>
          <p><a href="mailto:info@atelierecem.com">info@atelierecem.com</a></p>
        </section>
      </main>

      <footer>Atelier Ecem</footer>
    </>
  )
}

export default App

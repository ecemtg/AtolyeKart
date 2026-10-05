// STOK BİLDİRİMİ PENCERESİ — "Stoğa girince haber ver" butonuna basınca açılır.
// Gönderilirse stok bildirimi webhook'u gider; gönderilmeden kapatılırsa vazgeçme kaydı gider.

import { useState } from 'react'
import Modal from './Modal.jsx'
import { sendWebhook, sendAbandoned } from '../webhook.js'

function StockNotifyForm({ product, onClose }) {
  // Pencerenin durumu: 'form' → 'gonderiliyor' → 'gonderildi' (ya da 'hata')
  const [status, setStatus] = useState('form')
  const [customerName, setCustomerName] = useState('')

  function handleClose() {
    if (status === 'form' || status === 'hata') sendAbandoned(product, 'stock_notify')
    onClose()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const name = data.get('name').trim()
    setStatus('gonderiliyor')

    try {
      await sendWebhook({
        event: 'stock_notify',
        name,
        productId: product.id,
        productName: product.name,
        email: data.get('email').trim(),
        phone: data.get('phone').trim(),
        note: data.get('note').trim(),
      })
      setCustomerName(name)
      setStatus('gonderildi')
    } catch (error) {
      console.error(error)
      setStatus('hata')
    }
  }

  return (
    <Modal title={product.name} subtitle="Stoğa girince haber ver" onClose={handleClose}>
      {status === 'gonderildi' ? (
        <div className="onay">
          <p>Teşekkürler, {customerName}.</p>
          <p>{product.name} atölyede yeniden işlendiğinde size e-posta ile haber vereceğiz.</p>
          <button className="buton ikincil" type="button" onClick={handleClose}>Kapat</button>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label className="alan">
            Ad soyad
            <input name="name" required autoComplete="name" />
          </label>
          <label className="alan">
            E-posta
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label className="alan">
            <span>Telefon <span className="istege-bagli">(isteğe bağlı)</span></span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label className="alan">
            <span>Açıklama <span className="istege-bagli">(isteğe bağlı)</span></span>
            <textarea name="note" rows="3" />
          </label>

          {status === 'hata' && (
            <p className="hata">
              Gönderilemedi. Lütfen tekrar deneyin ya da info@atelierecem.com adresine yazın.
            </p>
          )}

          <button className="buton" type="submit" disabled={status === 'gonderiliyor'}>
            {status === 'gonderiliyor' ? 'Gönderiliyor…' : 'Haber ver'}
          </button>
        </form>
      )}
    </Modal>
  )
}

export default StockNotifyForm

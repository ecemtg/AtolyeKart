// SİPARİŞ PENCERESİ — "Sipariş ver" butonuna basınca açılır.
// Gönderilirse sipariş webhook'u gider; gönderilmeden kapatılırsa vazgeçme kaydı gider.

import { useState } from 'react'
import Modal from './Modal.jsx'
import { sendWebhook, sendAbandoned } from '../webhook.js'

function OrderForm({ product, color, onClose }) {
  // Pencerenin durumu: 'form' → 'gonderiliyor' → 'gonderildi' (ya da 'hata')
  const [status, setStatus] = useState('form')
  const [customerName, setCustomerName] = useState('')

  // Adet seçenekleri: 1'den stoğa kadar
  const quantities = Array.from({ length: product.stock }, (_, i) => i + 1)

  function handleClose() {
    if (status === 'form' || status === 'hata') sendAbandoned(product, 'order')
    onClose()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const name = data.get('name').trim()
    setStatus('gonderiliyor')

    try {
      await sendWebhook({
        event: 'order',
        name,
        productId: product.id,
        productName: product.name,
        phone: data.get('phone').trim(),
        email: data.get('email').trim(),
        quantity: Number(data.get('quantity')),
        color,
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
    <Modal title={product.name} subtitle={color} onClose={handleClose}>
      {status === 'gonderildi' ? (
        <div className="onay">
          <p>Teşekkürler, {customerName}.</p>
          <p>Talebiniz atölyemize ulaştı, en kısa sürede sizinle iletişime geçeceğiz.</p>
          <button className="buton ikincil" type="button" onClick={handleClose}>Kapat</button>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label className="alan">
            Ad soyad
            <input name="name" required autoComplete="name" />
          </label>
          <label className="alan">
            Telefon
            <input name="phone" type="tel" required autoComplete="tel" />
          </label>
          <label className="alan">
            E-posta
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label className="alan">
            Adet
            <select name="quantity" defaultValue="1">
              {quantities.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
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
            {status === 'gonderiliyor' ? 'Gönderiliyor…' : 'Siparişi gönder'}
          </button>
        </form>
      )}
    </Modal>
  )
}

export default OrderForm

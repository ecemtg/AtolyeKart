// PENCERE — sipariş ve stok bildirimi pencerelerinin ortak çerçevesi.
// × butonu, Esc tuşu ya da karartılmış alana tıklamak pencereyi kapatır.

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function Modal({ title, subtitle, onClose, children }) {
  const dialogRef = useRef(null)

  // Pencere ekrana gelince açılır, kaldırılınca kapanır.
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  // Esc tuşu: tarayıcı kendi kapatmasın, kapatmayı biz yapalım.
  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  // Pencerenin dışındaki karartılmış alana tıklandıysa kapat.
  function handleClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  // Pencere kartın içinde değil, sayfanın en dışında çizilir (kartın stilleri bulaşmasın).
  return createPortal(
    <dialog ref={dialogRef} className="pencere" onCancel={handleCancel} onClick={handleClick}>
      <div className="pencere-ic">
        <button type="button" className="pencere-kapat" aria-label="Kapat" onClick={onClose}>
          ×
        </button>
        <h3>{title}</h3>
        {subtitle && <p className="pencere-alt-baslik">{subtitle}</p>}
        {children}
      </div>
    </dialog>,
    document.body,
  )
}

export default Modal

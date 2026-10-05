// WEBHOOK — sitedeki bütün webhook gönderimleri buradan geçer.
// Adres kodda yazmaz; react/.env.local dosyasındaki VITE_WEBHOOK_URL'den gelir.
// Paket alanları için: .claude/skills/webhook-formati/SKILL.md

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL
const SOURCE = 'atolyekart-web'

// Paketi gönderir. source her zaman en sona eklenir.
export async function sendWebhook(payload) {
  if (!WEBHOOK_URL) {
    throw new Error('Webhook adresi yok: react/.env.local dosyasına VITE_WEBHOOK_URL yaz.')
  }

  // no-cors: tarayıcı webhook.site'ın cevabını okuyamaz ama paket yine de ulaşır.
  // Cevabı okumak 2. haftada kendi backend'imizle mümkün olacak.
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify({ ...payload, source: SOURCE }),
  })
}

// Pencere gönderilmeden kapatılınca: sadece ürün, pencere türü ve saat gider.
// Müşterinin yazdığı hiçbir bilgi bu pakete girmez (KVKK).
export function sendAbandoned(product, formType) {
  sendWebhook({
    event: 'abandoned',
    productId: product.id,
    productName: product.name,
    formType,
    time: new Date().toISOString(),
  }).catch((error) => console.error(error)) // müşteriye bir şey gösterilmez
}

// ÜRÜN LİSTESİ — sadece veri burada durur, görünüşle ilgili hiçbir şey yok.
// Yeni ürün eklemek için listeye bir obje daha eklemen yeterli.
// stock: atölyede kaç tane var (elle girilir). 0 ise kart "Tükendi" gösterir.
// colors: müşterinin seçebileceği renkler. Stok renkler arasında ortak.

export const products = [
  {
    id: 'pirlanta-kolye',
    name: 'Pırlanta Kolye',
    price: 20000000,
    image: '/gorseller/kolye.svg',
    description: '', // sonra eklenecek
    stock: 2,
    colors: ['Altın', 'Beyaz Altın', 'Rose'],
  },
  {
    id: 'pirlanta-yuzuk',
    name: 'Pırlanta Yüzük',
    price: 5000000,
    image: '/gorseller/yuzuk.svg',
    description: '',
    stock: 3,
    colors: ['Altın', 'Beyaz Altın', 'Rose'],
  },
  {
    id: 'pirlanta-bileklik',
    name: 'Pırlanta Bileklik',
    price: 13000000,
    image: '/gorseller/bileklik.svg',
    description: '',
    stock: 0, // tükendi
    colors: ['Altın', 'Beyaz Altın', 'Rose'],
  },
]

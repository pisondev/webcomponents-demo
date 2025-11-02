class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._count = 0;
    this._basePrice = 0;
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Nama Produk';
    this._basePrice = parseInt(this.getAttribute('base-price')) || 0;
    this._count = parseInt(this.getAttribute('initial-value')) || 1;

    this.render();

    this.displayElement = this.shadowRoot.querySelector('#display');
    const controlsElement = this.shadowRoot.querySelector('#controls');
    this.totalPriceElement = this.shadowRoot.querySelector('#total-price');

    this.displayElement.count = this._count;
    this.updateTotalPrice();

    controlsElement.addEventListener('count-change', e => {
      let newCount = this.displayElement.count + e.detail.delta;
      if (newCount < 1) newCount = 1;
      this.displayElement.count = newCount;
      this.updateTotalPrice();
    });
  }

  updateTotalPrice() {
    const newTotal = this.displayElement.count * this._basePrice;
    this.totalPriceElement.textContent = newTotal.toLocaleString('id-ID');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          font-family: sans-serif;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          width: 300px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h3 {
          margin: 0 0 10px 0;
        }
        .price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #FF5722;
          margin-bottom: 15px;
        }
        .controls-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .total-section {
          border-top: 1px solid #eee;
          padding-top: 15px;
          display: flex;
          justify-content: space-between;
          font-size: 1.1rem;
          font-weight: bold;
        }
      </style>

      <div class="card">
        <h3>${this.getAttribute('title')}</h3>
        <div class="price">Rp ${this._basePrice.toLocaleString('id-ID')}</div>
        
        <div class="controls-wrapper">
          <span>Jumlah:</span>
          <div>
            <counter-display id="display" title="" value="1"></counter-display>
            <counter-controls id="controls"></counter-controls>
          </div>
        </div>

        <div class="total-section">
          <span>Total Harga:</span>
          <span>Rp <span id="total-price">0</span></span>
        </div>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);

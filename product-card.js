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
    this._count = parseInt(this.getAttribute('initial-value')) || 0;

    this.render();

    this.displayElement = this.shadowRoot.querySelector('#display');
    const controlsElement = this.shadowRoot.querySelector('#controls');
    this.totalPriceElement = this.shadowRoot.querySelector('#total-price');

    this.displayElement.count = this._count;
    this.updateTotalPrice();

    controlsElement.addEventListener('count-change', e => {
      let newCount = this.displayElement.count + e.detail.delta;
      if (newCount < 0) newCount = 0;
      this.displayElement.count = newCount;
      this.updateTotalPrice();

      this.dispatchEvent(new CustomEvent('product-change', {
        bubbles: true,
        composed: true
      }));

    });
  }

  updateTotalPrice() {
    const newTotal = this.displayElement.count * this._basePrice;
    this.totalPriceElement.textContent = newTotal.toLocaleString('id-ID');

    return newTotal;
  }

  get currentStatus(){
    const currentCount = this.displayElement ? this.displayElement.count : this._count;

    return {
        title: this.getAttribute('title'),
        quantity: currentCount,
        total: currentCount * this._basePrice
    };
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
        .count-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
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
          <div class="count-group">
            <counter-display id="display" title="Your Orders" value="${this._count}"></counter-display>
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

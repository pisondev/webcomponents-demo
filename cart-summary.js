class CartSummary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderSkeleton();
        this.summaryList = this.shadowRoot.getElementById('summary-list');
        this.summaryTotal = this.shadowRoot.getElementById('summary-total');
        document.addEventListener('product-change', () => this.renderSummary());
        this.renderSummary();
    }

    renderSkeleton() {
        this.shadowRoot.innerHTML = `
            <style>
                .cart-summary {
                    font-family: sans-serif;
                    margin-top: 30px;
                    padding: 20px;
                    border: 1px solid #ddd;
                    width: 100%;
                    box-sizing: border-box;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    border-radius: 8px;
                }
                .cart-summary h3 {
                    margin-top: 0;
                }
                .cart-summary ul {
                    list-style: none;
                    padding-left: 0;
                    margin: 0 0 15px 0;
                }
                .cart-summary li {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1rem;
                    margin-bottom: 8px;
                }
                .cart-summary .grand-total {
                    font-weight: bold;
                    font-size: 1.3rem;
                    display: flex;
                    justify-content: space-between;
                    border-top: 1px solid #ccc;
                    padding-top: 10px;
                }
                .empty-cart {
                    color: #777;
                    font-style: italic;
                }
            </style>
            
            <div class="cart-summary">
                <h3>Order Summary</h3>
                <ul id="summary-list">
                    <li class="empty-cart">Cart still empty.</li>
                </ul>
                <div class.grand-total">
                    <span>Total:</span>
                    <span id="summary-total">Rp 0</span>
                </div>
            </div>
        `;
    }

    renderSummary() {
        this.summaryList.innerHTML = '';
        let grandTotal = 0;
        const allCards = document.querySelectorAll('product-card');

        allCards.forEach(card => {
            const status = card.currentStatus; 
            if (status.quantity > 0) {
                grandTotal += status.total;            
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${status.title} (x${status.quantity})</span>
                    <span>Rp ${status.total.toLocaleString('id-ID')}</span>
                `;
                this.summaryList.appendChild(li);
            }
        });

        if (grandTotal === 0) {
             this.summaryList.innerHTML = '<li class="empty-cart">cart still empty.</li>';
        }
        this.summaryTotal.textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
    }
}

customElements.define('cart-summary', CartSummary);
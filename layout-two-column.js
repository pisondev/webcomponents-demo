class LayoutTwoColumn extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .main-layout {
                    display: flex;
                    flex-direction: column;
                }
                .top-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: flex-start;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 20px 30px;
                }
                .left-side {
                    flex: 1;
                    border-right: 1px solid #eee;
                    min-height: 300px;
                    padding-right: 30px;
                }
                .right-side {
                    flex: 1;
                    padding-left: 30px;
                }
                .bottom-section {
                    width: 100%;
                    padding: 20px 30px;
                    border-top: 1px solid #eee;
                    box-sizing: border-box;
                }
                @media (max-width: 768px) {
                    .top-section {
                        flex-direction: column;
                    }
                    .left-side {
                        border-right: none;
                        border-bottom: 1px solid #eee;
                        padding-right: 0;
                        padding-bottom: 20px;
                        width: 100%;
                    }
                    .right-side {
                        padding-left: 0;
                        padding-top: 20px;
                        width: 100%;
                    }
                }
            </style>
            
            <div class="main-layout">
                <section class="top-section">
                    <div class="left-side">
                        <slot name="left"></slot> 
                    </div>

                    <div class="right-side">
                        <slot name="right"></slot>
                    </div>
                </section>

                <section class="bottom-section">
                    <slot name="bottom"></slot>
                </section>
            </div>
        `;
    }
}

customElements.define('layout-two-column', LayoutTwoColumn);
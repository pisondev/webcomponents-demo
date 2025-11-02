class PageHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .header-wrapper {
          font-family: sans-serif;
          background-color: #6f2626ff;
          color: white;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
        }
        h1 {
          margin: 0;
          font-size: 1.6rem;
        } 
        p {
          margin: 4px 0 0 0;
          font-size: 1rem;
          font-style: italic;
          color: #ffffffff;
        }
      </style>
      <div class="header-wrapper">
        <h1>Pengembangan UIUX Frontend (Kelas: KOM)</h1>
        <p>I Gede Mujiyatna, S.Kom.,M.Kom</p>
      </div>
    `;
  }
}

customElements.define('page-header', PageHeader);
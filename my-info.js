class MyInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
  
        const name = this.getAttribute('name') || 'empty name';
        const nim = this.getAttribute('nim') || 'empty nim';
        const githubLink = this.getAttribute('github-link') || 'empty link';

        const githubHTML = githubLink === 'empty link'
            ? 'empty link'
            : `<a href="${githubLink}" target="_blank" rel="noopener noreferrer">${githubLink}</a>`;

        this.shadowRoot.innerHTML = `
            <style>
                .info-wrapper {
                    border-radius: 8px;
                    padding: 16px;
                    margin: 10px 0;
                    background-color: #c75252ff;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .info-line {
                    background-color: #a74242;
                    border-radius: 6px;
                    padding: 12px;
                }
                h3 {
                    margin: 0 0 5px 0;
                    color: #ffffffff;
                }
                a {
                    color: #ffffffff;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            
            <div class="info-wrapper">
                
                <div class="info-line">
                    <h3>Nama: ${name}</h3>
                </div>
                
                <div class="info-line">
                    <h3>NIM: ${nim}</h3>
                </div>

                <div class="info-line">
                    <h3>Github: ${githubHTML}</h3>
                </div>

            </div>
        `;
    }
}

customElements.define('my-info', MyInfo);
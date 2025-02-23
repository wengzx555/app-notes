class FooterBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <p>&copy; ${new Date().getFullYear()} Aplikasi Catatan - Dibuat oleh Ahmad Fauzan</p>
            </footer>
        `;
    }
}
customElements.define('footer-bar', FooterBar);
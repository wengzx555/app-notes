class AppBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h1>Aplikasi Catatan</h1>`;
    }
}
customElements.define('app-bar', AppBar);
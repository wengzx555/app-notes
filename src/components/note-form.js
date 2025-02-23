class NoteForm extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <form id="note-form">
                <input type="text" id="title" placeholder="Judul Catatan" required>
                <textarea id="body" placeholder="Isi Catatan" required></textarea>
                <button type="submit" class="add-btn">Tambah Catatan <i class="ri-save-2-line"></i></button>
            </form>
        `;

        this.querySelector('form').addEventListener('submit', this.addNote.bind(this));
    }

    addNote(event) {
        event.preventDefault();
        const title = this.querySelector('#title').value;
        const body = this.querySelector('#body').value;

        if (!title || !body) {
            alert("Judul dan isi catatan tidak boleh kosong!");
            return;
        }

        const newNote = {
            id: `notes-${Date.now()}`,
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false
        };

        document.dispatchEvent(new CustomEvent('note-added', { detail: newNote }));
        this.querySelector('form').reset();
    }
}

customElements.define('note-form', NoteForm);

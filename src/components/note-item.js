import { deleteNote, getNotes } from '../data/api.js';

class NoteItem extends HTMLElement {
    set note(note) {
        this._note = note;
        this.render();
    }

    render() {
        if (!this._note) return;

        this.innerHTML = `
            <div class="note-content">
                <h3>${this._note.title}</h3>
                <p>${this._note.body}</p>
                <small>${new Date(this._note.createdAt).toLocaleDateString()}</small>
                <button class="edit-btn"><i class="ri-pencil-fill"></i> Edit</button>
                <button class="delete-btn"><i class="ri-delete-bin-fill"></i> Delete</button>
            </div>
        `;

        // Event listeners for edit and delete actions
        this.querySelector('.edit-btn').addEventListener('click', () => {
            this.editNote();
        });

        this.querySelector('.delete-btn').addEventListener('click', () => {
            this.deleteNote();
        });
    }

    async editNote() {
        const newTitle = prompt("Edit Judul:", this._note.title);
        const newBody = prompt("Edit Isi Catatan:", this._note.body);

        if (newTitle && newBody) {
            // Update note locally
            this._note.title = newTitle;
            this._note.body = newBody;

            // Send the updated note to API for update
            await this.updateNote();

            // Refresh the notes list after update
            document.dispatchEvent(new CustomEvent('notes-updated'));
        }
    }

    async updateNote() {
        try {
            await fetch(`https://notes-api.dicoding.dev/v2/notes/${this._note.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: this._note.title,
                    body: this._note.body,
                }),
            });
        } catch (error) {
            console.error("Error updating note:", error);
        }
    }

    async deleteNote() {
        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus catatan ini?");
        if (confirmDelete) {
            try {
                // Call deleteNote function from API
                await deleteNote(this._note.id);

                // Refresh the notes list after deletion
                document.dispatchEvent(new CustomEvent('notes-updated'));
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    }
}

customElements.define('note-item', NoteItem);
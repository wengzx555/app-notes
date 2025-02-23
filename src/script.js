import './style.css';
import './components/app-bar.js';
import './components/note-form.js';
import './components/note-item.js';
import './components/footer-bar.js';
import { fetchNotes, createNote, deleteNote } from './data/api.js';

function renderNotes(notes) {
  const container = document.getElementById('notes-container');
  container.innerHTML = '';
  notes.forEach(note => {
    const noteElement = document.createElement('note-item');
    noteElement.note = note;
    container.appendChild(noteElement);
  });
}

// Fetch notes from API
async function loadNotes() {
  const notes = await fetchNotes();
  renderNotes(notes);
}

document.addEventListener('note-added', async (event) => {
  await createNote(event.detail);
  loadNotes();
});

document.addEventListener('notes-updated', () => {
  loadNotes();
});

loadNotes();
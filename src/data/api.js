const API_URL = 'https://notes-api.dicoding.dev/v2/';

export async function fetchNotes() {
  const response = await fetch(`${API_URL}notes`);
  const data = await response.json();
  return data.notes;
}

export async function createNote(note) {
  const response = await fetch(`${API_URL}notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId) {
  const response = await fetch(`${API_URL}notes/${noteId}`, {
    method: 'DELETE',
  });
  return response.json();
}
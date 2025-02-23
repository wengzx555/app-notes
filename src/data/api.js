const API_URL = 'https://notes-api.dicoding.dev/v2/';

export async function fetchNotes() {
  const response = await fetch(`${API_URL}notes`);
  const data = await response.json();
  return data.data;
}

export async function createNote(note) {
  try {
    const response = await fetch(`${API_URL}notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });

    const result = await response.json();
    console.log("Note berhasil dibuat:", result);
    return result;
  } catch (error) {
    console.error("Error creating note:", error);
  }
}

export async function updateNote(note) {
  try {
    await fetch(`${API_URL}notes/${note.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: note.title, body: note.body }),
    });
  } catch (error) {
    console.error("Error updating note:", error);
  }
}

export async function deleteNote(noteId) {
  const response = await fetch(`${API_URL}notes/${noteId}`, {
    method: 'DELETE',
  });
  return response.json();
}
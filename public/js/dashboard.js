const modal = document.getElementById('eventModal');
const deleteModal = document.getElementById('deleteModal');
const eventForm = document.getElementById('eventForm');
const modalTitle = document.getElementById('modalTitle');
const modalSubmit = document.getElementById('modalSubmit');

const btnAddEvent = document.getElementById('btnAddEvent');
const btnAddEventEmpty = document.getElementById('btnAddEventEmpty');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const deleteClose = document.getElementById('deleteClose');
const deleteCancel = document.getElementById('deleteCancel');
const deleteConfirm = document.getElementById('deleteConfirm');

let editingId = null;
let deletingId = null;

function openModal(isEdit) {
  modal.classList.add('active');
  if (!isEdit) {
    modalTitle.textContent = 'Add Event';
    modalSubmit.textContent = 'Create Event';
    eventForm.reset();
    editingId = null;
  }
}

function closeModal() {
  modal.classList.remove('active');
  editingId = null;
}

function openDeleteModal(id) {
  deletingId = id;
  deleteModal.classList.add('active');
}

function closeDeleteModal() {
  deleteModal.classList.remove('active');
  deletingId = null;
}

// Add event buttons
if (btnAddEvent) btnAddEvent.addEventListener('click', () => openModal(false));
if (btnAddEventEmpty) btnAddEventEmpty.addEventListener('click', () => openModal(false));

// Close modal
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalCancel) modalCancel.addEventListener('click', closeModal);

// Close delete modal
if (deleteClose) deleteClose.addEventListener('click', closeDeleteModal);
if (deleteCancel) modalCancel && deleteCancel.addEventListener('click', closeDeleteModal);

// Close on overlay click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

deleteModal.addEventListener('click', (e) => {
  if (e.target === deleteModal) closeDeleteModal();
});

// Edit buttons
document.querySelectorAll('.btn-edit').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    try {
      const res = await fetch(`/api/events/${id}`);
      const event = await res.json();

      document.getElementById('eventId').value = event.id;
      document.getElementById('eventTitle').value = event.title;
      document.getElementById('eventCategory').value = event.category;
      document.getElementById('eventLocation').value = event.location;
      document.getElementById('eventDate').value = event.event_date.slice(0, 16);
      document.getElementById('eventCapacity').value = event.capacity;
      document.getElementById('eventStatus').value = event.status;
      document.getElementById('eventDescription').value = event.description || '';

      modalTitle.textContent = 'Edit Event';
      modalSubmit.textContent = 'Save Changes';
      editingId = id;
      openModal(true);
    } catch (err) {
      console.error('Failed to load event:', err);
    }
  });
});

// Delete buttons
document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', () => {
    openDeleteModal(btn.dataset.id);
  });
});

// Confirm delete
if (deleteConfirm) {
  deleteConfirm.addEventListener('click', async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/events/${deletingId}`, { method: 'DELETE' });
      if (res.ok) {
        window.location.href = '/dashboard/events?success=deleted';
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  });
}

// Form submit
eventForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    title: document.getElementById('eventTitle').value.trim(),
    category: document.getElementById('eventCategory').value.trim(),
    location: document.getElementById('eventLocation').value.trim(),
    event_date: document.getElementById('eventDate').value,
    capacity: parseInt(document.getElementById('eventCapacity').value),
    status: document.getElementById('eventStatus').value,
    description: document.getElementById('eventDescription').value.trim(),
  };

  if (!data.title || !data.category || !data.location || !data.event_date || !data.capacity) {
    return;
  }

  try {
    const url = editingId ? `/api/events/${editingId}` : '/api/events';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const action = editingId ? 'updated' : 'created';
      window.location.href = `/dashboard/events?success=${action}`;
    } else {
      const err = await res.json();
      alert(err.error || 'Operation failed');
    }
  } catch (err) {
    console.error('Form submit error:', err);
    alert('Something went wrong');
  }
});

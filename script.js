const state = {
  title: 'Prank Call Quagmire',
  description: 'Pretend to be a representative from "Giggity-Con" offering him a lifetime supply of Hawaiian shirts and free massages from rehab teens.',
  priority: 'High',
  status: 'In Progress',
  dueDate: '2026-04-16T18:00:00Z',
  isExpanded: false,
  isEditing: false,
};

const todoCard = document.querySelector('.todo-card');
const checkbox = document.getElementById('todo-complete');
const todoTitle = document.querySelector('.todo-title');
const todoDescription = document.querySelector('.todo-description');
const todoStatus = document.querySelector('.todo-status');
const todoPriority = document.querySelector('.todo-priority');
const todoDueDate = document.querySelector('.todo-due-date');
const timeRemaining = document.querySelector('.todo-time-remaining');
const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
const priorityIndicator = document.querySelector('.todo-priority-indicator');
const statusControl = document.querySelector('.todo-status-control');
const expandToggle = document.querySelector('.todo-expand-toggle');
const collapsibleSection = document.querySelector('.todo-collapsible-section');
const cardView = document.querySelector('.card-view');
const editForm = document.querySelector('.todo-edit-form');
const editTitleInput = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const editDescInput = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const editPrioritySelect = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const editDueDateInput = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');
const editBtn = document.querySelector('.todo-edit-btn');
const deleteBtn = document.querySelector('.todo-delete-btn');

function render() {
  todoTitle.textContent = state.title;

  todoDescription.textContent = state.description;

  todoPriority.textContent = state.priority;
  todoPriority.setAttribute('aria-label', `Priority: ${state.priority}`);
  todoPriority.className = 'todo-priority';
  if (state.priority === 'Medium') todoPriority.classList.add('medium');
  if (state.priority === 'Low') todoPriority.classList.add('low');

  priorityIndicator.className = 'todo-priority-indicator';
  if (state.priority === 'Medium') priorityIndicator.classList.add('medium');
  if (state.priority === 'Low') priorityIndicator.classList.add('low');

  todoStatus.textContent = state.status;
  todoStatus.setAttribute('aria-label', `Status: ${state.status}`);
  todoStatus.className = 'todo-status';
  if (state.status === 'Done') todoStatus.classList.add('done');
  if (state.status === 'Pending') todoStatus.classList.add('pending');

  statusControl.value = state.status;
  statusControl.className = 'todo-status-control';
  if (state.status === 'Done') statusControl.classList.add('done');
  if (state.status === 'Pending') statusControl.classList.add('pending');

  checkbox.checked = state.status === 'Done';

  if (state.status === 'Done') {
    todoCard.classList.add('is-complete');
  } else {
    todoCard.classList.remove('is-complete');
  }

  todoDueDate.setAttribute('datetime', state.dueDate);

  updateTimeRemaining();

  if (state.isExpanded) {
    collapsibleSection.classList.remove('collapsed');
    collapsibleSection.classList.add('expanded');
    expandToggle.textContent = 'Show less';
    expandToggle.setAttribute('aria-expanded', 'true');
  } else {
    collapsibleSection.classList.remove('expanded');
    collapsibleSection.classList.add('collapsed');
    expandToggle.textContent = 'Show more';
    expandToggle.setAttribute('aria-expanded', 'false');
  }

  expandToggle.style.display = state.description.length > 100 ? 'block' : 'none';

  if (state.isEditing) {
    cardView.hidden = true;
    editForm.hidden = false;
    editTitleInput.value = state.title;
    editDescInput.value = state.description;
    editPrioritySelect.value = state.priority;
    const d = new Date(state.dueDate);
    editDueDateInput.value = d.toISOString().split('T')[0];
    editTitleInput.focus();
  } else {
    cardView.hidden = false;
    editForm.hidden = true;
  }
}

let timerInterval = null;

function getTimeRemaining() {
  const now = new Date();
  const due = new Date(state.dueDate);
  const diff = due - now;

  const absMinutes = Math.floor(Math.abs(diff) / (1000 * 60));
  const absHours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
  const absDays = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));

  if (diff <= 0) {
    if (absMinutes < 60) return { text: `Overdue by ${absMinutes} minute${absMinutes !== 1 ? 's' : ''}`, overdue: true };
    if (absHours < 24) return { text: `Overdue by ${absHours} hour${absHours !== 1 ? 's' : ''}`, overdue: true };
    return { text: `Overdue by ${absDays} day${absDays !== 1 ? 's' : ''}`, overdue: true };
  }

  if (absMinutes < 60) return { text: `Due in ${absMinutes} minute${absMinutes !== 1 ? 's' : ''}`, overdue: false };
  if (absHours < 24) return { text: `Due in ${absHours} hour${absHours !== 1 ? 's' : ''}`, overdue: false };
  if (absDays === 1) return { text: 'Due tomorrow', overdue: false };
  return { text: `Due in ${absDays} days`, overdue: false };
}

function updateTimeRemaining() {
  if (state.status === 'Done') {
    timeRemaining.textContent = 'Completed';
    timeRemaining.classList.remove('overdue');
    overdueIndicator.hidden = true;
    clearInterval(timerInterval);
    return;
  }

  const { text, overdue } = getTimeRemaining();
  timeRemaining.textContent = text;

  if (overdue) {
    timeRemaining.classList.add('overdue');
    overdueIndicator.hidden = false;
  } else {
    timeRemaining.classList.remove('overdue');
    overdueIndicator.hidden = true;
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimeRemaining, 30000);
}

function setStatus(newStatus) {
  state.status = newStatus;
  render();
  if (newStatus === 'Done') {
    clearInterval(timerInterval);
  } else {
    startTimer();
  }
}

checkbox.addEventListener('change', () => {
  setStatus(checkbox.checked ? 'Done' : 'Pending');
});


statusControl.addEventListener('change', () => {
  setStatus(statusControl.value);
});


expandToggle.addEventListener('click', () => {
  state.isExpanded = !state.isExpanded;
  render();
});

editBtn.addEventListener('click', () => {
  state.isEditing = true;
  render();
});

cancelBtn.addEventListener('click', () => {
  state.isEditing = false;
  render();
  editBtn.focus();
});

saveBtn.addEventListener('click', () => {
  if (!editTitleInput.value.trim()) {
    editTitleInput.focus();
    editTitleInput.style.borderColor = '#DC2626';
    return;
  }

  state.title = editTitleInput.value.trim();
  state.description = editDescInput.value.trim();
  state.priority = editPrioritySelect.value;

  if (editDueDateInput.value) {
    state.dueDate = new Date(editDueDateInput.value).toISOString();
  }

  state.isEditing = false;
  render();
  editBtn.focus();

  startTimer();
});

editTitleInput.addEventListener('input', () => {
  editTitleInput.style.borderColor = '';
});

deleteBtn.addEventListener('click', () => {
  alert('Delete clicked');
});

editForm.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;

  const focusable = editForm.querySelectorAll(
    'input, textarea, select, button'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

render();
startTimer();

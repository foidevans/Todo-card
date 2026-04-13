const checkbox = document.getElementById('todo-complete');
const todoCard = document.querySelector('.todo-card');
const todoStatus = document.querySelector('.todo-status');
const todoTitle = document.querySelector('.todo-title');
const timeRemaining = document.querySelector('.todo-time-remaining');
const editBtn = document.querySelector('.todo-edit-btn');
const deleteBtn = document.querySelector('.todo-delete-btn');

const DUE_DATE = new Date('2026-04-16T18:00:00Z');

function getTimeRemaining() {
  const now = new Date();
  const diff = DUE_DATE - now;

  const minutes = Math.floor(Math.abs(diff) / (1000 * 60));
  const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
  const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));

  if (diff <= 0) {
    if (minutes < 60) return { text: `Overdue by ${minutes} minute${minutes !== 1 ? 's' : ''}`, overdue: true };
    if (hours < 24) return { text: `Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`, overdue: true };
    return { text: `Overdue by ${days} day${days !== 1 ? 's' : ''}`, overdue: true };
  }

  if (minutes < 60) return { text: `Due in ${minutes} minute${minutes !== 1 ? 's' : ''}`, overdue: false };
  if (hours < 24) return { text: `Due in ${hours} hour${hours !== 1 ? 's' : ''}`, overdue: false };
  if (days === 1) return { text: 'Due tomorrow', overdue: false };
  return { text: `Due in ${days} days`, overdue: false };
}

function updateTimeRemaining() {
  const { text, overdue } = getTimeRemaining();
  timeRemaining.textContent = text;
  if (overdue) {
    timeRemaining.classList.add('overdue');
  } else {
    timeRemaining.classList.remove('overdue');
  }
}

updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    todoCard.classList.add('is-complete');
    todoStatus.textContent = 'Done';
    todoStatus.classList.add('done');
  } else {
    todoCard.classList.remove('is-complete');
    todoStatus.textContent = 'In Progress';
    todoStatus.classList.remove('done');
  }
});

editBtn.addEventListener('click', () => {
  console.log('edit clicked');
});

deleteBtn.addEventListener('click', () => {
  alert('Delete clicked');
});


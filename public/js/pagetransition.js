document.addEventListener('DOMContentLoaded', () => {
  const pageTransitionBtn = document.querySelector('header > button');
  pageTransitionBtn.addEventListener('click', () => location.href = pageTransitionBtn.dataset.href);
});
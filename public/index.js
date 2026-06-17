document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.search-parameters');

  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';

    dropdownMenu.classList.toggle('show');
    dropdownToggle.setAttribute('aria-expanded', !isExpanded);
  });

  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== dropdownToggle) {
      dropdownMenu.classList.remove('show');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const themeButton = document.querySelector('#theme-btn');
const cssLink = document.querySelector('#css-link');

themeButton.addEventListener('click', () => {
  if (cssLink.getAttribute('href') === '/css/main.css') {
    cssLink.setAttribute('href', '/css/darkmode.css');

    themeButton.classList.add('active');
  } else {
    cssLink.setAttribute('href', '/css/main.css');

    themeButton.classList.remove('active');
  }
});

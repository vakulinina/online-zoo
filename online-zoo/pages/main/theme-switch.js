const themeToggle = document.querySelector('.toggle-input');

const toggleTheme = (theme) => {
  const headerLogo = document.querySelector('.header-logo');
  const menuButton = document.querySelector('.menu-btn-fill');
  const tooltips = document.querySelectorAll('.tooltip');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const map = document.querySelector('.map-container');
  const commonStyleProps = {
    '--header-background-color': '#333',
    '--main-block-background-light': '#333',
    '--main-block-background-dark': '#4f4f4f',
    '--title-color': '#fefefe',
    '--paragraph-color': '#f2f2f2',
  };

  if (theme === 'dark') {
    localStorage.setItem('theme', 'dark');
    for (let prop in commonStyleProps) {
      document.documentElement.style.setProperty(prop, commonStyleProps[prop]);
    };
    headerLogo.setAttribute('src', '../../assets/logo-light.svg');
    if (map) {
      map.style.backgroundImage = 'url("../../assets/map-light.svg")';
    }
    menuButton.classList.add('menu-btn-fill-dark');
    testimonialCards.forEach(card => card.classList.add('testimonial-card-dark'));
    tooltips.forEach(tooltip => tooltip.classList.add('tooltip-dark'));
  } else {
    localStorage.setItem('theme', 'light')
    for (let prop in commonStyleProps) {
      document.documentElement.style.removeProperty(prop);
    };
    headerLogo.setAttribute('src', '../../assets/logo-dark.svg');
    if (map) {
      map.style.backgroundImage = '';
    }
    menuButton.classList.remove('menu-btn-fill-dark');
    testimonialCards.forEach(card => card.classList.remove('testimonial-card-dark'));
    tooltips.forEach(tooltip => tooltip.classList.remove('tooltip-dark'));
  }
}

const setTheme = (currentTheme) => {
  if (currentTheme === 'dark') {
    themeToggle.checked = true;
    toggleTheme('dark');
  } else {
    themeToggle.checked = false;
    toggleTheme('light');
  }
}

setTheme(localStorage.getItem('theme'));

themeToggle.addEventListener('change', ({ target }) => {
  if (target.checked) {
    toggleTheme('dark');
  } else {
    toggleTheme('light');
  }
})

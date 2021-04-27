document.querySelector('.theme-toggle').addEventListener('change', ({ target }) => {
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

  if (target.checked) {
    for (let prop in commonStyleProps) {
      document.documentElement.style.setProperty(prop, commonStyleProps[prop]);
    };
    headerLogo.setAttribute('src', '../../assets/logo-light.svg');
    map.style.backgroundImage = 'url("../../assets/map-light.svg")';
  } else {
    for (let prop in commonStyleProps) {
      document.documentElement.style.removeProperty(prop);
    };
    headerLogo.setAttribute('src', '../../assets/logo-dark.svg');
    map.style.backgroundImage = ''
  }

  menuButton.classList.toggle('menu-btn-fill-dark');
  testimonialCards.forEach(card => card.classList.toggle('testimonial-card-dark'));
  tooltips.forEach(tooltip => tooltip.classList.toggle('tooltip-dark'));
})

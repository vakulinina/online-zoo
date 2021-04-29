// Theme switch

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

//Watch online carousel

const animalsGallery = document.querySelector('.animals-gallery');
const rangeSlider = document.querySelector('.watch-online .slider');
const rangeSliderOutput = document.querySelector('.watch-online .slider-value');
const animals = [
  {
    name: 'Eagle',
    img: '../../assets/eagle.png',
    description: `Eagle’s name is Vincent. He is 3 years old. Vincent is from America. He
    loves life.`,
  },
  {
    name: 'Panda',
    img: '../../assets/panda.png',
    description: `Panda’s name is Bei Bei. He is 2 years old. Bei Bei is from China. He loves bamboos.`,
  },
  {
    name: 'Gorilla',
    img: '../../assets/gorilla.png',
    description: `Gorilla’s name is Alexander. He is 10 years old. Alexander is from Florida. He loves parties.`,
  },
  {
    name: 'Alligator',
    img: '../../assets/alligator.png',
    description: `Alligator's name is Alfred. He is 11 years old. Alfred is from China. He loves to bathe and chill.`,
  },
  {
    name: 'Fox',
    img: '../../assets/fox.png',
    description: `Fox’s name is Henry. He is 3 years old. Henry is from Russia.`,
  },
  {
    name: 'Elephant',
    img: '../../assets/elephant.png',
    description: `Elephant's name is Jesus. He is 15 years old. Jesus is from Africa.`,
  },
  {
    name: 'Sloth',
    img: '../../assets/sloth.png',
    description: `Sloth's name is Sid. He is 4 years old. Sid is from Central America.`,
  },
  {
    name: 'Leopard',
    img: '../../assets/leopard.png',
    description: `Leopard's name is Juan. He is 6 years old. Juan is from Central America.`,
  }
];
let animalIndex = 1;

const updateSliderValue = () => {
  rangeSliderOutput.innerHTML = `0${rangeSlider.value}/<span class="slider-value-total">0${animals.length}</span>`
};

const slideNext = () => {
  document.querySelector('.gallery-item-hidden-start').remove();

  document.querySelector('.gallery-item-prev').classList.add('gallery-item-hidden-start');
  document.querySelector('.gallery-item-prev').classList.remove('gallery-item-prev');

  document.querySelector('.gallery-item-active').classList.add('gallery-item-prev');
  document.querySelector('.gallery-item-active').classList.remove('gallery-item-active');

  document.querySelector('.gallery-item-next').classList.add('gallery-item-active');
  document.querySelector('.gallery-item-next').classList.remove('gallery-item-next');

  document.querySelector('.gallery-item-next2').classList.add('gallery-item-next');
  document.querySelector('.gallery-item-next2').classList.remove('gallery-item-next2');

  document.querySelector('.gallery-item-next3').classList.add('gallery-item-next2');
  document.querySelector('.gallery-item-next3').classList.remove('gallery-item-next3');

  document.querySelector('.gallery-item-hidden-end').classList.add('gallery-item-next3');
  document.querySelector('.gallery-item-hidden-end').classList.remove('gallery-item-hidden-end');

  const nextAnimal = animals[animalIndex + 5];
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery-item', 'gallery-item-hidden-end');
  if (nextAnimal) {
    galleryItem.innerHTML = `
          <article class="animal-card">
            <img src="${nextAnimal.img}" alt="${nextAnimal.name}">
            <div class="animal-card-description">
              <p class="animal-card-text">${nextAnimal.description}</p>
              <a class="watch-btn-small" href="../zoos/${nextAnimal.name}.html">Watch online</a>
              <button class="donate-btn-small">Donate</button>
            </div>
          </article>
      `;
  } else {
    galleryItem.classList.add('gallery-item-empty');
  }
  animalsGallery.append(galleryItem);
  animalIndex++;
}

const slideBack = () => {
  document.querySelector('.gallery-item-hidden-end').remove();

  document.querySelector('.gallery-item-next3').classList.add('gallery-item-hidden-end');
  document.querySelector('.gallery-item-next3').classList.remove('gallery-item-next3');


  document.querySelector('.gallery-item-next2').classList.add('gallery-item-next3');
  document.querySelector('.gallery-item-next2').classList.remove('gallery-item-next2');

  document.querySelector('.gallery-item-next').classList.add('gallery-item-next2');
  document.querySelector('.gallery-item-next').classList.remove('gallery-item-next');


  document.querySelector('.gallery-item-active').classList.add('gallery-item-next');
  document.querySelector('.gallery-item-active').classList.remove('gallery-item-active');

  document.querySelector('.gallery-item-prev').classList.add('gallery-item-active');
  document.querySelector('.gallery-item-prev').classList.remove('gallery-item-prev');

  document.querySelector('.gallery-item-hidden-start').classList.add('gallery-item-prev');
  document.querySelector('.gallery-item-hidden-start').classList.remove('gallery-item-hidden-start');

  const prevAnimal = animals[animalIndex - 3];
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery-item', 'gallery-item-hidden-start');
  if (prevAnimal) {
    galleryItem.innerHTML = `
          <article class="animal-card">
            <img src="${prevAnimal.img}" alt="${prevAnimal.name}">
            <div class="animal-card-description">
              <p class="animal-card-text">${prevAnimal.description}</p>
              <a class="watch-btn-small" href="../zoos/${prevAnimal.name.toLocaleLowerCase()}.html">Watch online</a>
              <button class="donate-btn-small">Donate</button>
            </div>
          </article>
      `;
  } else {
    galleryItem.classList.add('gallery-item-empty');
  }
  animalsGallery.prepend(galleryItem);
  animalIndex--;
}

animalsGallery.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('animal-card')) return;
  if (target.closest('.gallery-item').classList.contains('gallery-item-prev')) {
    slideBack();
    rangeSlider.value--;
  }
  if (target.closest('.gallery-item').classList.contains('gallery-item-next')) {
    slideNext();
    rangeSlider.value++;
  }
  updateSliderValue();
})

let previousSliderValue = rangeSlider.value;

rangeSlider.addEventListener('input', () => {
  const currentSliderValue = rangeSlider.value;
  if (currentSliderValue > previousSliderValue) {
    for (let i = previousSliderValue; i < currentSliderValue; i++) {
      slideNext();
    }
  }
  if (currentSliderValue < previousSliderValue) {
    for (let i = previousSliderValue; i > currentSliderValue; i--) {
      slideBack();
    }
  }
  updateSliderValue();
  previousSliderValue = currentSliderValue;
})

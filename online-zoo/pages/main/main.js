'use strict'

//Watch online carousel

const animalsGallery = document.querySelector('.animals-gallery');
const rangeSlider = document.querySelector('.watch-online .slider');
const rangeSliderOutput = document.querySelector('.watch-online .slider-value');
const animals = [
  {
    name: 'Eagle',
    img: '../../assets/eagle.png',
    description: `Eagle’s name is Vincent. He is 3 years old. Vincent is from America. He loves life.`,
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

  document.querySelector('.gallery-item-next-second').classList.add('gallery-item-next');
  document.querySelector('.gallery-item-next-second').classList.remove('gallery-item-next-second');

  document.querySelector('.gallery-item-next-third').classList.add('gallery-item-next-second');
  document.querySelector('.gallery-item-next-third').classList.remove('gallery-item-next-third');

  document.querySelector('.gallery-item-hidden-end').classList.add('gallery-item-next-third');
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

  document.querySelector('.gallery-item-next-third').classList.add('gallery-item-hidden-end');
  document.querySelector('.gallery-item-next-third').classList.remove('gallery-item-next-third');


  document.querySelector('.gallery-item-next-second').classList.add('gallery-item-next-third');
  document.querySelector('.gallery-item-next-second').classList.remove('gallery-item-next-second');

  document.querySelector('.gallery-item-next').classList.add('gallery-item-next-second');
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

let previousRangeValue = rangeSlider.value;

rangeSlider.addEventListener('input', () => {
  const currentSliderValue = rangeSlider.value;
  if (currentSliderValue > previousRangeValue) {
    for (let i = previousRangeValue; i < currentSliderValue; i++) {
      slideNext();
    }
  }
  if (currentSliderValue < previousRangeValue) {
    for (let i = previousRangeValue; i > currentSliderValue; i--) {
      slideBack();
    }
  }
  updateSliderValue();
  previousRangeValue = currentSliderValue;
})

// Pets-in-zoo carousel

const nextButton = document.querySelector('#pets-carousel-next');
const previousButton = document.querySelector('#pets-carousel-prev');
const carouselLine = document.querySelector('.carousel-items');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselRangeOutput = document.querySelector('#pets-carousel-range-output');
const carouselRangeInput = document.querySelector('#pets-carousel-range-input');
const displayedItems = 4;
let activeItemIndex = 0;
let previousCarouselRangeValue = carouselRangeInput.value;
let stepWidth;
let sliderWidth;
let lastDisplayedImageIndex;

const updateRangeValue = () => {
  carouselRangeOutput.innerHTML = `0${carouselRangeInput.value}/<span class="slider-value-total">0${carouselItems.length}</span>`
}

const rollCarousel = () => {
  if (activeItemIndex < displayedItems) {
    carouselLine.style.left = 0;
  } else {
    carouselLine.style.left = `-${(activeItemIndex + 1 - displayedItems) * stepWidth}px`;
  }
}

const calculateCarousel = () => {
  sliderWidth = document.querySelector('.carousel-items-displayed').offsetWidth;
  stepWidth = sliderWidth / displayedItems;
  carouselLine.style.width = `${stepWidth * carouselItems.length}px`;
  carouselItems.forEach(item => {
    item.style.width = `${stepWidth * 0.92}px`;
    item.style.height = `${stepWidth * 1.32}px`;
  })
  rollCarousel();
}

const handleNextInput = () => {
  const currentActiveItem = [...carouselItems].find(item => item.classList.contains('carousel-item-active'));
  if (activeItemIndex >= carouselItems.length) {
    activeItemIndex = 0;
    rollCarousel();
    currentActiveItem.classList.remove('carousel-item-active');
    carouselItems[activeItemIndex].classList.add('carousel-item-active');
  } else if (activeItemIndex >= displayedItems) {
    rollCarousel();
    lastDisplayedImageIndex = activeItemIndex;
    currentActiveItem.classList.remove('carousel-item-active');
    carouselItems[activeItemIndex].classList.add('carousel-item-active');
  } else {
    currentActiveItem.classList.remove('carousel-item-active');
    carouselItems[activeItemIndex].classList.add('carousel-item-active');
  }
}

const handlePreviousInput = () => {
  const currentActiveItem = [...carouselItems].find(item => item.classList.contains('carousel-item-active'));
  if (activeItemIndex < 0) {
    activeItemIndex = carouselItems.length - 1;
    rollCarousel();
    currentActiveItem.classList.remove('carousel-item-active');
    carouselItems[activeItemIndex].classList.add('carousel-item-active');
  } else if (activeItemIndex <= lastDisplayedImageIndex - displayedItems || activeItemIndex < carouselItems.length - displayedItems) {
    rollCarousel();
    currentActiveItem.classList.remove('carousel-item-active');
    carouselItems[activeItemIndex].classList.add('carousel-item-active');
  } else {
    currentActiveItem.classList.remove('carousel-item-active');
    carouselItems[activeItemIndex].classList.add('carousel-item-active');
  }
}

nextButton.addEventListener('click', () => {
  activeItemIndex++;
  handleNextInput();
  carouselRangeInput.value = activeItemIndex + 1;
  updateRangeValue();
})

previousButton.addEventListener('click', () => {
  activeItemIndex--;
  handlePreviousInput();
  carouselRangeInput.value = activeItemIndex + 1;
  updateRangeValue();
})

carouselRangeInput.addEventListener('input', () => {
  const currentRangeValue = carouselRangeInput.value;
  activeItemIndex = currentRangeValue - 1;
  if (currentRangeValue > previousCarouselRangeValue) {
    for (let i = previousCarouselRangeValue; i < currentRangeValue; i++) {
      handleNextInput();
    }
  }
  if (currentRangeValue < previousCarouselRangeValue) {
    for (let i = previousCarouselRangeValue; i > currentRangeValue; i--) {
      handlePreviousInput();
    }
  }
  updateRangeValue();
  previousCarouselRangeValue = currentRangeValue;
})

window.addEventListener('resize', calculateCarousel);

calculateCarousel();

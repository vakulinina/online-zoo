const carouselItems = document.querySelectorAll('.nav-animals-item');
const nextButton = document.querySelector('#nav-animals-next-btn');
const previousButton = document.querySelector('#nav-animals-previous-btn');
const carouselLine = document.querySelector('.nav-animals-list');
const carouselItem = document.querySelector('.nav-animals-item');
const carouselItemStyle = window.getComputedStyle(carouselItem);
const carouselRangeOutput = document.querySelector('#nav-animals-range-output');
const carouselRangeInput = document.querySelector('#nav-animals-range-input');
const markers = document.querySelectorAll('.map-marker');
const active = 'nav-animals-item-selected';
let stepWidth = parseInt(carouselItemStyle.width, 10) + parseInt(carouselItemStyle.marginLeft, 10) + parseInt(carouselItemStyle.marginRight, 10);
let activeItemIndex = 1;
let displayedItems;
let sliderWidth;
let previousCarouselRangeValue = carouselRangeInput.value;
let lastDisplayedImageIndex;

const calculateCarousel = () => {
  const slider = document.querySelector('.nav-animals-slider');
  displayedItems = Math.floor(slider.offsetWidth / stepWidth);
  sliderWidth = displayedItems * stepWidth + 20;
  slider.style.width = `${sliderWidth}px`;
  stepWidth = sliderWidth / displayedItems;
  rollCarousel();
}

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

const activateIcon = () => {
  carouselItems.forEach(item => item.classList.remove(active));
  if (activeItemIndex >= carouselItems.length) {
    activeItemIndex = 0;
    rollCarousel();
  } else if (activeItemIndex >= displayedItems) {
    rollCarousel();
    lastDisplayedImageIndex = activeItemIndex;
  } else if (activeItemIndex < 0) {
    activeItemIndex = carouselItems.length - 1;
    rollCarousel();
  } else if (activeItemIndex <= (lastDisplayedImageIndex - displayedItems) || activeItemIndex < (carouselItems.length - displayedItems)) {
    rollCarousel();
  }
  carouselItems[activeItemIndex].classList.add(active);
}

const activateMarker = (animal) => {
  markers.forEach(marker => {
    marker.classList.remove('map-marker-active');
    if (marker.title.toLowerCase() === animal) {
      marker.classList.add('map-marker-active');
    }
  })
}

nextButton.addEventListener('click', () => {
  activeItemIndex++;
  activateIcon();
  carouselRangeInput.value = activeItemIndex + 1;
  updateRangeValue();
  if (markers[activeItemIndex]) {
    activateMarker(markers[activeItemIndex].title.toLowerCase());
  }
  updateButtonLink(carouselItems[activeItemIndex].firstElementChild.title.toLowerCase());
})

previousButton.addEventListener('click', () => {
  activeItemIndex--;
  activateIcon();
  carouselRangeInput.value = activeItemIndex + 1;
  updateRangeValue();
  if (markers[activeItemIndex]) {
    activateMarker(markers[activeItemIndex].title.toLowerCase());
  }
  updateButtonLink(carouselItems[activeItemIndex].firstElementChild.title.toLowerCase());
})

carouselRangeInput.addEventListener('input', () => {
  const currentRangeValue = carouselRangeInput.value;
  activeItemIndex = currentRangeValue - 1;
  if (currentRangeValue > previousCarouselRangeValue) {
    for (let i = previousCarouselRangeValue; i < currentRangeValue; i++) {
      activateIcon();
    }
  }
  if (currentRangeValue < previousCarouselRangeValue) {
    for (let i = previousCarouselRangeValue; i > currentRangeValue; i--) {
      activateIcon();
    }
  }
  if (markers[activeItemIndex]) {
    activateMarker(markers[activeItemIndex].title.toLowerCase());
  }
  updateRangeValue();
  previousCarouselRangeValue = currentRangeValue;
})

const updateButtonLink = (animal) => {
  document.querySelector('#map-watch-btn').setAttribute('href', `../zoos/${animal}.html`)
}

carouselLine.addEventListener('click', ({ target }) => {
  event.preventDefault();
  if (!target.classList.contains('nav-animals-item-img')) return;
  const newActiveItem = target.closest('.nav-animals-item');
  carouselItems.forEach(item => item.classList.remove(active));
  newActiveItem.classList.add(active);
  activeItemIndex = [...carouselItems].indexOf(newActiveItem);
  carouselRangeInput.value = activeItemIndex + 1;
  updateRangeValue();
  updateButtonLink(newActiveItem.firstElementChild.title.toLowerCase());
  activateMarker(newActiveItem.firstElementChild.title.toLowerCase());
})

document.querySelector('.map-container').addEventListener('click', ({ target }) => {
  if (target.classList.contains('marker-icon') || target.classList.contains('marker-photo')) {
    const selectedMarker = target.closest('.map-marker');
    activeItemIndex = [...markers].indexOf(selectedMarker);
    activateMarker(selectedMarker.title.toLowerCase());
    activateIcon();
    updateButtonLink(selectedMarker.title.toLowerCase());
    carouselRangeInput.value = activeItemIndex + 1;
    updateRangeValue();
  }
})

window.addEventListener('resize', calculateCarousel);

calculateCarousel();

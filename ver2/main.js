const galleryItems = document.querySelectorAll('.gallery-item');
const galleryControls = [];

class Carousel {
  constructor(items, controls) {
    this.carouselArray = [...items];
    this.carouselControls = [...controls];
  };

  // update css classes for gallery (because the element disappear so the class of element1 now need the be on another element)
  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
    });
    
    this.carouselArray.slice(0, 3).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  };

  // selects all the elements that havbe the classes of gallery-controls-previous gallery-controls-next and adds them to this.carouselControls
  // set the controls for the carousel
  setControls() {
    let previousControls = document.querySelectorAll('.gallery-controls-previous');
    let nextControls = document.querySelectorAll('.gallery-controls-next');
    this.carouselControls = [...previousControls, ...nextControls];
  };


  
  // update the current order of the carouselArray and gallery
  setCurrentState(direction) {
    if (direction.classList.contains('gallery-controls-previous')) {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else if (direction.classList.contains('gallery-controls-next')) {
      this.carouselArray.push(this.carouselArray.shift());
    };
    
    this.updateGallery();
  };
  
  // adds the event listeners so buttons are able to move the carousel
  useControls() {
    const triggers = [...this.carouselControls];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  };

};

const carousel = new Carousel(galleryItems, galleryControls);
carousel.setControls();
carousel.useControls(); // assign the event listeners to the buttons

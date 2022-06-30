const galleryControls = [];
const galleryItems = document.querySelectorAll('.gallery-item');

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
      el.classList.remove('gallery-controls-previous');
      el.classList.remove('gallery-controls-next');
    });
    
    // adds classes for the new visible elements of the carousel after you press next or previous button
    this.carouselArray.slice(0, 3).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
      // add gallery controls on the first element of the carousel
      if (i+1 == 1) {
        el.classList.add('gallery-controls-previous');
      };
      // add gallery controls on the last element of the carousel
      if (i+1 == 3) {
        el.classList.add('gallery-controls-next');
      };
    });
  };

  // add all the controls for the carousel inside an array
  // selects all the elements that havbe the classes of gallery-controls-previous gallery-controls-next and adds them to this.carouselControls
  // set the controls for the carousel
  setControls() {
    let previousControls = document.querySelectorAll('.gallery-controls-previous');
    let nextControls = document.querySelectorAll('.gallery-controls-next');
    this.carouselControls = [...previousControls, ...nextControls];
  };

  // since every click the classes for the nodes update, this function assigns the event listener to the new node that inherited the classes for gallery control
  useControls() {
    this.setControls();
    const triggers = [...this.carouselControls];
    
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  };

  // update the current order of the carouselArray and gallery
  setCurrentState(direction) {
    if (direction.classList.contains('gallery-controls-previous')) {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else if (direction.classList.contains('gallery-controls-next')) {
      this.carouselArray.push(this.carouselArray.shift());
    };
    
    this.updateGallery();
    this.setControls();
    this.useControls();
  };

};

const carousel = new Carousel(galleryItems, galleryControls);
carousel.useControls();

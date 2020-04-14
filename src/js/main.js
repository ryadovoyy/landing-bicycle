const smoothScroll = target => {
  let scrollContainer = target;

  do {
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop++;
  } while (scrollContainer.scrollTop == 0);

  let targetY = 0;

  do {
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while ((target = target.offsetParent));

  const scroll = (c, a, b, i) => {
    i++;
    if (i > 30) return;
    c.scrollTop = a + ((b - a) / 30) * i;

    setTimeout(() => {
      scroll(c, a, b, i);
    }, 20);
  };

  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};

class Carousel {
  constructor(interval = 5000) {
    this.items = Array.from(document.querySelectorAll('.carousel__item'));

    this.indicators = Array.from(
      document.querySelectorAll('.carousel__indicator')
    );

    this.index = 0;
    this.interval = interval;
  }

  changeView(item) {
    const carouselInner = document.querySelector('.carousel__inner');

    while (carouselInner.firstChild) {
      carouselInner.removeChild(carouselInner.firstChild);
    }

    carouselInner.appendChild(item);
  }

  switchActive() {
    this.indicators[this.index].classList.toggle('carousel__indicator--active');
    this.items[this.index].classList.toggle('carousel__item--active');
  }

  addIndicatorClickHandler() {
    this.indicators.forEach(current => {
      current.addEventListener('click', () => {
        const activeItem = document.querySelector('.carousel__item--active');

        const activeIndicator = document.querySelector(
          '.carousel__indicator--active'
        );

        const activeIndex = this.indicators.indexOf(activeIndicator);

        activeItem.classList.remove('carousel__item--active');
        activeIndicator.classList.remove('carousel__indicator--active');

        this.index = this.indicators.indexOf(current);
        this.switchActive();
        this.changeView(this.items[this.index]);
      });
    });
  }

  setSwitchInterval() {
    setInterval(() => {
      this.switchActive();

      if (this.index < this.items.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }

      this.switchActive();
      this.changeView(this.items[this.index]);
    }, this.interval);
  }

  init() {
    this.changeView(this.items[0]);
    this.setSwitchInterval();
    this.addIndicatorClickHandler();
  }
}

new Carousel().init();

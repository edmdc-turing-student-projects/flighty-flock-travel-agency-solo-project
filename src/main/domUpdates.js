class DomUpdates {
  constructor(querySelectors, data) {
    this.user = {}
    Object.assign(this, querySelectors, data)
  }

  declareEventListeners() {
    this.loginBtn.addEventListener('click', () => this.loginForm.classList.toggle('hidden'));
    this.logoutBtn.addEventListener('click', () => this.logUserOut());
    this.loginForm.addEventListener('submit', () => this.logUserIn());
  }

  logUserIn() {
    event.preventDefault()
    let username = document.forms[0].elements[0].value;
    let password = document.forms[0].elements[1].value
    this.checkUserInput(username, password);
  };

  checkUserInput(username, password) {
    let regEx = /[^a-z]*/g;
    let userType = username.split(regEx).join('');
    let passWordCheck = (password === "travel2020");

    return (userType === 'traveler' && passWordCheck) ? this.startTravelerUx(username)
    : (userType === 'agency' && passWordCheck) ? this.startAgencyUx()
    : alert('Invalid Username');
  };

  startTravelerUx(username) {
    this.toggleUserInterface("travelerPage");
    this.findUser(username);
    this.saveUser('traveler');
    this.loginForm.classList.add('hidden')
  };

  startAgencyUx() {
    this.toggleUserInterface("agencyPage");
    this.saveUser('agency');
  };

  findUser(username) {
    let regEx = /[a-z]*/g
    let userId = username.split(regEx).join('')
    this.user = this.travelers.find(user => user.id == userId)
  }

  saveUser(userType) {
    localStorage.setItem('user', JSON.stringify({type: userType, info:this.user}));
  }

  toggleUserInterface(userType) {
    this.welcomePage.classList.add('hidden');
    this.loginBtn.classList.add('hidden');
    this[userType].classList.remove('hidden');
    this.logoutBtn.classList.remove('hidden');
  };

  logUserOut() {
    this.welcomePage.classList.remove('hidden');
    this.loginBtn.classList.remove('hidden');
    this.logoutBtn.classList.add('hidden');
    this.agencyPage.classList.remove('hidden');
    this.travelerPage.classList.remove('hidden');
    localStorage.clear()
  }

  checkLocalStorage4User() {
    if(localStorage.user) {
      let previousUser = JSON.parse(localStorage.getItem('user'))
      this.user = previousUser.info
      return (previousUser.type === 'traveler') ? this.toggleUserInterface("travelerPage")
        : this.toggleUserInterface("agencyPage");
    };
  };

  createDestinationCarousel() {
    let container = document.createElement("article");
    container.className = "carousel-container";
    let carousel = document.createElement("div");
    carousel.className = "carousel";
    this.user.trips.forEach((trip, index) => {
      this.createThumbnailHelperInput(carousel, index)
    })
    this.createAllDestinationSlides(carousel);
    this.createAllDestinationThumbnails(carousel)
  }

  createThumbnailHelperInput(element, index) {
    let thumbnailInput = `<input type="radio" name="slides" id="slide-${index + 1}>`
    element.append(thumbnailInput);
  }

  createAllDestinationSlides(element) {
    let carouselSlides = document.createElement("ul")
    carouselSlides.className = "carousel-slides"
    this.user.trips.forEach(trip => this.createDestinationCarouselSlide(carouselSlides, trip))
    element.append(carouselSlides)
  }

  createDestinationCarouselSlide(element, destination) {
    let slide = document.createElement("li")
    slide.className = "carousel__slide"
    let destinationInfo = 
      `<figure>
        <div>
          <img src=${destination.image} alt=${destination.alt}>
        </div>
        <figcaption>
          ${destination.alt}
          <span class="location">${destination.destination}</span>
        </figcaption>
      </figure>`
    element.append(slide.append(destinationInfo));
  }

  createAllDestinationThumbnails(element) {
    let carouselThumbnails = document.createElement("ul")
    carouselThumbnails.className = "carousel-thumbnails"
    this.user.trips.forEach(trip => this.createDestinationThumbnail(carouselSlides, trip))
    element.append(carouselThumbnails)
  }

  createDestinationThumbnail(element, destination) {
    let thumbnail = document.createElement("li");
    let thumbnailLabel = document.createElement('label')
      .setAttribute("for", `slide-${index + 1}`);
    let thumbnailImg = `<img src=${destination.img} alt=${destination.alt}`
    element.append(thumbnail.append(thumbnailLabel.append(thumbnailImg)));
  }
};

export default DomUpdates;
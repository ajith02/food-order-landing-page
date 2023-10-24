// Nav toggler

let navToggler = document.querySelector('.nav-toggler');
let linksContainer = document.querySelector('.links-container');

navToggler.addEventListener('click', () => {
	navToggler.classList.toggle('active');
	linksContainer.classList.toggle('active');
})

let reviews = document.querySelectorAll('.review-wrapper');

let currentReviews = [0, 2];

let updateReviewSlider = (cards) => {

	cards.forEach((card_index) => {
		reviews[card_index].classList.add('active');
	})
}

setInterval(() => {
	currentReviews.forEach((card_index, i) => {
		reviews[card_index].classList.remove('active');

		currentReviews[i] = card_index >= reviews.length - 1 ? 0 : card_index + 1;
	})


	setTimeout(() => {
		updateReviewSlider(currentReviews);
	}, 250);

}, 5000)

updateReviewSlider(currentReviews);


// FAQ

let faqs = [...document.querySelectorAll('.faq')];

faqs.map(faq => {
	let ques = faq.querySelector('.question-box');

	ques.addEventListener('click', () => {
		faq.classList.toggle('active');
	})
})

// Slider

let dishSlider = document.querySelector('.dish-slide');

let rotationValue = 0;

setInterval(() => {
	rotationValue += 120;
	dishSlider.style.transform = `translateY(-50%) rotate(${rotationValue}deg)`;
}, 3000)

AOS.init();

// GEO location

let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    locationDiv.innerText = "The browser does not support geolocation";
  }
});

//Error Checks
const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Please allow access to location";
      break;
    case error.POSITION_UNAVAILABLE:
      locationDiv.innerText = "Location Information unavailable";
      break;
    case error.TIMEOUT:
      locationDiv.innerText = "The request to get user location timed out";
  }
};

const showLocation = async (position) => {
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  //store response object
  let data = await response.json();
  locationDiv.value = `${data.address.city}, ${data.address.country}`;
};
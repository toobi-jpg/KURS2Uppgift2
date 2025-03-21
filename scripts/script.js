getData();
getAdvice();
// Visa mer knapp logik ....................................................
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  const moreButton = card.querySelector("#more-arrow");
  const moreInfo = card.querySelector("#more-info-container");

  if (moreButton && moreInfo) {
    moreButton.addEventListener("click", () => {
      if (card.style.height !== "240px") {
        moreButton.className = "fa-solid fa-arrow-up fa-lg more-arrow";
        card.style.height = "240px";
        moreInfo.classList.remove("hide-more-info");
      } else {
        moreButton.className = "fa-solid fa-arrow-down fa-lg more-arrow";
        card.style.height = "120px";
        moreInfo.classList.add("hide-more-info");
      }
    });
  }
});
// ........................................................................
// Button click & animation logik .........................................
const rndBtn = document.querySelector("#random-button");
const dice = document.querySelector("#dice-img");

dice.addEventListener("click", () => {
  adviceText.style.opacity = "0";
  setTimeout(() => {
    getAdvice();
    setTimeout(() => {
      adviceText.style.opacity = "1";
    }, 200);
  }, 200);
  spinDice();
});

function spinDice() {
  dice.className = "fa-solid fa-dice-six fa-2xl dice-animation";
  setTimeout(() => {
    dice.className = "fa-solid fa-dice-six fa-2xl";
  }, 600);
}
// ........................................................................
// API Fetch & Plasering av data logik ....................................
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  users = data;
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    if (users[index]) {
      const nameText = card.querySelector(".name-span");
      const usernameText = card.querySelector(".username-span");
      const emailText = card.querySelector(".email-span");
      const cityText = card.querySelector(".city-span");
      const phoneText = card.querySelector(".phone-span");
      const companyText = card.querySelector(".company-span");

      nameText.textContent = users[index].name;
      usernameText.textContent = users[index].username;
      emailText.textContent = users[index].email;
      cityText.textContent = users[index].address.city;
      phoneText.textContent = users[index].phone;
      companyText.textContent = users[index].company.name;
    }
  });
}
// ........................................................................
// Header scroll logik ....................................................
const header = document.querySelector(".nav-container");
let scrollPrev = 0;
let scrollTreshold = 10;
window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  if (Math.abs(scroll - scrollPrev) < scrollTreshold) {
    return;
  }

  if (scrollPrev < scroll && scroll > 300) {
    header.classList.add("nav-animation-hide");
    header.classList.remove("nav-animation-show");
  } else {
    header.classList.remove("nav-animation-hide");
    header.classList.add("nav-animation-show");
  }

  scrollPrev = scroll;
});
// ........................................................................
// Random advice fetch ....................................................
const adviceText = document.querySelector("#advice-span");
async function getAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      const advice = data.slip.advice;
      adviceText.textContent = advice;
    });
}
// ........................................................................

getAdvice();
getData();
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
// GAMMAL logik för att placera data per html card som fanns i html, se HTML kommentar .................................................................

// async function getData() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const data = await response.json();
//   users = data;
//   const cards = document.querySelectorAll(".card");

//   cards.forEach((card, index) => {
//     if (users[index]) {
//       const nameText = card.querySelector(".name-span");
//       const usernameText = card.querySelector(".username-span");
//       const emailText = card.querySelector(".email-span");
//       const cityText = card.querySelector(".city-span");
//       const phoneText = card.querySelector(".phone-span");
//       const companyText = card.querySelector(".company-span");

//       nameText.textContent = users[index].name;
//       usernameText.textContent = users[index].username;
//       emailText.textContent = users[index].email;
//       cityText.textContent = users[index].address.city;
//       phoneText.textContent = users[index].phone;
//       companyText.textContent = users[index].company.name;
//     }
//   });
// }

// Fetch & Skapa element logik .............................................
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  let users = data;
  createElements(users);
}

//Tog cirka 12 timmar, om jag kan skriva denna logik snygare uppskattas feedback!
//UPDATE 03-25... I lektionen den 25'de fick jag svar på min kommentar över! med innerHTML kan man sätta hela html på en gång vilket hade gjort detta block av kod några timmar kortare och sparat min huvudvärk haha! Men innerHTML som jag förstått är inte lika bra pga XSS.

function createElements(users) {
  const cardContainer = document.querySelector(".cards-container");

  users.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");
    cardContainer.appendChild(card);

    //För att skapa 3 divar som ska ha enskild data inomsig.
    for (let i = 0; i < 3; i++) {
      lineDiv = document.createElement("div");
      lineDiv.className = "line";
      card.appendChild(lineDiv);

      if (i === 0) {
        const nameIcon = document.createElement("i");
        nameIcon.className = "fa-solid fa-id-card icon";

        const nameText = document.createElement("p");
        nameText.classList.add("name-span");
        nameText.textContent = user.name;
        lineDiv.append(nameIcon, nameText);
      } else if (i === 1) {
        const userIcon = document.createElement("i");
        userIcon.className = "fa-solid fa-user icon";

        const usernameText = document.createElement("p");
        usernameText.classList.add("username-span");
        usernameText.textContent = user.username;
        lineDiv.append(userIcon, usernameText);
      } else if (i === 2) {
        const emailIcon = document.createElement("i");
        emailIcon.className = "fa-solid fa-envelope icon";

        const emailText = document.createElement("p");
        emailText.classList.add("email-span");
        emailText.textContent = user.email;
        lineDiv.append(emailIcon, emailText);
      }
    }

    const moreInfoDiv = document.createElement("div");
    moreInfoDiv.className = "hide-more-info";
    moreInfoDiv.id = "more-info-container";
    card.appendChild(moreInfoDiv);

    //Samma här...
    for (let i = 0; i < 3; i++) {
      lineDiv = document.createElement("div");
      lineDiv.className = "line";
      moreInfoDiv.appendChild(lineDiv);

      if (i === 0) {
        const cityIcon = document.createElement("i");
        cityIcon.className = "fa-solid fa-city icon";

        const cityText = document.createElement("p");
        cityText.classList.add("city-span");
        cityText.textContent = user.address.city;

        lineDiv.append(cityIcon, cityText);
      } else if (i === 1) {
        const phoneIcon = document.createElement("i");
        phoneIcon.className = "fa-solid fa-phone icon";

        const phoneText = document.createElement("p");
        phoneText.classList.add("phone-span");
        phoneText.textContent = user.phone;

        lineDiv.append(phoneIcon, phoneText);
      } else if (i === 2) {
        const companyIcon = document.createElement("i");
        companyIcon.className = "fa-solid fa-coins icon";

        const companyText = document.createElement("p");
        companyText.classList.add("company-span");
        companyText.textContent = user.company.name;
        lineDiv.append(companyIcon, companyText);
      }
    }
    const showMoreButton = document.createElement("i");
    showMoreButton.className = "fa-solid fa-arrow-down fa-lg";
    showMoreButton.id = "more-arrow";
    card.appendChild(showMoreButton);

    //Öppna & stänga mer information logik
    showMoreButton.addEventListener("click", () => {
      console.log("Button clicked!");

      if (card.style.height !== "240px") {
        showMoreButton.className = "fa-solid fa-arrow-up fa-lg more-arrow";
        card.style.height = "240px";
        moreInfoDiv.classList.remove("hide-more-info");
      } else {
        showMoreButton.className = "fa-solid fa-arrow-down fa-lg more-arrow";
        card.style.height = "120px";
        moreInfoDiv.classList.add("hide-more-info");
      }
    });
  });
}

// ........................................................................
// Header scroll logik ....................................................
const header = document.querySelector(".nav-container");
let scrollPrev = 0;
window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  //För att ta bort små ändringar på scroll, exempelvis vid scrollning på telefon.
  if (Math.abs(scroll - scrollPrev) < 10) {
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

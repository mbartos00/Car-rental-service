//burger menu
const menuBtn = document.querySelector(".menuBtn");
const mobileMenu = document.querySelector(".menu");

let open = false;

menuBtn.addEventListener("click", () => {
  if (!open) {
    menuBtn.classList.add("open");
    mobileMenu.style.transform = "translateY(0%)";
    open = true;
  } else {
    menuBtn.classList.remove("open");
    mobileMenu.style.transform = "translateY(-100%)";
    open = false;
  }
});

//fetching cars data from json
const cardContainer = document.querySelector(".cards-container");

fetch("../js/cars.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (const item in data) {
      carSelection && carselect(data, item);
      cardContainer && createCard(data, item);
    }
  })
  .catch((err) => {
    console.error("error");
    console.error(err);
  });

const createCard = (data, i) => {
  const card = document.createElement("div");
  const infoWrapper = document.createElement("div");
  const cardPrice = document.createElement("div");
  const cardInfo = document.createElement("div");
  const link = document.createElement("a");
  const paragraph = document.createElement("p");
  const title = document.createElement("h2");

  //making a card
  card.setAttribute("data-brand", data[i].brand);
  card.setAttribute("data-model", data[i].model);
  card.classList.add("card");
  card.style.backgroundImage = `url(${data[i].image})`;

  //card title
  title.innerText = `${data[i].title}`;
  title.classList.add("card-title");

  //card informations
  infoWrapper.classList.add("info-wrapper");

  //info section
  cardInfo.classList.add("card-info");
  cardInfo.appendChild(link);
  link.innerText = "Więcej informacji";
  link.setAttribute("href", `${data[i].link}`);

  //price section
  cardPrice.classList.add("card-price");
  cardPrice.appendChild(paragraph);
  paragraph.classList.add("price");
  paragraph.innerText = `${data[i].price}/doba`;

  //appending content
  infoWrapper.appendChild(cardInfo);
  infoWrapper.appendChild(cardPrice);
  card.appendChild(infoWrapper);
  card.appendChild(title);
  cardContainer.appendChild(card);
};

//Filtering cars
const cards = document.getElementsByClassName("card");
const filterBtn = document.querySelector(".filter-btn");
const brandSelect = document.querySelector(".brand-select");
filterBtn &&
  filterBtn.addEventListener("click", () => {
    // closing mobile view menu by filter button
    if (mediaQuery.matches) {
      filterMenu.style.transform = "translateX(-120%)";
      filterMobilebtn.innerHTML = '<i class="fas fa-filter"></i>';
      open = false;
    }
    //looping through all cards
    for (let i = 0; i < cards.length; i++) {
      if (brandSelect.value == "") {
        cards[i].style.display = "flex";
      } else if (brandSelect.value != cards[i].dataset.brand) {
        cards[i].style.display = "none";
      } else cards[i].style.display = "flex";
    }
  });

//mobile view of filter menu on cars page
const filterMobilebtn = document.querySelector(".cards-container__filter");
const filterMenu = document.querySelector(".filter-menu");
const mediaQuery = window.matchMedia("(max-width: 768px)");

filterMobilebtn &&
  filterMobilebtn.addEventListener("click", () => {
    if (mediaQuery.matches) {
      if (!open) {
        filterMenu.style.transform = "translateX(0)";
        filterMobilebtn.innerHTML = '<i class="fas fa-times"></i>';
        open = true;
      } else {
        filterMenu.style.transform = "translateX(-120%)";
        filterMobilebtn.innerHTML = '<i class="fas fa-filter"></i>';
        open = false;
      }
    }
  });

//
const contactForm = document.getElementById("contactForm");
const reservationForm = document.getElementById("reservationForm");
const contactSubmit = document.getElementById("contactSubmit");
const reservationSubmit = document.getElementById("reservationSubmit");
const carSelection = document.getElementById("car");
contactForm &&
  contactSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
  });

reservationForm &&
  reservationSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
  });

//rendering data for reservation form
const carselect = (data, item) => {
  const option = document.createElement("option");
  carSelection.appendChild(option);
  option.setAttribute("value", `${data[item].model}`);
  option.innerText = `${data[item].title}`;
};

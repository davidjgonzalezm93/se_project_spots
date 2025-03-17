const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const nameInput = document.querySelector("#modal__input-name");
const jobInput = document.querySelector("#modal__input-description");
const editFormElement = document.querySelector(".modal__form");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");

const profilePostButton = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const linkInput = document.querySelector("#modal__input-link");
const captionInput = document.querySelector("#modal__input-caption");
const postFormElement = document.querySelector("#new-post-modal .modal__form");

const cardTemplate = document.querySelector("#cardTemplate");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const modalImage = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");

const closeButtons = document.querySelectorAll(".modal__button-close");

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    if (modal) {
      closeModal(modal);
    }
  });
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);

  if (modal === previewModal) {
    setTimeout(() => {
      modalImage.src = "#";
    }, 300);
  }
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

profileEditButton.addEventListener("click", () => openModal(editProfileModal));
editFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
  closeModal(editProfileModal);
});

profilePostButton.addEventListener("click", () => openModal(newPostModal));
postFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValues = { name: captionInput.value, link: linkInput.value };
  if (!inputValues.name || !inputValues.link) {
    alert("Please fill in all fields.");
    return;
  }
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  postFormElement.reset();
  closeModal(newPostModal);
});

cardsList.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;

  if (event.target.classList.contains("card__image")) {
    const cardImage = card.querySelector(".card__image");
    const cardText = card.querySelector(".card__text");
    openModal(previewModal);
    modalImage.src = cardImage.src;
    modalImage.alt = cardImage.alt;
    modalCaption.textContent = cardText.textContent;
  }
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector(".card");

  const cardText = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete");

  cardText.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const likeButton = cardElement.querySelector(".card__like");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like_liked");
  });


  return cardElement;
}

import Card from '../scripts/Card.js';
import FormValidator from './FormValidator.js';

const popup = document.querySelector('#popup__profile');
const popupOpen = document.querySelector('.profile__edit');
const popupClose = document.querySelector('.popup__close')
const formProfile = document.querySelector('#popup__container_profile');
const nameInput = document.querySelector('.popup__input_about');
const jobInput = document.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__job');

const cards = document.querySelector('.cards');

const popupCard = document.querySelector('#popup__addCard');
const formCard = document.querySelector('#popup__container_place');
const cardAddBtn = document.querySelector('.profile__addbutton');
const closeCard = document.querySelector('#popup__close-place');
const cardNameInput = document.querySelector('#placeName');
const cardImageInput = document.querySelector('#placeLink');
const popupOpenImg = document.querySelector('#popup__preview');
const closePreview = document.querySelector('#closePreview');

const saveButton = formCard.querySelector('.popup__submit');

const settings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_visible'
}; 


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


function openPopup(popup) {   
  popup.classList.add('popup_type_open');
  document.addEventListener('keyup', handleEscUp);
};

function closePopup(popup) {
  popup.classList.remove('popup_type_open');
  document.addEventListener('keyup', handleEscUp);
};

function handleEscUp (evt) {
  evt.preventDefault(); 
  if (evt.which === 27) {
  const activePopup = document.querySelector('.popup_type_open'); 
  closePopup(activePopup);
  };
};

function submitFormProfile (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popup);
};

// Подготовка карточки с помощью создания экземпляра класса
function createNewCard(item){
  const card = new Card(item);
  const newCard = card.createCard();

  return newCard;
};

// Рендер из массива
initialCards.forEach((item) => {
  cards.append(createNewCard(item));
});

// Функция рендера для сабмита формы
function renderCardFromSubmit(item){
  cards.prepend(createNewCard(item));
}

function submitFormCard(){
  renderCardFromSubmit({name: cardNameInput.value, link: cardImageInput.value});
  closePopup(popupCard);
  formCard.reset();
  saveButton.classList.add('popup__submit_type_disabled');
  saveButton.disabled = true;
};

// Валидация двух полей
const checkValidationAddForm = new FormValidator (settings, formCard);
const checkValidationProfileForm = new FormValidator(settings, formProfile);

checkValidationAddForm.enableValidation();
checkValidationProfileForm.enableValidation();


popupOpen.addEventListener('click', () =>{
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popup);
});
popupClose.addEventListener('click', () =>{
  closePopup(popup);
});
cardAddBtn.addEventListener('click', () =>{
  openPopup(popupCard);
});
closeCard.addEventListener('click', () =>{
  closePopup(popupCard);
});
closePreview.addEventListener('click', () => {
  closePopup(popupOpenImg);
});

popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  };
});

popupCard.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupCard);
  };
});

popupOpenImg.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupOpenImg);
  };
});

formCard.addEventListener('submit', submitFormCard);
formProfile.addEventListener('submit', submitFormProfile);
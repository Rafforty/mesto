import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {profileEditBtn, formProfile, nameInput, jobInput, cardTemplate, formCard, cardAddBtn, cardNameInput, cardImageInput, settings, initialCards} from '../utils/constants.js';

const popupImage = new PopupWithImage('#popup__preview');
const popupProfile = new PopupWithForm('#popup__profile', handleProfileFormSubmit);
const userInfo = new UserInfo('.profile__name', '.profile__job');
const popupCards = new PopupWithForm('#popup__addCard', handleCardFormSubmit);

function createCard(item){
    const card = new Card(item, cardTemplate,  handleCardOpenFullscreen);
    const newCard = card.createCard(); 
    return newCard;
}

const initialCardsReverse = initialCards.reverse();
const renderSection = new Section({items: initialCardsReverse, renderer: (item) => {
  renderSection.addItem(createCard(item))
},},'.cards');


// Функция рендера для сабмита формы
function handleCardFormSubmit() { 
  renderSection.addItem(createCard({name: cardNameInput.value, link: cardImageInput.value}));
  popupCards.close();
}

// Открытие карточки на полный экран
function handleCardOpenFullscreen(link, name){
  popupImage.open(name, link);
}

function handleProfileFormSubmit() {
  userInfo.setUserInfo(nameInput, jobInput);
  popupProfile.close();
}

function openPopupProfile() {
  const user = userInfo.getUserInfo();
    nameInput.value = user.name;
    jobInput.value = user.job;
    popupProfile.open();
    validationProfileForm.resetValidation();
}

function openPopupCard() {
    popupCards.open();
    validationAddForm.resetValidation();
}

// Валидация двух полей
const validationAddForm = new FormValidator(settings, formCard);
const validationProfileForm = new FormValidator(settings, formProfile);

validationAddForm.enableValidation();
validationProfileForm.enableValidation();

renderSection.render();

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCards.setEventListeners();
profileEditBtn.addEventListener('click', openPopupProfile)
cardAddBtn.addEventListener('click', openPopupCard);

formCard.addEventListener('submit',  handleCardFormSubmit);
formProfile.addEventListener('submit', handleProfileFormSubmit);
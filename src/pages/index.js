import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {profileEditBtn, formProfile, nameInput, aboutInput, cardTemplate, formCard, cardAddBtn, settings,avatarOpenBtn,avatarForm} from '../utils/constants.js';
import Api from '../components/Api';
import PopupWithSubmit from '../components/PopupWithSubmit';



const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "9cbb09e5-6955-45ea-8fce-38196f70a374",
    "Content-type": "application/json"
  },
});

const popupImage = new PopupWithImage('#popup__preview');
popupImage.setEventListeners();

const popupDeleteConfirm = new PopupWithSubmit('#popup__deleteCard');
popupDeleteConfirm.setEventListeners();



function createNewCard(data){
  const card = new Card({
    data, userId,
    handleCardOpenFullscreen: (link, name) => {
      popupImage.open(name, link)
    },
    handleDeleteCard: (cardId) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.setAction(()=>{
        popupDeleteConfirm.renderLoading(true);
          api.deleteCard(cardId)
            .then((res)=>{
              popupDeleteConfirm.close()
              card.deleteCard(res)
            }).catch((error)=>{
              console.log(error)
            }).finally(()=>{
              popupDeleteConfirm.renderLoading(false);
            })
      })
    },
    handleLikeActive: (cardId) => {
      api.likeCard(cardId)
        .then((res)=>{
          card.toggleLikeStateAndCount(res);
        }).catch((error)=>{
          console.log(error);
        })
    },
    handleLikeNotActive: (cardId) => {
      api.deleteLike(cardId)
        .then((res)=>{
          card.toggleLikeStateAndCount(res);
        }).catch((error)=>{
          console.log(error)
        })
    }
  }, cardTemplate)
  const newCard = card.createCard();
  return newCard;
}

const renderSection = new Section({renderer: (item) => {
  const cards = createNewCard(item);
  renderSection.addItem(cards)
},},'.cards');



const userInfo = new UserInfo({name: '.profile__name',about: '.profile__about', avatar: '.profile__avatar'});

const popupProfile = new PopupWithForm('#popup__profile', handleProfileFormSubmit)
function handleProfileFormSubmit (data) {
  popupProfile.renderLoading(true);
  api.changeUser({
    name: data.name,
    about: data.about
  }).then((data)=>{
    userInfo.setUserInfo(data);
    popupProfile.close();
  }).catch((error)=>{
    console.log(error)
  }).finally(()=>{
    popupProfile.renderLoading(false);
  })
} 
popupProfile.setEventListeners();

function openPopupProfile(){
    const user = userInfo.getUserInfo();
    nameInput.value = user.name; 
    aboutInput.value = user.about; 
    popupProfile.open();
    validationProfileForm.resetValidation();
}
profileEditBtn.addEventListener('click', openPopupProfile);

const popupAvatar = new PopupWithForm('#popup__avatarEdit', handleAvatarFormSubmit)
function handleAvatarFormSubmit (data) {
  popupAvatar.renderLoading(true);
  api.changeAvatar(data)
    .then((data)=>{
    userInfo.setAvatar(data);
  }).then(()=>{
    popupAvatar.close();
  }).catch((error)=>{
    console.log(error)
  }).finally(()=>{
    popupAvatar.renderLoading(false)
  })
}
popupAvatar.setEventListeners();

function openPopupAvatar(){
  validationAvatarForm.resetValidation();
  popupAvatar.open();
}
avatarOpenBtn.addEventListener('click', openPopupAvatar);

const popupCards = new PopupWithForm('#popup__addCard', handleCardFormSubmit);
function handleCardFormSubmit (data){
  popupCards.renderLoading(true);
  api.addCard({
    name: data.name,
    link: data.link
  }).then((data)=>{
    const element = createNewCard(data);
    renderSection.addItem(element);
  }).then(()=>{
    popupCards.close();
  }).catch((error)=>{
    console.log(error)
  }).finally(()=>{
    popupCards.renderLoading(false)
  })
}
popupCards.setEventListeners();

function openPopupCard(){
  popupCards.open();
  validationAddForm.resetValidation();
}
cardAddBtn.addEventListener('click', openPopupCard);

let userId

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user,cards])=>{
    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);
    renderSection.render(cards);
  }).catch((error)=>{
    console.log(`Ошибка: ${error.status}`)
  })


const validationAddForm = new FormValidator(settings, formCard);
const validationProfileForm = new FormValidator(settings, formProfile);
const validationAvatarForm = new FormValidator(settings, avatarForm)

validationAddForm.enableValidation();
validationProfileForm.enableValidation();
validationAvatarForm.enableValidation();
const profileEditBtn = document.querySelector('.profile__edit');
const formProfile = document.querySelector('#popup__container_profile');
const nameInput = document.querySelector('.popup__input_name');
const aboutInput = document.querySelector('.popup__input_about');

const cardTemplate = document.querySelector('#cards-template').content;

const formCard = document.querySelector('#popup__container_place');
const cardAddBtn = document.querySelector('.profile__addbutton');
const avatarEditButton = document.querySelector('.profile__avatar_edit-button');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarOpenBtn = document.querySelector('.profile__avatar_edit-button');
const avatarForm = document.querySelector('#popup__container_avatar_edit');

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

    export {profileEditBtn,formProfile,nameInput,aboutInput,cardTemplate,formCard,cardAddBtn,settings,avatarEditButton,profileAvatar,avatarOpenBtn,avatarForm}
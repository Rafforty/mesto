const popup = document.querySelector('#popup__profile');
const popupOpen = document.querySelector('.profile__edit');
const popupClose = document.querySelector('.popup__close')
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_about');
const jobInput = document.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__job');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards-template').content;

const popupCard = document.querySelector('#popup__addCard');
const formCard = document.querySelector('#popup__container_place');
const cardAddBtn = document.querySelector('.profile__addbutton');
const closeCard = document.querySelector('#popup__close-place');
const cardNameInput = document.querySelector('#popup__input_name');
const cardImageInput = document.querySelector('#popup__input_image');
const popupOpenImg = document.querySelector('#popup__preview');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const closePreview = document.querySelector('#closePreview');



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
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};

function closePopup(popup) {
  popup.classList.remove('popup_type_open');
};

function submitFormProfile (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popup);
};

function togglePopupCard () {
  popupCard.classList.toggle('popup_type_open');
};

function renderCards(element) {
  const newCard = cardTemplate.querySelector('.cards__element').cloneNode(true);
  const cardName = newCard.querySelector('.cards__text');
  const cardImage = newCard.querySelector('.cards__image');
  const deleteBtn = newCard.querySelector('.cards__delete');
  const likeBtn = newCard.querySelector('.cards__like');
  const fullscreenCard = newCard.querySelector('.cards__image');

  cardName.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  deleteBtn.addEventListener('click', deleteCards);
  likeBtn.addEventListener('click',toggleLike);
  fullscreenCard.addEventListener('click', () => {
    popupImage.src = element.link;
    popupCaption.textContent = element.name;
    popupImage.alt = element.name;
    openPopup(popupOpenImg);
  })
 
  return newCard;
};
  
  function deleteCards (card){
    const deleteCardElement = card.target.closest('.cards__element');
    deleteCardElement.remove();
  }
  

  function toggleLike(evt) {
    evt.target.classList.toggle('cards__like_type_active');
  }


function submitFormCard(event) {
    event.preventDefault();
    const addCard = ({name: cardNameInput.value, link: cardImageInput.value});
    cards.prepend(renderCards(addCard));
    closePopup(popupCard);
    formCard.reset();
};

initialCards.forEach(function(el){
  cards.append(renderCards(el));
})

popupOpen.addEventListener('click', ()=>{
  openPopup(popup);
});
popupClose.addEventListener('click', ()=>{
  closePopup(popup);
});
cardAddBtn.addEventListener('click', ()=>{
  openPopup(popupCard);
});
closeCard.addEventListener('click', ()=>{
  closePopup(popupCard);
});
closePreview.addEventListener('click', ()=> {
  closePopup(popupOpenImg);
});

formCard.addEventListener('submit', submitFormCard);
formElement.addEventListener('submit', submitFormProfile);
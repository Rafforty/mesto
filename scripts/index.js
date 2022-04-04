const popupProfile = document.querySelector('#popup__profile');
const popupOpen = document.querySelector('.profile__edit');
const popupClose = document.querySelector('.popup__close')
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_about');
const jobInput = document.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__job');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards-template').content;

const popupCard = document.querySelector('#popup__addCard');
const formCard = document.querySelector('#popup__container_place');
const cardAddBtn = document.querySelector('.profile__addbutton');
const cardCloseBtn = document.querySelector('#popup__close-place');
const cardNameInput = document.querySelector('#placeName');
const cardImageInput = document.querySelector('#placeLink');
const popupOpenImg = document.querySelector('#popup__preview');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const previewCloseBtn = document.querySelector('#closePreview');

const cardSaveBtn = formCard.querySelector('.popup__submit');



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


function openPopup(popupProfile) {   
  popupProfile.classList.add('popup_type_open');
  document.addEventListener('keyup', handleEscUp);
};

function closePopup(popupProfile) {
  popupProfile.classList.remove('popup_type_open');
  document.removeEventListener('keyup', handleEscUp);
};

function handleEscUp (evt) {
  evt.preventDefault(); 
  if (evt.key === 'Escape') {
  const activePopup = document.querySelector('.popup_type_open'); 
  closePopup(activePopup);
  };
};

function submitFormProfile (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupProfile);
};


function renderCards(element) {
  const newCard = cardTemplate.querySelector('.cards__element').cloneNode(true);
  const cardName = newCard.querySelector('.cards__text');
  const cardImage = newCard.querySelector('.cards__image');
  const cardDeleteBtn = newCard.querySelector('.cards__delete');
  const cardLikeBtn = newCard.querySelector('.cards__like');
  const cardFullscreenPreview = newCard.querySelector('.cards__image');

  cardName.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardDeleteBtn.addEventListener('click', deleteCards);
  cardLikeBtn.addEventListener('click',toggleLike);
  cardFullscreenPreview.addEventListener('click', () => {
    popupImage.src = element.link;
    popupCaption.textContent = element.name;
    popupImage.alt = element.name;
    openPopup(popupOpenImg);
  })
 
  return newCard;
};
  
  function deleteCards (card){
    const cardElementDelete = card.target.closest('.cards__element');
    cardElementDelete.remove();
  }
  

  function toggleLike(evt) {
    evt.target.classList.toggle('cards__like_type_active');
  }


function submitFormCard(event) {
    event.preventDefault();
    const newCardAdd = ({name: cardNameInput.value, link: cardImageInput.value});
    cardsContainer.prepend(renderCards(newCardAdd));
    closePopup(popupCard);
    formCard.reset();
    cardSaveBtn.classList.add('popup__submit_type_disabled');
    cardSaveBtn.disabled = true;
};

initialCards.forEach(function(el){
  cardsContainer.append(renderCards(el));
})

popupOpen.addEventListener('click', ()=>{
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupProfile);
});

cardAddBtn.addEventListener('click', ()=>{
  openPopup(popupCard);
});

popupProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupProfile);
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
formElement.addEventListener('submit', submitFormProfile);
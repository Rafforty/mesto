const popup = document.querySelector('.popup');
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

function togglePopup () {   
  popup.classList.toggle('popup_type_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  togglePopup ();
};

function togglePopupCard () {
  popupCard.classList.toggle('popup_type_open');
};

function renderCards(element) {
  const newCard = cardTemplate.querySelector('.cards__element').cloneNode(true);
  const cardName = newCard.querySelector('.cards__text');
  const cardImage = newCard.querySelector('.cards__image');

  cardName.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  
  cards.prepend(newCard);

  const deleteBtn = newCard.querySelector('.cards__delete');
  function deleteCards (card){
    const deleteCardElement = card.target.closest('.cards__element');
    deleteCardElement.remove();
  }
  
  const likeBtn = newCard.querySelector('.cards__like');
  function toggleLike() {
    likeBtn.classList.toggle('cards__like_type_active');
  }

  const fullscreenCard = newCard.querySelector('.cards__image');
  const popupOpenImg = document.querySelector('#popup__preview');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  const closePreview = document.querySelector('#closePreview');

  function cardFullscreen() {
    popupImage.src = element.link;
    popupCaption.textContent = element.name;
    popupImage.alt = element.name;
    popupOpenImg.classList.add('popup_type_open');
  }

  
  deleteBtn.addEventListener('click', deleteCards);
  likeBtn.addEventListener('click',toggleLike);
  fullscreenCard.addEventListener('click', cardFullscreen);
  closePreview.addEventListener('click', function(){
    popupOpenImg.classList.remove('popup_type_open');
  });
};

function formSubmitCard(event) {
    event.preventDefault();
    renderCards({name: cardNameInput.value, link: cardImageInput.value});
    togglePopupCard();
    cardNameInput.value = '';
    cardImageInput.value = '';
};

initialCardsReverse = initialCards.reverse();
initialCardsReverse.forEach(renderCards);
  

formElement.addEventListener('submit', formSubmitHandler);
popupOpen.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);
cardAddBtn.addEventListener('click', togglePopupCard);
closeCard.addEventListener('click', togglePopupCard);
formCard.addEventListener('submit', formSubmitCard);


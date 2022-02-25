let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close')

function togglePopup (evt) {
    evt.preventDefault();
    
    popup.classList.toggle("popup__opened");
}

popupOpen.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-about');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__job');
    
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    togglePopup (evt);
}

formElement.addEventListener('submit', formSubmitHandler);
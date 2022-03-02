let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close')
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_about');
let jobInput = document.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__job');

function togglePopup () {   
    popup.classList.toggle("popup_type-open");
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    togglePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpen.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);
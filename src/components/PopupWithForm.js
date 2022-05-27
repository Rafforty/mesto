import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__container');
        this._popupInputList = this._popupForm.querySelectorAll('.popup__input');
        this._formButtonText = this._popupForm.querySelector('.popup__submit').textContent;
    } 

    _getInputValues() {
        this._inputValues = {};
        this._popupInputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', event => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }  

    renderLoading(isLoad){
        if(isLoad){
            this._popupForm.querySelector('.popup__submit').textContent = 'Сохранение...'
        } else {
            this._popupForm.querySelector('.popup__submit').textContent = this._formButtonText
        }
    }
}
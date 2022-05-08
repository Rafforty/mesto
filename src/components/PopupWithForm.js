import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__container');
        this._popupInputList = this._popupForm.querySelectorAll('.popup__input');
    }

    close() {
        super.close();
        this._popupForm.reset();
    }   

    _getInputValues = () => {
        this._inputValues = {};
        this._popupInputList.forEach(el => {
            this._inputValues[el.name] = el.value;
        })
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }
}
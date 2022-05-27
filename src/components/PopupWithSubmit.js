import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__container');
        this._formButtonText = this._popupForm.querySelector('.popup__submit').textContent;
    }

    setEventListeners(){
        super.setEventListeners()
        this._popupForm.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this.handleFormSubmit();
        })
    }

    setAction(action){
        this.handleFormSubmit = action;
    }

    renderLoading(isLoad){
        if(isLoad){
            this._popupForm.querySelector('.popup__submit').textContent = 'Удаление...'
        } else {
            this._popupForm.querySelector('.popup__submit').textContent = this._formButtonText
        }
    }
}
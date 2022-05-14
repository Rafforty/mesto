export default class Popup {
    constructor (popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_type_open');
        document.addEventListener('keyup',this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_type_open');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleClickClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickClose = (evt)  => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }
}
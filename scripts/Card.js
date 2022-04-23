export default class Card {
    constructor (data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate(){
        const cardElement = document.querySelector('#cards-template').content.cloneNode(true);

        return cardElement;
    }

    _setEventListeners = () => {
        this._element.querySelector('.cards__image').addEventListener('click', this._handleOpenPopup);
        this._element.querySelector('.cards__like').addEventListener('click', this._likeCard);
        this._element.querySelector('.cards__delete').addEventListener('click', this._removeCard);
    }

    _handleOpenPopup = () => {
        const popupImage = document.querySelector('.popup__image');
        const popupImagePreview = document.querySelector('#popup__preview');
        const popupCaption = document.querySelector('.popup__caption');
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
        popupImagePreview.classList.add('popup_type_open');
    }

    _likeCard(evt){
        evt.target.classList.toggle('cards__like_type_active');
    }

    _removeCard(evt){
        evt.target.closest('.cards__element').remove();
    }

    createCard(){
        this._element = this._getTemplate();
        this._setEventListeners();

        this._image = this._element.querySelector('.cards__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.cards__text').textContent = this._name;

        return this._element;
    }
}
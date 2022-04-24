export default class Card {
    constructor (data, cardSelector, handleCardOpenFullscreen) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardOpenFullscreen = handleCardOpenFullscreen;
    }

    _getTemplate = () => {
        const cardElement = this._cardSelector.querySelector('.cards__element').cloneNode(true);
        return  cardElement;
    }

    _setEventListeners = () => {
        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._handleCardOpenFullscreen(this._name, this._link)
        });
        this._element.querySelector('.cards__like').addEventListener('click', this._likeCard);
        this._element.querySelector('.cards__delete').addEventListener('click', this._removeCard);
    }

    _likeCard = (evt) => {
        evt.target.classList.toggle('cards__like_type_active');
    }

    _removeCard = (evt) => {
        evt.target.closest('.cards__element').remove();
    }

    createCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._image = this._element.querySelector('.cards__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.cards__text').textContent = this._name;

        return this._element;
    }
}
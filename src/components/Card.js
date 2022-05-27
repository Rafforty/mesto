export default class Card {
    constructor ({data, handleCardOpenFullscreen, handleLikeActive, handleDeleteCard, userId, handleLikeNotActive},cardTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
        this._handleCardOpenFullscreen = handleCardOpenFullscreen;
        this._handleLikeActive = handleLikeActive;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeNotActive = handleLikeNotActive;
        this._userId = userId;
        this._owner = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.cards__like');
        this._deleteButton = this._element.querySelector('.cards__delete');
        this._image = this._element.querySelector('.cards__image');
        this._likeCount = this._element.querySelector('.cards__like-count');
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.querySelector('.cards__element').cloneNode(true);
        return  cardElement;
    }

    _cardIsLiked(){
        return this._likes.some((like)=> like._id === this._userId);
    }

    _renderMyLikes(){
        if(this._cardIsLiked()){
            this._likeButton.classList.add('cards__like_type_active');
        } else {
            this._likeButton.classList.remove('cards__like_type_active');
        }
    }

    _renderDeleteIcon(){
        if (this._owner !== this._userId){
            this._deleteButton.remove();
        }
    }

    _setLikes(){
        if(this._cardIsLiked()){
            this._handleLikeNotActive(this._cardId);
        } else {
            this._handleLikeActive(this._cardId);
        }
    }

    toggleLikeStateAndCount(like){
        this._likes = like.likes;
        this._likeCount.textContent = this._likes.length;
        this._likeButton.classList.toggle('cards__like_type_active');
    }

    deleteCard(){
        this._element.remove();
    }

    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._handleCardOpenFullscreen(this._name, this._link)
        });
        this._likeButton.addEventListener('click', ()=> {
            this._setLikes();
        });
        this._deleteButton.addEventListener('click', ()=> {
            this._handleDeleteCard(this._cardId);
        });
    }

    createCard() {
        this._setEventListeners();
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.cards__text').textContent = this._name;
        this._likeCount.textContent = this._likes.length;
        this._renderDeleteIcon();
        this._renderMyLikes();

        return this._element;
    }
}
export default class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

    getInitialCards(){
        return fetch(`${this._url}/cards`,{
            method: 'GET',
            headers: this._headers
        }).then(this._checkIfResOk)
    }
    
    addCard(data){
        return fetch(`${this._url}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._checkIfResOk)
    }

    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`,{
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkIfResOk)
    }

    getUser(){
        return fetch(`${this._url}/users/me`,{
            method: 'GET',
            headers: this._headers
        }).then(this._checkIfResOk)
    }

    changeUser(data){
        return fetch(`${this._url}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkIfResOk)
    }

    changeAvatar(data){
        return fetch(`${this._url}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })
        }).then(this._checkIfResOk)
    }

    likeCard(id){
        return fetch(`${this._url}/cards/${id}/likes`,{
            method: 'PUT',
            headers: this._headers
        }).then(this._checkIfResOk)
    }

    deleteLike(id){
        return fetch(`${this._url}/cards/${id}/likes`,{
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkIfResOk)
    }

    _checkIfResOk(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}
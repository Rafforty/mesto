export default class UserInfo {
    constructor(userSelectors){
        this._name = document.querySelector(userSelectors.name);
        this._about = document.querySelector(userSelectors.about);
        this._avatar = document.querySelector(userSelectors.avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent, 
            about: this._about.textContent,
            avatar: this._avatar.src
        }
        
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }

    setAvatar(data){
        this._avatar.src = data.avatar;
    }
}
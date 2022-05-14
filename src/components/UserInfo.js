export default class UserInfo {
    constructor(userSelectors){
        this._name = document.querySelector(userSelectors.name);
        this._job = document.querySelector(userSelectors.job);
    }

    getUserInfo() {
        const userData = {
            name: this._name.textContent, 
            job: this._job.textContent,
        }
        return userData;
    }

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._job.textContent = userData.job;
    }
}
export default class Section {
    constructor ({renderer}, containerSelector){
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    render(items){
        items.forEach((element) => {
            this._renderer(element);
        });
    }

    addItem(el){
        this._containerSelector.prepend(el);
    }
}
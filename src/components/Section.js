export default class Section {
    constructor ({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    render = () => {
        this._items.forEach((element) => {
            this._renderer(element);
        });
    }

    addItem = (el) => {
        this._containerSelector.prepend(el);
    }
}
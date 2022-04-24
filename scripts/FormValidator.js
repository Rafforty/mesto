export default class FormValidator {
    constructor(settings, forms) {
      this._forms = forms;
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputList = Array.from(this._forms.querySelectorAll(this._inputSelector));
      this._createButton = this._forms.querySelector(this._submitButtonSelector);
    };

    _showInputError = (input, errorMessage) => {
        const formError = this._forms.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        formError.textContent = errorMessage;
        formError.classList.add(this._errorClass);
      };
    
    _hideInputError = (input) => {
        const formError = this._forms.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        formError.classList.remove(this._errorClass);
        formError.textContent = "";
    };
  
    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        };
    };

    _setEventListeners = () => {
        this._toggleButtonState();
    
        this._inputList.forEach((input) => {
          input.addEventListener("input", () => {
            this._checkInputValidity(input);
            this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
      this._forms.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    };

    resetValidation = () => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    }

    _hasInvalidField = () => {
      return this._inputList.some((input) => {
        return !input.validity.valid;
      });
    };

    _toggleButtonState = () => {
      if (this._hasInvalidField()) {
        this._createButton.classList.add(this._inactiveButtonClass);
        this._createButton.disabled = true;
      } else {
        this._createButton.classList.remove(this._inactiveButtonClass);
        this._createButton.disabled = false;
      };
    };
  };
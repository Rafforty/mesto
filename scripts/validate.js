const showInputError = (formElement, inputElement, errorMessage, element) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(element.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(element.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, element) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(element.inputErrorClass);
    errorElement.classList.remove(element.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, element) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, element);
    } else {
      hideInputError(formElement, inputElement, element);
    };
  };
  
  const setEventListeners = (formElement, element) => {
    const inputList = Array.from(formElement.querySelectorAll(element.inputSelector));
    const buttonElement = formElement.querySelector(element.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, element);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, element);
        toggleButtonState(inputList, buttonElement, element);
      });
    });
  };
  
  const enableValidation = (element) => {
    const formList = Array.from(document.querySelectorAll(element.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    setEventListeners(formElement, element);
  
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
  };
  
  const toggleButtonState = (inputList, buttonElement, element) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(element.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(element.inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };


  enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_visible'
  }); 
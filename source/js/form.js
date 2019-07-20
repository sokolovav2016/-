'use strict';

(function () {
  function editOrAddBook(book) {
    var titleElement = document.querySelector('.edit__title');
    var formElement = document.querySelector('.edit__form');

    var formSaveElement = formElement.querySelector('.button--save');
    var formCancelElement = formElement.querySelector('.button--cancel');

    var inputNameElement = formElement.querySelector('input[name="name"]');
    var inputAutorElement = formElement.querySelector('input[name="autor"]');
    var inputYearElement = formElement.querySelector('input[name="year"]');
    var inputImgElement = formElement.querySelector('input[name="address"]');

    var isBook = false;

    if (book) {
      var bookImgElement = book.querySelector('.book__img img');
      var bookNameElement = book.querySelector('.book__name');
      var bookAutorElement = book.querySelector('.book__autor');
      var bookYearElement = book.querySelector('.book__year');

      isBook = true;
    }

    function removeFormListeners() {
      formSaveElement.removeEventListener('click', onButtonSaveClick);
      formCancelElement.removeEventListener('click', onButtonCancelClick);
      document.removeEventListener('keydown', onDocumentEscPress);
      inputYearElement.removeEventListener('input', onYearInput);
    }

    function closeForm() {
      var bookshelfElement = document.querySelector('.books');
      var editFormElement = document.querySelector('.edit');

      formElement.reset();
      window.util.close(editFormElement);
      window.util.open(bookshelfElement);
      window.main.addBooksListeners();
      window.main.addNewBookListener();
      removeFormListeners();
    }

    function onFormSubmit(evt) {
      evt.preventDefault();
    }

    function onButtonSaveClick() {
      if (inputYearElement.value <= 2017 && isBook) {
        bookNameElement.textContent = inputNameElement.value;
        bookAutorElement.textContent = inputAutorElement.value;
        bookYearElement.textContent = inputYearElement.value;
        bookImgElement.src = inputImgElement.value;

        closeForm();
      } else if (inputYearElement.value <= 2017 && !isBook) {
        var booksContainerElement = document.querySelector('.books__list');
        var bookTemplateElement = document.querySelector('#book')
          .content
          .querySelector('.book');
        var newBookElement = bookTemplateElement.cloneNode(true);

        // console.log(newBookElement.querySelector('.book__img img').src);
        // console.log(inputImgElement.value);
        newBookElement.querySelector('.book__img img').src = inputImgElement.value;
        // console.log(newBookElement.querySelector('.book__img img').src);
        // console.log(inputImgElement.value);
        
        
        newBookElement.querySelector('.book__name').textContent = inputNameElement.value;
        newBookElement.querySelector('.book__autor').textContent = inputAutorElement.value;
        newBookElement.querySelector('.book__year').textContent = inputYearElement.value;

        booksContainerElement.appendChild(newBookElement);

        closeForm();
      }
    }

    function onButtonCancelClick() {
      closeForm();
    }

    function onDocumentEscPress(evt) {
      window.util.isEscEvent(evt, closeForm);
    }

    function onYearInput() {
      if (inputYearElement.value > 2017) {
        inputYearElement.setCustomValidity('Год выпуска (число, не больше 2017)');
      } else {
        inputYearElement.setCustomValidity('');
      }
    }

    function addFormListeners() {
      formElement.addEventListener('submit', onFormSubmit);
      formSaveElement.addEventListener('click', onButtonSaveClick);
      formCancelElement.addEventListener('click', onButtonCancelClick);
      document.addEventListener('keydown', onDocumentEscPress);
      inputYearElement.addEventListener('input', onYearInput);
    }

    if (isBook) {
      titleElement.textContent = 'Редактирование книги';

      inputNameElement.value = bookNameElement.textContent;
      inputAutorElement.value = bookAutorElement.textContent;
      inputYearElement.value = bookYearElement.textContent;

      // console.log('bookImgElement.src: ' + bookImgElement.src);
      // console.log('inputImgElement.value: ' + inputImgElement.value);
      inputImgElement.value = bookImgElement.src;
      // console.log('bookImgElement.src: ' + bookImgElement.src);
      // console.log('inputImgElement.value: ' + inputImgElement.value);
    } else {
      titleElement.textContent = 'Добавление книги';
    }

    addFormListeners();
  }

  window.form = {
    init: editOrAddBook
  };
})();
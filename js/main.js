'use strict';

(function () {
  var bookshelfElement = document.querySelector('.books');
  var editFormElement = document.querySelector('.edit');
  
  var bookElements = document.querySelector('.books__list').children;
  var newBookButtonElement = document.querySelector('.page-header__button');

  function removeBookClickListener(book) {
    book.removeEventListener('click', onBookClick);
  }

  function removeBooksClickListeners() {
    for (var i = 0; i < bookElements.length; i++) {
      var book = bookElements[i];
      removeBookClickListener(book);
    }
  }

  function removeNewBookClickListener() {
    newBookButtonElement.removeEventListener('click', onNewBookButtonClick);
  }

  function onBookClick(evt) {
    var book = evt.currentTarget;

    if (evt.target.classList.contains('book__button--edit')) {
      window.util.close(bookshelfElement);
      window.util.open(editFormElement);
      window.form.init(book);
      removeBooksClickListeners();
      removeNewBookClickListener();
      newBookButtonElement.setAttribute('disabled', 'disabled');
    } else if (evt.target.classList.contains('book__button--del')) {
      book.remove();
    }
  }

  function addBookClickListener(book) {
    book.addEventListener('click', onBookClick);
  }

  function addBooksClickListeners() {
    for (var i = 0; i < bookElements.length; i++) {
      var book = bookElements[i];
      addBookClickListener(book);
    }
  }

  function onNewBookButtonClick() {
    window.util.close(bookshelfElement);
    window.util.open(editFormElement);
    window.form.init();
    removeBooksClickListeners();
    removeNewBookClickListener();
    newBookButtonElement.setAttribute('disabled', 'disabled');
  }

  function addNewBookClickListener() {
    newBookButtonElement.addEventListener('click', onNewBookButtonClick);
    newBookButtonElement.removeAttribute('disabled');
  }

  window.main = {
    addBooksListeners: addBooksClickListeners,
    addNewBookListener: addNewBookClickListener
  };
})();
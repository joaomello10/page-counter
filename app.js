const svg = document.querySelector(".svg");
const bookTitle = document.querySelector(".book-title");
const numberOfPages = document.querySelector(".number-of-pages");
const addBookButton = document.querySelector(".add-book");
const booksUl = document.querySelector(".books");
const getLocalStorage = JSON.parse(localStorage.getItem("books"));

let books = getLocalStorage !== null ? getLocalStorage : [];
addBooks();

addBookButton.addEventListener("click", createBook);

function createBook(e) {
  e.preventDefault();
  if (bookTitle.value.trim() == "" || numberOfPages.value.trim() == "") {
    return;
  }

  const book = {
    title: bookTitle.value,
    numberOfPages: numberOfPages.value,
    id: generateId(),
  };

  modalFunction(false);

  books.push(book);
  setLocalStorage();
  addBooks();

  bookTitle.value = "";
  numberOfPages.value = "";
}

function addBooks() {
  booksUl.innerHTML = "";
  books.forEach((book) => {
    const li = document.createElement("li");
    li.classList.add("book");
    li.innerHTML = `
    <p class='title'>${book.title}</p>
    `;

    const div = document.createElement("div");
    div.classList.add("buttons");

    const p = document.createElement("p");
    p.textContent = book.numberOfPages;

    const minus = document.createElement("button");
    minus.classList.add("minus");
    minus.textContent = "-";
    minus.addEventListener("click", () => {
      if (book.numberOfPages == 0) {
        return;
      }
      book.numberOfPages--;
      p.textContent = book.numberOfPages;
      setLocalStorage();
    });

    const plus = document.createElement("button");
    plus.classList.add("plus");
    plus.textContent = "+";
    plus.addEventListener("click", () => {
      book.numberOfPages++;
      p.textContent = book.numberOfPages;
      setLocalStorage();
    });

    div.appendChild(minus);
    div.appendChild(p);
    div.appendChild(plus);
    div.appendChild(createRemoveButton(book.id, li));
    li.appendChild(div);
    booksUl.appendChild(li);
  });
}

function createRemoveButton(ID, element) {
  const remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = '<i class="fas fa-trash-alt"></i>';

  remove.addEventListener("click", () => {
    books = books.filter((book) => book.id !== ID);
    element.classList.add("remove-book");

    setTimeout(() => {
      addBooks();
      setLocalStorage();
    }, 500);
  });

  return remove;
}

function setLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function generateId() {
  return Math.round(Math.random() * 1000);
}

function modalFunction(param) {
  const modal = document.querySelector(".modal-container");
  if (param) {
    modal.classList.add("active");
  } else {
    bookTitle.value = "";
    numberOfPages.value = "";
    modal.classList.remove("active");
  }
}

svg.addEventListener("click", () => {
  svg.src = "img/auto_stories_white_24dp.svg";
  setTimeout(() => {
    svg.src = "img/import_contacts_white_24dp.svg";
  }, 300);
});

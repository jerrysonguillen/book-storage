const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clear");
const booksForm = document.getElementById("books-form");
const booksTable = document.querySelector("#books-table > tbody");
const editCancel = document.querySelector("#editCancel");
const updateBtn = document.querySelector("#update");
let isbn = document.querySelector('input[name="isbn"]');
let title = document.querySelector('input[name="title"]');
let author = document.querySelector('input[name="author"]');
let year = document.querySelector('input[name="year"]');
let books = [];

const addBook = (book) => {
  let tr = document.createElement("tr");
  let tdIsbn = document.createElement("td");
  let tdTitle = document.createElement("td");
  let tdAuthor = document.createElement("td");
  let tYear = document.createElement("td");
  let tAction = document.createElement("td");
  let buttonEdit = document.createElement("button");
  let buttonDelete = document.createElement("button");
  buttonEdit.className = "btn btn-warning edit";
  buttonEdit.setAttribute("style", "margin-bottom: 0; margin-left: 0");
  buttonEdit.appendChild(document.createTextNode("Edit"));

  buttonDelete.className = "btn btn-danger delete";
  buttonDelete.setAttribute("style", "margin-bottom: 0; margin-left: 0");
  buttonDelete.appendChild(document.createTextNode("Delete"));

  tdIsbn.appendChild(document.createTextNode(book.isbn));
  tdTitle.appendChild(document.createTextNode(book.title));
  tdAuthor.appendChild(document.createTextNode(book.author));
  tYear.appendChild(document.createTextNode(book.year));
  tr.setAttribute("data-isbn", book.isbn);
  tr.appendChild(tdIsbn);
  tr.appendChild(tdTitle);
  tr.appendChild(tdAuthor);
  tr.appendChild(tYear);
  tAction.append(buttonEdit);
  tAction.append(buttonDelete);
  tr.appendChild(tAction);

  booksTable.appendChild(tr);
  books.push(book);
  console.log(books);
};

clearBtn.addEventListener("click", () => {
  booksForm.reset();
});

// addBook({
//   isbn: "A3",
//   title: "eloquent javascript 3RD edition",
//   author: "Marijn Haverbeke",
//   year: 2019,
// });

booksForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(e.target);
});

addBtn.addEventListener("click", function () {
  if (
    isbn.value.trim() &&
    title.value.trim() &&
    author.value.trim() &&
    year.value.trim()
  ) {
    let book = {
      isbn: isbn.value.trim(),
      title: title.value.trim(),
      author: author.value.trim(),
      year: year.value.trim(),
    };
    addBook(book);
  } else {
    alert("all field must not be empty");
  }
});

booksTable.addEventListener("click", (e) => {
  if (e.target.className.includes("delete")) {
    //alert(e.target.parentNode.parentNode.dataset.isbn);
    if(confirm('are you sure you want to delete?')){
      e.target.parentNode.parentNode.remove();
    }
  }
  if (e.target.className.includes("edit")) {
    addBtn.setAttribute("disabled", "");
    isbn.disabled = true;
    const origIsbn = e.target.parentNode.parentNode.getAttribute("data-isbn");
    let book = books.find((el) => el["isbn"] == origIsbn);
    console.log(book);
    isbn.value = book.isbn;
    title.value = book.title;
    author.value = book.author;
    year.value = book.year;
  }
});

editCancel.addEventListener("click", () => {
  addBtn.removeAttribute("disabled");
  booksForm.reset();
  isbn.disabled = false;
});

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let originalIsbn = isbn.value;
  let book = books.find((el) => el["isbn"] == originalIsbn);
  let tdIsbn = document.querySelectorAll(`[data-isbn=${originalIsbn}] > td`)[0];
  let tdTitle = document.querySelectorAll(
    `[data-isbn=${originalIsbn}] > td`
  )[1];
  let tdAuthor = document.querySelectorAll(
    `[data-isbn=${originalIsbn}] > td`
  )[2];
  let tdYear = document.querySelectorAll(`[data-isbn=${originalIsbn}] > td`)[3];
  if (
    isbn.value.trim() &&
    title.value.trim() &&
    author.value.trim() &&
    year.value.trim()
  ) {
    tdTitle.innerHTML = title.value.trim();
    tdAuthor.innerHTML = author.value.trim();
    tdYear.innerHTML = year.value.trim();
    (book["title"] = title.value.trim()),
      (book["author"] = author.value.trim());
    book["year"] = year.value.trim();
  } else {
    alert("all field must not be empty");
  }
  console.log(tdTitle);
});

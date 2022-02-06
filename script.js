"use strict";
// query selectors and initialization of variables
const library = [];
const list = document.getElementById("libraryList");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const submit = document.getElementById("submit");
const modal = document.getElementById("modal");
const close = document.querySelector(".close");
const btn = document.getElementById("btn");



// const modalCheckbox = document.getElementById("modalCheckbox");
// book consructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // store info into a new Book object
  const book = new Book(title, author, pages, read);
  // push new Book object onto library array
  library.push(book);
  updateList();
}

function updateList() {
  // iterate over list and add li tags

  for (let i = library.length - 1; i < library.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("data-index", `${library.length - 1}`);
    list.appendChild(li);

    // grab book info and update DOM with book title, author, # of pages, etc.
    let current = library[i];
    li.classList.add("bookCard");

    if (current.read === false) {
      li.innerHTML = `
      <i class="fas fa-trash-alt delete"></i>
      <h2 class="title">${current.title}</h2>
      <p class="author">${current.author}</p>
      <p class="pages">${current.pages}</p>
      <div class="isRead-container">
        <span class="readText">Read</span>
        <input type="checkbox" name="readBox" class="readBox" />
      </div>`;
    } else {
      li.innerHTML = `
      <i class="fas fa-trash-alt delete"></i>
      <h2 class="title">${current.title}</h2>
      <p class="author">${current.author}</p>
      <p class="pages">${current.pages}</p>
      <div class="isRead-container">
        <span class="readText">Read</span>
        <input type="checkbox" name="readBox" class="readBox" checked/>
      </div>`;
    }
  }
}

addBookToLibrary("The Hobbit", "Tolkien", 256, true);

// event listeners
submit.addEventListener("click", () => {
  if (title.value === "" || author.value === "" || pages.value === "") {
    alert("Please fill in all of the required information"); // alert for now, to update later
  } else {
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    modal.style.display = "none";
  }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

close.addEventListener("click", () => {
  modal.style.display = "none";
});

// open up modal to take in book info
btn.addEventListener("click", () => {
  modal.style.display = "block";
});

// update read attribute in library on click
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('readBox')) {
    // do stuff
    let position = e.target.parentNode.parentNode.dataset.index;
    library[position].read = e.target.checked;
  }
  if (e.target.classList.contains('delete')) {
    let position = e.target.parentNode.parentNode.dataset.index;
    library.splice(position, 1);
  }
})
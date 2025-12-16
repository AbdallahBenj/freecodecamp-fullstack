console.log('Bookmark Manager');

const categoryDropdown = document.getElementById('category-dropdown');
const viewCategoryBtn = document.getElementById('view-category-button');
const addBookmarkBtn = document.getElementById('add-bookmark-button');

const addBookmarkBtnForm = document.getElementById('add-bookmark-button-form');
const closeFormBtn = document.getElementById('close-form-button');
const nameInput = document.getElementById('name');
const urlInput = document.getElementById('url');

const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const formTitle = document.querySelector('#form-section h2');
const categoryName = document.querySelector('#bookmark-list-section h2');

const bookmarkListSection = document.getElementById('bookmark-list-section');
const categoryList = document.getElementById('category-list');
const closeListBtn = document.getElementById('close-list-button');
const deleteBookmarkBtn = document.getElementById('delete-bookmark-button');

// 1 - 2 Get Bookmarks in localStorage

const getBookmarks = () => {
  try {
    const data = localStorage.getItem('bookmarks');
    if (!data) return [];

    const bookmarks = JSON.parse(data);
    if (!Array.isArray(bookmarks)) return [];

    const isValidObj = bookmarks.every(
      (obj) =>
        typeof obj === 'object' &&
        obj != null &&
        'name' in obj &&
        'category' in obj &&
        'url' in obj,
    );

    if (!isValidObj) return [];

    console.log('bookmarks: ', bookmarks);
    return bookmarks;
  } catch (error) {
    console.error('error name: ', error);
    console.error('error message: ', error.message);
    return [];
  }
};

// 3 Display Or Close Form
const displayOrCloseForm = () => {
  formSection.classList.toggle('hidden');
  mainSection.classList.toggle('hidden');
};

// 4 Add Bookmark Button
addBookmarkBtn.addEventListener('click', () => {
  displayOrCloseForm();
  formTitle.innerText = categoryDropdown.value;
  console.log('Add Bookmarks Btn Clicked');
});

// 5 Go Back Button
closeFormBtn.addEventListener('click', () => {
  displayOrCloseForm();
  console.log('Add Close Form Btn Clicked');
});

// 6 Add Bookmark Button Form
addBookmarkBtnForm.addEventListener('click', () => {
  addBookmarkForm();
  displayOrCloseForm();
  console.log('Add Bookmarks Btn Form Clicked');
});

const addBookmarkForm = () => {
  let bookmarks = getBookmarks();
  let newBookmark = {
    name: nameInput.value.trim(),
    category: categoryDropdown.value,
    url: urlInput.value.trim(),
  };
  console.log('categoryDropdown value: ', categoryDropdown.value);
  bookmarks.push(newBookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  nameInput.value = '';
  urlInput.value = '';
  console.log('New Bookmark: ', newBookmark);
};

// 8 Display Or Hide Category
const displayOrHideCategory = () => {
  mainSection.classList.toggle('hidden');
  bookmarkListSection.classList.toggle('hidden');
};

// 9 View Category Button
viewCategoryBtn.addEventListener('click', () => {
  displayOrHideCategory();
  getSelectedCategoryList();
  categoryName.innerText = categoryDropdown.value;

  console.log('View Category Btn Clicked');
});

// Get Selected Category List
const getSelectedCategoryList = () => {
  let bookmarks = getBookmarks();
  let selectedCategoryList = bookmarks.filter(
    (obj) => obj?.category == categoryDropdown.value,
  );

  if (selectedCategoryList.length === 0) {
    categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
  } else {
    let result = '';
    selectedCategoryList.forEach((obj) => {
      result += `<label for="${obj.name.trim().replace(/\s+/g, '-').toLowerCase()}"><a href="${obj.url.trim()}">${obj.name.trim()}</a></label><input type="radio" name="same-category"
                        value="${obj.name.trim()}" id="${obj.name.trim().replace(/\s+/g, '-').toLowerCase()}">\n`;
    });
    categoryList.innerHTML = result;
  }
  return selectedCategoryList;
};

// 13 Close List / Go Back Button
closeListBtn.addEventListener('click', () => {
  displayOrHideCategory();
  console.log('Close List Button Clicked');
});

// 14 Delete Bookmark Button
deleteBookmarkBtn.addEventListener('click', () => {
  const bookmarks = getBookmarks();
  const inputChecked = document.querySelector('#category-list input:checked');

  if (!inputChecked) {
    console.log('No Input to Delete');
    return;
  }

  const bookmarkToDeleteIndex = bookmarks.findIndex(
    (obj) =>
      obj.name === inputChecked.value &&
      obj.category === categoryDropdown.value,
  );
  bookmarks.splice(bookmarkToDeleteIndex, 1);
  console.log('bookmarkToDeleteIndex: ', bookmarkToDeleteIndex);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  getSelectedCategoryList();
  console.log('delete Bookmark Button Clicked');
});

//   localStorage.clear();

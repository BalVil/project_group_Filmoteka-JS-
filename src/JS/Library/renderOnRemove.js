import { paginationProperties } from '../pagePagination';
import buttonColorChange from '../changeButtonColor';
import libraryAfterDel from './libraryAfterDel';
import { saveStorage } from '../localStorage';

const headerLibrary = document.querySelector('.header-library');

export default function renderOnRemove(
  item,
  currentBtn,
  fn,
  localStoragePlace
) {
  if (
    !headerLibrary.classList.contains('is-hidden') &&
    currentBtn.classList.contains('currentbtn')
  ) {
    let page = paginationProperties.page;
    const getLocalStorgeObj = JSON.parse(localStorage.getItem(item));

    if (getLocalStorgeObj.length === localStoragePlace.length) {
      if (
        JSON.stringify(localStoragePlace) == JSON.stringify(getLocalStorgeObj)
      ) {
        return;
      } else {
        saveStorage(item, localStoragePlace);
        return;
      }
    }

    const libraryArraySlice = [];
    for (let i = 0; i < getLocalStorgeObj.length; i += 9) {
      const chunk = getLocalStorgeObj.slice(i, i + 9);
      libraryArraySlice.push(chunk);
    }

    if (
      libraryArraySlice.toString() ===
      paginationProperties.libraryArr.toString()
    ) {
      return;
    } else if (getLocalStorgeObj.length <= 9) {
      fn();
    } else {
      libraryAfterDel(libraryArraySlice, page);
    }
    buttonColorChange.CallButtonColorChange();
  }
}

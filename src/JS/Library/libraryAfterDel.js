import { notiflixLoading, notiflixLoadingRemove } from '../loading';
import { libraryFilmCardRender } from '../btnWatchedQueue';
import { initPagination, paginationProperties } from '../pagePagination';
import FilmApiService from '../filmApiService';
import buttonColorChange from '../changeButtonColor';
const filmApiService = new FilmApiService();

const filmList = document.querySelector('.films-list');

export default async function rerenderLibraryAfterDelete(
  libraryArraySlice,
  page
) {
  notiflixLoading();
  const libraryArrayRender = [];

  if (libraryArraySlice[page - 1] === undefined) {
    page -= 1;
  }

  for (let id of libraryArraySlice[page - 1]) {
    filmApiService.ID = id;
    const resolve = await filmApiService.fetchMovieID();
    const filmArray = resolve.data;
    libraryArrayRender.push(filmArray);
  }
  paginationProperties.page = page;
  paginationProperties.totalPages = libraryArraySlice.length;
  paginationProperties.libraryArr = libraryArraySlice;

  filmList.innerHTML = libraryFilmCardRender(libraryArrayRender);
  initPagination(paginationProperties);
  notiflixLoadingRemove();
  buttonColorChange.CallButtonColorChange();
}

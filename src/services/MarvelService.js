import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, process, clearError, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=03078c87b89efcfc8f06a9001621bd51";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(transformChar);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return transformChar(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

    return res.data.results.map(transformChar);
  };


  const transformChar = (char) => {
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 300)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(transformComic);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

    return transformComic(res.data.results[0]);
  };

  const transformComic = (comic) => {
    return {
      id: comic.id,
      name: comic.title,
      price: comic.prices[0].price ? `${comic.prices[0].price}$` : "not available",
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
      descr: comic.description || "There is no description",
      pages: comic.pageCount
        ? `${comic.pageCount} pages`
        : "No information about the number of pages",
      language: comic.textObjects.language || "en-us",
    };
  };

  return {
    process,
    clearError,
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    getAllComics,
    getComic,
    setProcess
  };
};

export default useMarvelService;

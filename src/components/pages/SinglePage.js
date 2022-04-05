import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, pageType }) => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const { process, clearError, getComic, getCharacter, setProcess } = useMarvelService();

  const onDataLoader = (elem) => {
    setData(elem);
  };

  const DataUpdate = () => {
    clearError();

    switch (pageType) {
      case "character":
        getCharacter(id).then(onDataLoader).then(() => setProcess('confirmed'));
        break;
      case "comic":
        getComic(id).then(onDataLoader).then(() => setProcess('confirmed'));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    DataUpdate();
  }, [id]);


  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};


export default SinglePage;

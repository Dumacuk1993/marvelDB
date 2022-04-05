import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="All comics list" />
        <title>Comics Pages</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default ComicsPage;

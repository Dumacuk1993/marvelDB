import { Link } from "react-router-dom";
import "../singleComicLayout/SingleComicLayout.scss";
import { Helmet } from "react-helmet";

const SingleComicLayout = ({ data }) => {
  const { name, descr, pages, thumbnail, price, language } = data;

  return (
    <>
      <div className="single-comic">
        <Helmet>
          <meta name="description" content={name} />
          <title>{name}</title>
        </Helmet>
        <img src={thumbnail} alt="x-men" className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{descr}</p>
          <p className="single-comic__descr">{pages}</p>
          <p className="single-comic__descr">Language: {language}</p>
          <div className="single-comic__price">{price}</div>
        </div>
        <Link to="/comics" className="single-comic__back">
          Back to all
        </Link>
      </div>
    </>
  );
};

export default SingleComicLayout;

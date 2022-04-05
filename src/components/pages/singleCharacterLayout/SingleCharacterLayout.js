import React from "react";
import "../singleCharacterLayout/SingleCharacterLayout.scss";
import { Helmet } from "react-helmet";

const SingleCharacterLayout = ({ data }) => {
  const { thumbnail, name, description } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={name} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
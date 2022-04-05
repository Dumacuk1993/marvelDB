/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./charInfo.scss";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";


const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { process, getCharacter, setProcess } = useMarvelService();

  const onCharLoader = (char) => {
    setChar(char);
  };

  const charUpdate = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    getCharacter(charId).then(onCharLoader).then(() => setProcess('confirmed'));
  };

  useEffect(() => {
    charUpdate();
  }, [props.charId]);


  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
};

const View = ({ data }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = data;

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          style={
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? { objectFit: "contain" }
              : null
          }
          alt={name}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((comic, i) => {
          if (i < 10) {
            return (
              <li key={i} className="char__comics-item">
                {comic.name}
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;

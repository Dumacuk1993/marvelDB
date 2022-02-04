import { Component } from "react";
import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import MarvelService from "../../services/MarvelService";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onCharLoader = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  charUpdate = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoader)
      .catch(this.onError);
  };

  componentDidMount() {
    this.charUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.charUpdate();
    }
  }

  render() {
    console.log(this.state.char, this.props.charId);
    const { loading, error, char } = this.state;

    const skeleton = loading || error || char ? null : <Skeleton />;
    const load = loading ? <Loading /> : null;
    const err = error ? <Error /> : null;
    const view = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {load}
        {err}
        {view}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = char;

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

export default CharInfo;

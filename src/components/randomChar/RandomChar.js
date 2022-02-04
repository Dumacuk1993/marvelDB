import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Loading from "../loading/Loading";
import Error from "../error/Error";

class RandomChar extends Component {

    
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.getRandomChar();
    // this.interval = setInterval(() => {
    //     this.getRandomChar();
    // }, 10000);
  }

  // componentWillUnmount() {
  //     clearInterval(this.interval)
  // }
    
  onCharLoading = () => {
    this.setState({
      loading: true,
    });    
  }

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

  getRandomChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading()
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoader)
      .catch(this.onError);
  };

  render() {
    const { loading, error, char } = this.state;
    
    const load = loading ? <Loading /> : null;
    const err = error ? <Error /> : null;
    const view = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {load}
        {err}
        {view}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.getRandomChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = (props) => {
  const { name, description, thumbnail, homepage, wiki } = props.char;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        style={
          thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: "contain" }
            : null
        }
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import Char from "../char/Char";
import Loading from "../loading/Loading";
import Error from "../error/Error";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.getAllChar();
  }

  onCharsLoading = () => {
    this.setState({
      loading: true,
    });    
  }

  onCharsLoader = (chars) => {
    this.setState({
      chars,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  getAllChar = () => {
    this.onCharsLoading()
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoader)
      .catch(this.onError);
  };

    render() {
      
      const { chars, loading, error, } = this.state
      
      const load = loading ? <Loading /> : null;
      const err = error ? <Error /> : null;

    return (
      <div className="char__list">
          {load}
          {err}
        <ul className="char__grid">

          {chars.map(char => ( 
            <Char key={char.id} onCharSelected={this.props.onCharSelected} char={char} />
          ))}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

import { Component } from "react";

class Char extends Component {
  state = {
    activeClass: false,
  };
  //   toggleActiveClass = () => {
  //       this.setState({
  //           activeClass: !this.state.activeClass
  //       })
  // }

  render() {
    const { thumbnail, name, id } = this.props.char;

    return (
      <li
        className={
          this.state.activeClass
            ? "char__item char__item_selected"
            : "char__item"
        }
        onClick={() => this.props.onCharSelected(id)}
      >
        <img
          src={thumbnail}
          style={
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? { objectFit: "unset" }
              : null
          }
          alt={name}
        />
        <div className="char__name">{name}</div>
      </li>
    );
  }
}

export default Char;

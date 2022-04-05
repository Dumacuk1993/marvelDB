import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import Error from "../error/Error";
import { Link } from "react-router-dom";
import "./CharSearchForm.scss";
import useMarvelService from "../../services/MarvelService";

const CharSearchForm = () => {
  const [char, setChar] = useState();
  const { loading, error, clearError, getCharacterByName } = useMarvelService();

  const onCharLoader = (char) => {
    setChar(char);
  };

  const charUpdate = (name) => {
    clearError();

    getCharacterByName(name).then(onCharLoader);
  };

  const errorMessage = error ? (
    <div className="char__search-critical-error">
      <Error />
    </div>
  ) : null;

  const result = !char ? null : char.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/characters/${char[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{ charName: "" }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          charUpdate(charName);
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName"></label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              type="name"
              name="charName"
              placeholder="Enter name"
            />
            <button
              className="button button__main"
              type="submit"
              disabled={loading}
            >
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage
            name="charName"
            className="char__search-error"
            component="div"
          />
        </Form>
      </Formik>
      {result}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Loading from "../loading/Loading";
import SingleCharacterLayout from "../pages/singleCharacterLayout/SingleCharacterLayout";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SinglePage from "../pages/SinglePage";

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
// const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
// const SinglCharacterPage = lazy(() => import('../pages/singlCharacterPage/SinglCharacterPage.js'));

const App = () => {
  return (
    <div className="app">
      <Router>
        <AppHeader />
        <main>
          <Suspense fallback={<Loading/>}>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/comics">
                <ComicsPage />
              </Route>
              <Route exact path="/comics/:id">
                <SinglePage Component={SingleComicLayout} pageType='comic'/>
              </Route>
              <Route exact path="/characters/:id">
                <SinglePage Component={SingleCharacterLayout} pageType='character'/>
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </Router>
    </div>
  );
};

export default App;

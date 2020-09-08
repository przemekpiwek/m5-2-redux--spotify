import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { ArtistRoute } from "../ArtistRoute/ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import { useDispatch } from "react-redux";

const GlobalStyle = createGlobalStyle`
html,
body,
div,
span {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: Montserrat, sans-serif;
}
`;

const DEFAULT_ARTIST_ID = "053q0ukIDRgzwTr4vNSwab";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        dispatch(requestAccessToken());
        const response = await fetch("/spotify_access_token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        dispatch(receiveAccessToken(data.access_token));
      } catch (err) {
        console.log(err);
        dispatch(receiveAccessTokenError());
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/artists/:id">
            <ArtistRoute />
          </Route>
          <Route path="/">Blah</Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </Router>
    </>
  );
};

export default App;

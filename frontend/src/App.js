import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Auth from "./components/Auth/Auth";
import AuthenticatedRoute from "./components/Auth/AuthenticatedRoute";
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Switch>
          <AuthenticatedRoute path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;

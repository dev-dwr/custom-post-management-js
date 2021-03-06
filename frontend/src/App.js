import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Auth from "./components/Auth/Auth";
//import AuthenticatedRoute from "./components/Auth/AuthenticatedRoute";
import PostDetails from "./components/PostDetails/PostDetails";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts"/>} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home}/>
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts"/>)}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;

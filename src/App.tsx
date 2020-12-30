import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from "react-router-dom";
import NavBarContainer from "./containers/NavBarContainer";
import Home from "./components/Home";
import FooterContainer from "./containers/FooterContainer";
import NewUserForm from "./components/user/NewUserForm";
import UserPreferences from "./components/user/UserPreferences";
import { stringify } from "postcss";
import LoginForm from "./components/LoginForm";
import NewShelterForm from "./components/shelter/NewShelterForm";
import ModifyUser from "./components/user/ModifyUser";

interface IProps {}

interface IState {
  username: string;
  id: number;
  shelterName: string;
  shelterId: number;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "none",
      id: -1,
      shelterName: "",
      shelterId: -1,
    };
  }

  loginShelter(shelterName: string, shelterId: number) {
    this.setState({ shelterName: shelterName, shelterId: shelterId });
  }

  onLogin(newName: string, newId: number) {
    console.log("user id on login: ", newId);
    this.setState({ username: newName, id: newId });
  }

  onLogout() {
    this.setState({ username: "none", id: -1 });
  }

  render() {
    return (
      <Router>
        <div className="App mx-auto text-2xl">
          <nav className="fixed inset-x-0 top-0 h-12 bg-gray-500">
            <NavBarContainer
              user={this.state.username}
              onLogout={this.onLogout.bind(this)}
            ></NavBarContainer>
          </nav>
          <div className="main-container mt-12 mb-10 border-solid border-4 border-black">
            <Route exact path="/" component={Home} />
            <Route exact path="/users/new" component={NewUserForm} />
            <Route
              exact
              path="/shelters/new"
              render={(routerProps) => (
                <NewShelterForm {...routerProps} onCreate={this.loginShelter} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(routerProps) => (
                <LoginForm {...routerProps} onLogin={this.onLogin.bind(this)} />
              )}
            />
            {/* <Route exact path="/logout"   render={(routerProps) => <LoginForm {...routerProps} onLogin = {this.onLogin.bind(this)} /> }  /> */}
            <Route
              exact
              path="/users/preferences"
              render={(routerProps) => <UserPreferences {...routerProps} />}
            />
            <Route
              exact
              path="/users/modify"
              render={(routerProps) => (
                <ModifyUser {...routerProps} userId={this.state.id} />
              )}
            />
          </div>
          <footer className="fixed inset-x-0 bottom-0 h-8 bg-blue-500">
            <FooterContainer />
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;

import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

export default class NewUserForm extends React.Component {
  state = {
    redirect: false,
    user: {
      userName: "",
      email: "",
      password: "",
      preferencesSet: false,
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newUser: any = { ...this.state.user };
    newUser[event.target.name] = event.target.value;

    this.setState({ user: newUser });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    console.log(this.state);
    Axios.post("http://localhost:8080/users", this.state.user);
    this.setState({ redirect: true });
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/users/preferences" />;
    } else {
      return (
        <div className="flex h-screen justify-center">
          <div className="m-12 w-30% ">
            <div className="text-3xl">Create User Account</div>
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="text"
                name="userName"
                placeholder="Full Name"
                onChange={this.handleChange}
                value={this.state.user.userName}
              ></input>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.user.email}
              ></input>
              <input
                className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.user.password}
              ></input>
              <button
                className="text-2xl rounded-full py-2 px-2 bg-red-400"
                type="submit"
              >
                Sign Up!
              </button>
            </form>
            <Link className="text-2xl" to="/">
              Create a Shelter Account Instead
            </Link>
          </div>
        </div>
      );
    }
  }
}

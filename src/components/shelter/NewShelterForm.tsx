import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

interface IProps {
  onCreate: (newName: string, newId: number, newUserType: string) => void;
}

export default class NewShelterForm extends React.Component<IProps> {
  state = {
    redirect: false,
    shelterId: "",
    message: "",
    shelter: {
      shelterName: "",
      address: "",
      contactInfo: "",
      shelterPassword: "",
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    const newShelter: any = { ...this.state.shelter };
    newShelter[event.target.name] = event.target.value;

    this.setState({ shelter: newShelter });
  };

  handleSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    console.log(this.state);
    Axios.post("http://54.215.186.163:8080/Barker-api/shelters", this.state.shelter)
      .then((resp) => {
        console.log(resp.data);
        this.setState({ shelterId: resp.data.id });
        console.log(this.state.shelter);
        Axios.post("http://54.215.186.163:8080/Barker-api/shelterLogin", this.state.shelter)
          .then((resp) => {
            console.log(resp.data);
            this.props.onCreate(resp.data.shelterName, resp.data.id, "Shelter");
            this.setState({ message: "Shelter Successfully Created!" });
            setTimeout(() => this.setState({ redirect: true }), 2000);
          })
          .catch((err) => {
            console.log(err);
            alert("Invalid login");
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to Create Account: Shelter Name must be unique.");
      });
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return (
        //   need to login and direct to new dog page
        <Redirect
          to={{
            pathname: "/shelters/home",
            state: { shelterId: this.state.shelterId },
          }}
        />
      );
    } else {
      return (
        <>
          <div className="text-green-400 text-4xl">{this.state.message}</div>
          <div className="flex h-screen justify-center">
            <div className="m-12 w-30% ">
              <div className="text-3xl">Create New Shelter</div>
              <form className="flex flex-col" onSubmit={this.handleSubmit}>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="text"
                  name="shelterName"
                  required
                  placeholder="Shelter Name"
                  onChange={this.handleChange}
                  value={this.state.shelter.shelterName}
                ></input>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="text"
                  name="address"
                  required
                  placeholder="Address"
                  onChange={this.handleChange}
                  value={this.state.shelter.address}
                ></input>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="text"
                  name="contactInfo"
                  required
                  placeholder="Contact Information"
                  onChange={this.handleChange}
                  value={this.state.shelter.contactInfo}
                ></input>
                <input
                  className="m-2 p-2 rounded-md border-solid border-2 border-gray-400 text-left"
                  type="password"
                  name="shelterPassword"
                  required
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.shelter.shelterPassword}
                ></input>
                <button
                  className="text-2xl rounded-full py-2 px-2 bg-red-400"
                  type="submit"
                >
                  Sign Up!
                </button>
              </form>
              <Link className="text-2xl" to="/users/new">
                Create a User Account Instead
              </Link>
            </div>
          </div>
        </>
      );
    }
  }
}

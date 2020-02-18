import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style/HomePage.css";
import axios from "axios";

export default class HomePage extends Component {
  state = {
    arrCategories: [],
    redirectToCategoryPage: false,
    category: []
  };

  getCategories = () => {
    axios
      .get("/categories/getCategories")
      .then(res => {
        if (res.status === 200) {
          this.setState({ arrCategories: res.data });
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  render() {
    if (this.state.redirectToCategoryPage) {
      return (
        <Redirect
          to={{
            pathname: "/displayGroupsByCategory",
            state: { id: localStorage.categoryId }
          }}
        />
      );
    }

    return (
      <div className="homePage">
        <div className="HomePage-Intro">
          <div className="HomePage-Titles">
            <h1 className="HomePage-MainTitle">The real world is calling</h1>
            <h5 className="HomePage-SeconderyTitle">
              Join a local group to meet people, try somthing new, or do more of
              what you love
            </h5>
          </div>
        </div>

        <div className="HomePage-Categories">
          <div>
            <div className="Categories-Titles">
              <h5 className="Categories-MainTitle">Categories</h5>
              <span className="pageDescription">
                Browse groups by topics you're interested in{" "}
              </span>
            </div>
            <div className="Categories-Display">
              {this.state.arrCategories.map((category, i) => {
                return (
                  <div
                    key={i}
                    className="Categories-DisplayCategories"
                    onClick={() => {
                      localStorage.setItem("categoryId", category._id);
                      this.setState({ redirectToCategoryPage: true });
                    }}
                  >
                    <span className="Categories-CategoryName">{category.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getCategories();
  }
}

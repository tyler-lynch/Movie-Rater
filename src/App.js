/* eslint-disable react/style-prop-object */
import "./App.css";

import Discover from "./Discover";
import SelectSearch from "react-select-search";

import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");

  const img_URL = "https://image.tmdb.org/t/p/original";
  const API_KEY = "3d0ac201ad49d76eb1e30e54903dcc54";

  function getOptions(query) {
    return new Promise((resolve, reject) => {
      fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          API_KEY +
          "&query=" +
          String(message).replace(/ /g, "+")
      )
        .then((response) => response.json())
        .then((data) => {
          resolve(
            data.results.map((obj) => ({
              value: obj.original_title,
              name: obj.original_title,
            }))
          );
        })
        .catch(reject);
    });
  }

  const fetchData = () => {
    return fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        API_KEY +
        "&query=" +
        String(message).replace(/ /g, "+")
    )
      .then((response) => response.json())
      .then((data) => setUser(data.results));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
    setUser([]);
    fetchData();
  };

  return (
    <>
      <nav class="navbar sticky-top bg-body-tertiary">
        <div class="container-md my-2">
          <a class="navbar-brand h1">Movie Rater</a>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="text"
              id="message"
              name="message"
              placeholder="Search"
              onChange={handleChange}
              value={message}
            />
          </form>
        </div>
      </nav>

      <SelectSearch
        options={[]}
        defaultValue="None"
        getOptions={(query) => {
          return new Promise((resolve, reject) => {
            fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${String(
                query
              ).replace(/ /g, "+")}`
            )
              .then((response) => response.json())
              .then((drinks) => {
                resolve(
                  drinks.results.map(({ original_title }) => ({
                    value: original_title,
                    name: original_title,
                  }))
                );
              })
              .catch(reject);
          });
        }}
        search
        placeholder="Search Movies"
      />

      <div>
        <div class="container container-md">
          <div class="row row-cols-2">
            {user &&
              user.length > 0 &&
              user.map((userObj, index) => (
                <div class="col">
                  <div class="card my-4" key={userObj.original_title}>
                    <div class="row ">
                      <div class="col-4">
                        <img
                          src={img_URL + userObj.poster_path}
                          class="card-img-top"
                          alt="..."
                        />
                      </div>
                      <div class="card-body col-8">
                        <div class="d-flex justify-content-between">
                          <h5 class="card-title">{userObj.original_title}</h5>
                          <p class="card-text me-5">{userObj.release_date}</p>
                        </div>
                        <p class="card-text">{userObj.overview}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

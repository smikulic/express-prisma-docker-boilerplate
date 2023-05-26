import React from "react";
// import logo from "./logo.svg";
import "./App.css";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function App() {
  const getUsers = async () => {
    const response = fetch("http://localhost:8000/api/users", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      console.log({ response });
      const jsonData = response.json();
      console.log({ jsonData });
    });
  };

  const createUser = () => {
    postData("http://localhost:8000/api/users", {
      email: "test@email.com",
      password: "password",
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          getUsers();
        }}
      >
        Fetch users
      </button>
      <button
        onClick={() => {
          createUser();
        }}
      >
        Create user
      </button>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

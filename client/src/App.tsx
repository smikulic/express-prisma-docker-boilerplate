import React, { useEffect, useState } from "react";
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
  const [usersList, setUsersList] = useState([]);

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  const getUsers = async () => {
    fetch("http://localhost:8000/api/users", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => setUsersList(response.data));
  };

  const createUser = () => {
    postData("http://localhost:8000/api/users", {
      email: `${generateRandomString()}-test@email.com`,
      password: "password",
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log({ usersList });

  return (
    <div className="App">
      <br />

      <button
        onClick={() => {
          createUser();
        }}
      >
        Create user
      </button>

      <br />
      <div className="listUsers">
        {usersList &&
          usersList.map((user: { email: string }, key: number) => {
            return <div key={key}>{user.email}</div>;
          })}
      </div>
    </div>
  );
}

export default App;

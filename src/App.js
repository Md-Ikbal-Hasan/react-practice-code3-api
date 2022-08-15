import './App.css';
import React, { useEffect, useState } from "react"

function App() {

  const URL = "https://rest-api-without-db.herokuapp.com/users/";

  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUsers = () => {

    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch")
        }
        return res.json();
      })

      .then((data) => {
        // console.log(data.users);
        setUsers(data.users);
      })
      .catch((err) => {
        setError(err.message);

      })

      .finally(() => {
        setIsLoading(false);
      });

  };


  useEffect(() => {

    getAllUsers();

  }, [])



  return (
    <div className='App'>
      <h1>Users Management App</h1>

      {isLoading && <h2>Loading .....</h2>}
      {error && <h2>{error} </h2>}

      <section>

        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article key={id} className='card'>
                <p> {username} </p>
                <p> {email} </p>
                <button className='btn'>Edit</button>
                <button className='btn'>Delete</button>

              </article>
            )
          })}

      </section>




    </div>
  );
}

export default App;

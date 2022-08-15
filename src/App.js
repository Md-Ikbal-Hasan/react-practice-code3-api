import './App.css';
import React, { useEffect, useState } from "react"
import UserForm from './Components/UserForm';

function App() {

  const URL = "https://rest-api-without-db.herokuapp.com/users/"; // api

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


  //delete operation
  const handleDelete = (id) => {

    fetch(URL + `/${id}`, {

      method: 'DELETE'

    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not Delete")
        }
        getAllUsers();
      })


      .catch((err) => {
        setError(err.message);

      })

  }


  // add User . Create Operation
  const addUser = (user) => {
    fetch(URL, {

      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

      .then((res) => {
        if (res.status === 201) {
          getAllUsers();
        } else {
          throw new Error("Could not create new user")
        }

      })


      .catch((err) => {
        setError(err.message);

      })
  }



  return (
    <div className='App'>
      <h1>Users Management App</h1>

      {isLoading && <h2>Loading .....</h2>}
      {error && <h2>{error} </h2>}

      <UserForm btnText="Add User" handleSubmitData={addUser} />

      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article key={id} className='card'>
                <p> {username} </p>
                <p> {email} </p>
                <button className='btn'>Edit</button>
                <button onClick={() => { handleDelete(id) }} className='btn'>Delete</button>

              </article>
            )
          })}
      </section>

    </div>
  );
}

export default App;

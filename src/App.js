import './App.css';
import React, { useEffect, useState } from "react"
import UserForm from './Components/UserForm';

function App() {

  const URL = "https://rest-api-without-db.herokuapp.com/users/"; // api

  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  // update 
  const [selectedUser, setSelectedUser] = useState({
    username: '',
    email: ''
  });

  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);

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


  //  update section
  const handleEdit = (id) => {
    setSelectedUserId(id);
    setUpdateFlag(true);

    const filteredData = users.filter((user) => {
      return user.id === id
    })
    // console.log(filteredData);

    setSelectedUser({
      username: filteredData[0].username,
      email: filteredData[0].email
    })

  }

  const handleUpdate = (user) => {
    fetch(URL + `/${selectedUserId}`, {

      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to update")
        }
        getAllUsers();
        setUpdateFlag(false)
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

      {updateFlag ?
        (<UserForm
          btnText="Update User"
          selectedUser={selectedUser}
          handleSubmitData={handleUpdate} />)
        :
        (<UserForm btnText="Add User" handleSubmitData={addUser} />)}

      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article key={id} className='card'>
                <p> {username} </p>
                <p> {email} </p>

                <button className='btn' onClick={() => {
                  handleEdit(id)
                }}>
                  Edit
                </button>

                <button
                  className='btn'
                  onClick={() => {
                    handleDelete(id)
                  }} >
                  Delete
                </button>

              </article>
            )
          })}
      </section>

    </div>
  );
}

export default App;

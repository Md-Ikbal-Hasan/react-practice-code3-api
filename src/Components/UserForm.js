import React, { useState } from 'react'
import PropTypes from 'prop-types'

const UserForm = ({ handleSubmitData, btnText }) => {

    const [user, setUser] = useState({
        username: "",
        email: ""
    })

    const { username, email } = user;

    const handleChange = (e) => {
        const selectedField = e.target.name;
        const selectedValue = e.target.value;

        setUser((prevState) => {
            return { ...prevState, [selectedField]: selectedValue }
        })


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitData(user);
        // reset the form
        setUser({
            username: "",
            email: ""
        })

    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='field-input'>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' name='username' value={username} onChange={handleChange} required />
            </div>

            <div className='field-input'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' value={email} onChange={handleChange} required />
            </div>

            <button type='submit' className='btn'>{btnText}</button>

        </form>
    )
}

UserForm.propTypes = {}

export default UserForm
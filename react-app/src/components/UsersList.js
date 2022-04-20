import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData()
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div key={user.id}>
        <li>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </li>
        <div>Id: {user.id}</div>
        <div>Email: {user.email}</div>
        <div>Profile Pic URL: {user.profile_pic}</div>
        <br></br>
      </div>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;

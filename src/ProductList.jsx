import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [users, setUsers] = useState([]);
  const [usersToDelete, setUsersToDelete] = useState([]);
  console.log("to delete", usersToDelete);

  const fetchUsers = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteSelectedUsers = () => {
    const newUserList = users.filter(
      (user) => !usersToDelete.includes(user.id)
    );
    setUsers(newUserList);
  };

  return (
    <>
      <button onClick={deleteSelectedUsers}>Delete selected users</button>
      <div className="user_list">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <ProductItem
                key={user.id}
                user={user}
                userList={users}
                setUsers={setUsers}
                usersToDelete={usersToDelete}
                setUsersToDelete={setUsersToDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;

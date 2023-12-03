import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [users, setUsers] = useState([]);
  const [usersToDelete, setUsersToDelete] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await response.json();
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

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(users.length / 10) &&
      page !== selectedPage
    ) {
      setPage(selectedPage);
    }
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
            {users.slice(page * 10 - 10, page * 10).map((user) => (
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
        {users.length > 0 && (
          <div className="pagination">
            <div
              className={
                page === 1
                  ? "previous_page pagination_disabled"
                  : "previous_page"
              }
              onClick={() => selectPageHandler(page - 1)}
            >
              ⏮️
            </div>
            {Array.from({ length: Math.ceil(users.length / 10) }).map(
              (_, i) => (
                <div
                  key={i}
                  className={
                    page === i + 1 ? "pagination__selected page" : "page"
                  }
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </div>
              )
            )}
            <div
              className={
                page === Math.ceil(users.length / 10)
                  ? "next_page pagination_disabled"
                  : "next_page"
              }
              onClick={() => selectPageHandler(page + 1)}
            >
              ⏭️
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;

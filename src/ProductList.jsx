import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { FaSearch } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const ProductList = () => {
  const [users, setUsers] = useState([]);
  const [usersToDelete, setUsersToDelete] = useState([]);
  const [page, setPage] = useState(1);
  const [emptyDeleteList, setEmptyDeleteList] = useState(true);
  const [searchInput, setSearchInput] = useState("");

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
    setEmptyDeleteList(true);
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

  const addAllUsersToDeleteList = (e) => {
    if (!e.target.checked) {
      setEmptyDeleteList(true);
      setUsersToDelete([]);
    } else {
      setEmptyDeleteList(false);
      const newDeleteUsersList = [...users]
        .slice(page * 10 - 10, page * 10)
        .map((user) => user.id);
      setUsersToDelete(newDeleteUsersList);
    }
  };

  const onSearch = () => {
    const newList = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput) ||
        user.email.toLowerCase().includes(searchInput)
    );
    setUsers(newList);
  };

  const onResetSearch = () => {
    fetchUsers();
    setSearchInput("");
  };

  return (
    <>
      <div className="header">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
          />
          <span className="search_logo" onClick={onSearch}>
            <FaSearch />
          </span>
          <span className="reset" onClick={onResetSearch}>
            Reset
          </span>
        </div>
        <button
          onClick={deleteSelectedUsers}
          className="delete_selsected_users"
        >
          <FaTrashCan /> Delete selected users
        </button>
      </div>
      <div className="user_list">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => addAllUsersToDeleteList(e)}
                  checked={!emptyDeleteList}
                />
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

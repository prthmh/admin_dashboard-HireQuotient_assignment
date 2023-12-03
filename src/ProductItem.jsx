import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoSave } from "react-icons/io5";

const ProductItem = ({
  user,
  userList,
  setUsers,
  usersToDelete,
  setUsersToDelete,
}) => {
  const [userName, setUserName] = useState(user.name);
  const [isEditable, setIsEditable] = useState(false);

  const deleteUser = (userId) => {
    console.log(userId);
    const newUserList = userList.filter((user) => user.id !== userId);
    setUsers(newUserList);
  };

  const editUser = (editUser) => {
    setIsEditable(!isEditable);
    const newUserList = userList.map((user) =>
      user.id === editUser.id ? { ...user, name: userName } : user
    );
    setUsers(newUserList);
  };

  const addToDeleteList = () => {
    if (usersToDelete.includes(user.id)) {
      const newDeleteList = usersToDelete.filter((id) => id !== user.id);
      setUsersToDelete(newDeleteList);
    } else {
      setUsersToDelete((prevState) => [...prevState, user.id]);
    }
  };

  return (
    <tr className={usersToDelete.includes(user.id) && "highlight"}>
      <td>
        <input
          type="checkbox"
          onClick={() => addToDeleteList()}
          checked={usersToDelete.includes(user.id)}
        />
      </td>
      <td>
        {
          <input
            type="text"
            className={isEditable && "edit_user"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readOnly={!isEditable}
          />
        }
      </td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className="action_btns">
        <button className="edit" onClick={() => editUser(user)}>
          {isEditable ? <IoSave /> : <FaEdit />}
        </button>
        <button className="delete" onClick={() => deleteUser(user.id)}>
          <FaTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;

import { useState } from "react";

import UserItem from "./UserItem.jsx";
import UserDetails from "./UserDetails.jsx";
import DeleteUserModal from "./DeleteUserModal.jsx";
import SaveUserModal from "./SaveUserModal.jsx";

export default function UserList({ users, forceUserRefresh }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserEdit, setShowUserEdit] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showUserDelete, setShowUserDelete] = useState(null);

  function detailsActionClickHandler(userId) {
    setSelectedUserId(userId);
    setShowDetails(true);
  }

  function deleteActionClickHandler(userId) {
    setSelectedUserId(userId);
    setShowUserDelete(userId);
  }

  function editActionHandler(userId) {
    setSelectedUserId(userId);
    setShowUserEdit(true);
  }

  function closeModalHandler() {
    setShowDetails(false);
    setShowUserDelete(false);
    setShowUserEdit(false);
    setSelectedUserId(null);
    forceUserRefresh();
  }

  async function editUserHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { country, city, street, streetNumber, ...userData } =
      Object.fromEntries(formData);

    userData.address = {
      country,
      city,
      street,
      streetNumber,
    };

    userData.updatedAt = new Date().toISOString();

    try {
      await fetch(`http://localhost:3030/jsonstore/users/${selectedUserId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      closeModalHandler();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>
              First name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Last name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Email
              <svg
                className="icon"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Phone
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Created
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem
              {...user}
              key={user._id}
              onDetailsClick={detailsActionClickHandler}
              onDeleteClick={deleteActionClickHandler}
              onEditClick={editActionHandler}
            />
          ))}
        </tbody>
      </table>

      {showDetails && (
        <UserDetails userId={selectedUserId} onClose={closeModalHandler} />
      )}

      {showUserDelete && (
        <DeleteUserModal userId={selectedUserId} onClose={closeModalHandler} />
      )}

      {showUserEdit && (
        <SaveUserModal
          userId={selectedUserId}
          onClose={closeModalHandler}
          onSubmit={editUserHandler}
          editMode
        />
      )}
    </div>
  );
}

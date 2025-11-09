import { useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import Pagination from "./components/Pagination.jsx";
import SaveUserModal from "./components/SaveUserModal.jsx";

function App() {
  const [userModal, setUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(true);

  function showUserModalClickHandler() {
    setUserModal(true);
  }

  function closeUserModalClickHandler() {
    setUserModal(false);
  }

  function refresh() {
    setForceRefresh((state) => !state);
  }

  function sortUsersHandler() {
    setUsers((state) =>
      [...state].sort(
        (userA, userB) => new Date(userB.createdAt) - new Date(userA.createdAt)
      )
    );
  }
  useEffect(() => {
    fetch("http://localhost:3030/jsonstore/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(Object.values(result));
      })
      .catch((err) => alert(err.message));
  }, [forceRefresh]);

  const showUserModalSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const { country, city, streetNumber, ...userData } =
      Object.fromEntries(formData);

    userData.address = {
      country,
      city,
      streetNumber,
    };

    userData.createdAt = new Date().toISOString();
    userData.updatedAt = new Date().toISOString();

    fetch("http://localhost:3030/jsonstore/users", {
      method: "POST",
      headers: {
        "content-type": `application/json`,
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        closeUserModalClickHandler();
        refresh();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <Header />

      <main>
        <section className="card users-container">
          <Search />

          <UserList
            users={users}
            forceUserRefresh={refresh}
            onSort={sortUsersHandler}
          />

          <button className="btn-add btn" onClick={showUserModalClickHandler}>
            Add new user
          </button>

          <Pagination />
        </section>
        {userModal && (
          <SaveUserModal
            onClose={closeUserModalClickHandler}
            onSubmit={showUserModalSubmitHandler}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import Pagination from "./components/Pagination.jsx";
import CreateUserModal from "./components/CreateUsermModal.jsx";

function App() {
  const [userModal, setUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(true);

  function addUserClickHandler() {
    setUserModal(true);
  }

  function closeUserClickHandler() {
    setUserModal(false);
  }

  useEffect(() => {
    fetch("http://localhost:3030/jsonstore/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(Object.values(result));
      })
      .catch((err) => alert(err.message));
  }, [forceRefresh]);

  const addUserSubmitHanlder = (event) => {
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
      .then(() => setForceRefresh((state) => !state))
      .catch((err) => alert(err.message));

    console.log(userData);
  };

  return (
    <div>
      <Header />

      <main>
        <section className="card users-container">
          <Search />

          <UserList users={users} />

          <button className="btn-add btn" onClick={addUserClickHandler}>
            Add new user
          </button>

          <Pagination />
        </section>
        {userModal && (
          <CreateUserModal
            onClose={closeUserClickHandler}
            onSubmit={addUserSubmitHanlder}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

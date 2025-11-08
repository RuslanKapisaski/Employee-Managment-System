import { useState } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import Pagination from "./components/Pagination.jsx";
import CreateUserModal from "./components/CreateUsermModal.jsx";

function App() {
  const [userModal, setUserModal] = useState(false);

  function addUserClickHandler() {
    setUserModal(true);
  }

  function closeUserClickHandler() {
    setUserModal(false);
  }

  const addUserSubmitHanlder = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const userData = Object.fromEntries(formData);

    console.log(userData);
  };

  return (
    <div>
      <Header />

      <main>
        <section className="card users-container">
          <Search />

          <UserList />

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

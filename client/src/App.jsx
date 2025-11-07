import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import Pagination from "./components/Pagination.jsx";

function App() {
  return (
    <div>
      <Header />

      <main>
        <section className="card users-container">
          <Search />

          <UserList />

          <Pagination />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

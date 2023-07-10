import './styles/App.css';
import Header from "./Header";
import Sidebar from './Sidebar';
import Search from './Search';
import Register from './Register';
import Login from './Login';
import Error from "./Error";
import {Routes, Route, Navigate, Link} from "react-router-dom";
import Books from './Books';
import SearchBar from './SearchBar';
import Home from './Home';

function App() {
  return (
    <>
      <Header />
      <div className='content'>
        <Sidebar />
        <div className='search-content'>
          <Routes>
            <Route path="/search" element = {<SearchBar/>}></Route>
          </Routes>
          <Routes>
            <Route path="/" element = {<Home />}></Route>
            <Route path="/books">
              <Route index element = {<Navigate to = "/books/1" />}></Route>
              <Route path=":id" element = {<Books />}></Route>
            </Route>
            <Route path="/search" element = {<Search />}></Route>
            <Route path="/register" element = {<Register />}></Route>
            <Route path="/login" element = {<Login />}></Route>
            <Route path="/error" element = {<Error />}></Route>
            <Route path="*" element = {<Navigate to = "/" />}></Route>
          </Routes>
        </div>
      </div>
      <footer>Powered by Google Books API v1</footer>
    </>
  );
}

export default App;

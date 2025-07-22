import React, { useState, useEffect, useRef } from "react";
import Header from "./component/Header";
import BooksControls from "./component/BooksControls";
import BookViews from "./component/BookViews";
import { loadAllBooks } from "./http";

function App() {
  const [booksData, setBooksData] = useState([]);
  const [initialBooksData, setInitialBooksData] = useState([]);
  const [render, setRender] = useState(false);
  const [error, setError] = useState({
    msg: "Please wait book Data Loading...",
  });
  const activeFilter = useRef("all");
  useEffect(() => {
    setTimeout(async () => {
      try {
        const data = await loadAllBooks();
        console.log(data);
        if(data.books.length ===0)
        {
          setError({
          msg: "No Books Added, please add the book",
        });
        }
        setBooksData(data);
        setInitialBooksData(data);
      } catch (e) {
        setError({
          msg: "Error loading books from backend, Reastart Backend..",
        });
      }
    }, 500);
  }, [render]);

  function handleFilterAll() {
    setBooksData(initialBooksData);
    activeFilter.current = "all";
  }
  function handleFilterRead() {
    const readBooks = initialBooksData.books.filter(
      (book) => book.status === "read"
    );
    if (readBooks.length === 0) {
      setError({ msg: "No Book in Read Status" });
    }
    if (readBooks) {
      setBooksData({ books: readBooks });
      activeFilter.current = "read";
    }
  }
  function handleFilterUnread() {
    const unreadBooks = initialBooksData.books.filter(
      (book) => book.status === "unread"
    );
    if (unreadBooks.length === 0) {
      setError({ msg: "No Book in Unread Status" });
    }
    if (unreadBooks) {
      setBooksData({ books: unreadBooks });
      activeFilter.current = "unread";
    }
  }
  return (
    <>
      <div className="container">
        <Header />
        <BooksControls
          handleFilterAll={handleFilterAll}
          handleFilterRead={handleFilterRead}
          handleFilterUnread={handleFilterUnread}
          ref = {activeFilter}
          setRender ={setRender}
        
        />
        <BookViews
          booksData={booksData}
          setBooksData={setBooksData}
          setRender={setRender}
          error={error}
          
        />
      </div>
    </>
  );
}

export default App;

import React, { useState, forwardRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import AddBookModal from "./AddBookModal";
import FilterBtns from "./FilterBtns";

const BooksControls = forwardRef(function BooksControls({handleFilterAll, handleFilterRead, handleFilterUnread}, ref) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClickAddBook() {
    setIsOpen(true);
  }


  return (
    <>
      {isOpen && <AddBookModal onCloseBtn={() => setIsOpen(false)} setIsOpen={setIsOpen} />}
      <div className="book-controls-section">
        <div className="book-control-wrapper">
          <button
            type="button"
            className="add-books"
            onClick={handleClickAddBook}
          >
            Add Book
          </button>
          <div className="filter-buttons">
            <SlidersHorizontal className="sliderHorizontal" color="#d1d5dc" />
            <FilterBtns className={ref.current ==="all" ? "showAll-btn selected":"showAll-btn"} onClick={handleFilterAll}>Show All</FilterBtns>
            <FilterBtns className={ref.current ==="read" ? "read-btn selected":"read-btn"} onClick={handleFilterRead}>Read</FilterBtns>
            <FilterBtns className={ref.current === "unread" ? "unread-btn selected" : "unread-btn"} onClick={handleFilterUnread}>Unread</FilterBtns>
          </div>
        </div>
      </div>
    </>
  );
})

export default BooksControls;

import React, { useState } from "react";
import ReactStars from "react-stars";
import { createPortal } from "react-dom";
import BookControlButtons from "./BookControlButtons";
import { Star } from "lucide-react";
import bookFallbackImg from "../assets/book-fallback.png";
import { updateBook } from "../http";

function BookViews({ booksData, setRender, error }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState({});
  const [isEditDone, setIsEditDone] = useState(false);
  const [isDeleteDone, setIsDeleteDone] = useState(false);

  //handle book edit
  function handleEdit(book) {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      setEditingBook(book);
    }
  }

  async function handleSave(book) {
    console.log("before update");
    setIsEditing((prev) => !prev);
    console.log("after update");
    if (
      book.status === editingBook.status &&
      book.rating === editingBook.rating
    ) {
      return;
    }
    if (!editingBook.id) {
      return;
    }
    const updateResponse = await updateBook(editingBook.id, editingBook);
    console.log("after update response");
    console.log(updateResponse);
    setRender((prev)=> !prev);
    setIsEditDone(true);
    setTimeout(() => {
      setIsEditDone(false);
    }, 3000);
  }

  return (
    <>
    {isEditDone && createPortal(<p>Book Updated Succsefully</p>, document.getElementById("global-modal"))}
    {isDeleteDone && createPortal(<p>Book Deleted Succsefully</p>, document.getElementById("global-modal"))}
    <div id="global-modal"></div>
    <div className="books-view-section">
      {(booksData.books?.length === 0 ||
        booksData.books?.length === undefined) && (
        <p className="text-xl text-white">{error.msg}</p>
      )}
      <ul>
        {booksData.books?.map((book) => {
          return (
            <li key={book.title} className="book-section">
              <div className="about-book">
                <div className="book-info">
                  {/* Book control buttons */}
                  <BookControlButtons
                    book={book}
                    handleEdit={handleEdit}
                    isEditing={isEditing}
                    editingBook={editingBook}
                    handleSave={handleSave}
                    setRender={setRender}
                    setIsDeleteDone={setIsDeleteDone}
                  />

                  <h2 className="w-[90%]">
                    <span>Book Name: </span>
                    {book.title}
                  </h2>
                  <h5>
                    <span>Author:</span>
                    {book.author}
                  </h5>

                  <h4 className="readStatus">
                    <span>Status: </span>{" "}
                    {isEditing && book.title === editingBook.title ? (
                      <select
                        className="editSelect"
                        value={editingBook.status}
                        onChange={(e) =>
                          setEditingBook((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                      >
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                      </select>
                    ) : (
                      book.status
                    )}
                  </h4>
                  <div className="stars">
                    {isEditing && book.title === editingBook.title ? (
                      <ReactStars
                        count={5}
                        half={false}
                        name="rating"
                        value={editingBook.rating}
                        onChange={(rating) =>
                          setEditingBook((prev) => ({
                            ...prev,
                            rating: rating,
                          }))
                        }
                        size={24}
                        color2={"#ffd700"}
                      />
                    ) : (
                      <ul className="flex flex-row gap-1">
                        {!book.rating
                          ? "No rating"
                          : Array.from({ length: book.rating }).map((_, i) => (
                              <li key={i}>
                                <Star
                                  className="star"
                                  color="#FFFF00"
                                  strokeWidth={1.6}
                                />
                              </li>
                            ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="book-img">
                  <img
                    src={book.cover ? book.cover : bookFallbackImg}
                    alt="book image"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
      </>
  );
}

export default BookViews;

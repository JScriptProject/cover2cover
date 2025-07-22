import React, { useState } from 'react';
import createPortal from 'react-dom'
import { X } from "lucide-react";
import ReactStars from "react-stars";
import booklogo from '../assets/book.png';
import { sendRequest } from '../http';
import BookNameInput from './BookNameInput';

function AddBookModal({onCloseBtn, setIsOpen, setRender}) {
    const [inputData, setInputData] = useState({
        title: "",
        author: "",
        status: "unread",
        rating: 0,
        cover: ""
    });
    const [isEmptyBook, setIsEmptyBook] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState(false);

    function handleInputChange(e){
        setInputData({...inputData, [e.target.name]: e.target.value});
    }

    //handle rating change
    function handleRatingChange(newRating){
        setInputData({...inputData, rating: newRating});
    }
    
  return (
    <>
    {confirmMsg && createPortal(<p>Book Added Succsefully</p>, document.getElementById("global-modal"))}

    <div className="add-book-main">
      {isEmptyBook && <p className="emptybookName">Please Enter the book name..</p>}
        <div className="addBook-dialog">
          <button className="closeBtn-dialog" onClick={onCloseBtn}>
            <X />
          </button>
          <div className="modal-header">
            <img src={booklogo} alt="Book" className="logo-img" />
            <h3 className="modal-title">Add new book</h3>
          </div>
          <div className="form123">
            <form onSubmit={async (e)=>{
                console.log("Before prevent default");
                e.preventDefault();
                console.log("After prevent default");
                if(inputData.title.trim() === ""){
                  setIsEmptyBook(true);
                  return;
                }
                const bookDataResponse = await sendRequest(inputData);
                console.log(bookDataResponse);
                setIsOpen(false);
                setRender((prev)=> !prev);
                setConfirmMsg(true);
                setTimeout(()=>{
                  setConfirmMsg(false);
                },17000)
            }}>
              <BookNameInput setInputData={setInputData} setIsEmptyBook={setIsEmptyBook} />
              
              <div className="input-block input-block-radio">
                <div className="radio-group">
                  <label>Read</label>
                  <input
                    type="radio"
                    value="read"
                    name="status"
                    checked={inputData.status === "read"}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="radio-group">
                  <label>Unread</label>
                  <input
                    type="radio"
                    value="unread"
                    name="status"
                    checked={inputData.status === "unread"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input-block">
                <label>Rating</label>
                <ReactStars
                  count={5}
                  half = {false}
                  name='rating'
                  value={inputData.rating}
                  onChange={handleRatingChange}
                  size={24}
                  color2={"#ffd700"}
                />
              </div>
             
              <button type="submit" className="submit-addBookBtn add-books">
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBookModal
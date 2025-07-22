import React,{useState, useRef, useEffect} from "react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import ModalDialog from "./ModalDialog";
import {deleteBook} from '../http.js';
import {Save} from "lucide-react";

function BookControlButtons({book, handleEdit,isEditing, editingBook, handleSave, setRender}) {

  const [openModal, setOpenModal] = useState(false);
  const [bookDeleteInfo, setBookDeleteInfo] = useState({bookId:book.id,bookTitle:book.title,delStatus:true});

  const delModalRef = useRef();

function handleDelete(){
   setOpenModal(true);
}

useEffect(()=>{
   if(openModal){
    delModalRef.current.showModal();
   } 
},[openModal])

async function onClickDelete(){
  const deleteResponse = await deleteBook(bookDeleteInfo.bookId);
  setOpenModal(false);
  setBookDeleteInfo((prev)=>({...prev, delStatus:false}));
  setRender((prev)=> !prev);
}

function onClickCancel(){
  setOpenModal(false);
  if(!bookDeleteInfo.delStatus){
  setBookDeleteInfo((prev)=>({...prev, delStatus:true}));
  }
}



  return (
    <>{openModal && <ModalDialog ref={delModalRef} onClickDelete={onClickDelete} onClickCancel={onClickCancel} bookDeleteInfo={bookDeleteInfo}/>}
    <div className="addonControlBtns">
      <button className="addon-edit addonBtn" onClick={isEditing ? ()=>handleSave(book) : ()=>handleEdit(book)}>
        {isEditing && book.title === editingBook.title ? <Save className="addonBtnIcon addonBtnIcon-save" />:<Pencil className="addonBtnIcon" />}
      </button>
      <button className="addon-delete addonBtn" onClick={()=>handleDelete(book)}>
        <Trash2 className="addonBtnIcon" />
      </button>
    </div>
    </>
    
  );
}

export default BookControlButtons;

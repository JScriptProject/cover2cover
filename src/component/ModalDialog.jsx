import React, { forwardRef } from "react";
import Button from "./Button";

const ModalDialog = forwardRef(function ModalDialog(
  { onClickDelete, onClickCancel, bookDeleteInfo },
  ref
) {
  return (
    <dialog ref={ref} id="delete-dialog" onClose={onClickCancel}>
      <h2>Are you deleting book?</h2>
      <p>
        You are deleting - <span>{bookDeleteInfo.bookTitle? bookDeleteInfo.bookTitle :""}</span>
      </p>
      <div className="deleteConfirmationBtn">
        <Button className="book-delete-Btn delete-btn" onClick={onClickDelete}>
          Yes, Delete
        </Button>
        <Button className="book-delete-Btn cancel-btn" onClick={onClickCancel}>
          No, Cancel
        </Button>
      </div>
    </dialog>
  );
});

export default ModalDialog;

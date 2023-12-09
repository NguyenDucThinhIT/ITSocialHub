import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css"

const DeleteButton = (props) => {
  return (
    <button
      onClick={props.opendeletemodal}
      className="py-1 px-2 ms-2"
      
    >
      <FontAwesomeIcon icon={faTrashAlt} className="btn btn-danger"/>
    </button>
  );
};

export default DeleteButton;

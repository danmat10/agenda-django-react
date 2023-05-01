import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalErro(props) {
  const { show, handleClose, errorMessage } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ops!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Algo deu errado com a sua solicitação!<br></br>
        {errorMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalErro;

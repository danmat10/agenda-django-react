import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalExcluir = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir contato</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja realmente excluir este contato?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalExcluir;

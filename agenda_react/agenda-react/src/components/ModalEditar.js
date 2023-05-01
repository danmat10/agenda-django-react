import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalEditar({ show, handleClose, handleSubmit, contatoEditar }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar contato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              defaultValue={contatoEditar?.nome}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              defaultValue={contatoEditar?.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              className="form-control"
              id="telefone"
              name="telefone"
              defaultValue={contatoEditar?.telefone}
              required
            />
          </div>
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default ModalEditar;

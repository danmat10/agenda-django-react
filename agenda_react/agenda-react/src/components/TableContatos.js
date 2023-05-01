import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import API_URL from "../config.js";
import ModalExcluir from "./ModalExcluir.js";
import ModalSucesso from "./ModalSucesso.js";
import ModalEditar from "./ModalEditar.js";
import ModalCadastrar from "./ModalCadastrar.js";
import ModalErro from "./ModalErro.js";
import { Container, Row, Col } from "react-bootstrap";

function TableContatos() {
  const [contatos, setContatos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [contatoExcluir, setContatoExcluir] = React.useState(null);
  const [showModalSucesso, setShowModalSucesso] = React.useState(false);
  const [showModalEditar, setShowModalEditar] = React.useState(false);
  const [showModalCadastrar, setShowModalCadastrar] = React.useState(false);
  const [showModalErro, setShowModalErro] = React.useState(false);
  const [contatoEditar, setContatoEditar] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState([]);
  const [actualPage, setActualPage] = React.useState(1);
  const [totalRegisters, setTotalRegisters] = React.useState(0);

  React.useEffect(() => {
    getContatos(1);
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalError = () => setShowModalErro(false);
  const handleCloseModalSucesso = () => setShowModalSucesso(false);
  const handleCloseModalCadastrar = () => setShowModalCadastrar(false);
  const handleCloseModelEditar = () => setShowModalEditar(false);

  async function getContatos(page) {
    const response = await fetch(`${API_URL}/contatos/page/${page}/`);
    const data = await response.json();
    setContatos(data.contatos);
    setActualPage(data.pagina_atual);
    setTotalPages(Array.from({ length: data.total_paginas }, (_, i) => i + 1));
    setTotalRegisters(data.total_registros);
  }

  const handleShowModal = (contato) => {
    setContatoExcluir(contato);
    setShowModal(true);
  };

  const handleShowModalErro = (errorMessage) => {
    setErrorMessage(errorMessage);
    setShowModalErro(true);
  };

  const handleSubmitEditar = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const data = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
    };

    const response = await fetch(`${API_URL}/contatos/${contatoEditar.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setShowModalEditar(false);
      setShowModalSucesso(true);
      getContatos(actualPage);
    } else {
      handleCloseModelEditar();
      handleShowModalErro(response.statusText);
    }
  };

  const handleSubmitCadastrar = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const data = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
    };

    const response = await fetch(`${API_URL}/contatos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setShowModalCadastrar(false);
      setShowModalSucesso(true);
      getContatos(actualPage);
    } else {
      handleCloseModalCadastrar();
      handleShowModalErro(response.body.getReader());
    }
  };

  const handleShowModalEditar = (contato) => {
    setContatoEditar(contato);
    setShowModalEditar(true);
  };

  const handleShowModalCadastrar = () => {
    setShowModalCadastrar(true);
  };

  const handleConfirmExclusao = async () => {
    const result = await excluirContato(contatoExcluir.id);
    if (result) {
      setShowModal(false);
      setShowModalSucesso(true);
      getContatos(actualPage);
    }
  };

  async function excluirContato(id) {
    try {
      await fetch(`${API_URL}/contatos/${id}`, { method: "DELETE" });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <div>
      <ModalCadastrar
        show={showModalCadastrar}
        handleClose={handleCloseModalCadastrar}
        handleSubmit={handleSubmitCadastrar}
      />

      <ModalEditar
        show={showModalEditar}
        handleClose={handleCloseModelEditar}
        handleSubmit={handleSubmitEditar}
        contatoEditar={contatoEditar}
      />

      <ModalSucesso
        show={showModalSucesso}
        handleClose={handleCloseModalSucesso}
      />

      <ModalErro
        show={showModalErro}
        handleClose={handleCloseModalError}
        errorMessage={errorMessage}
      />

      <ModalExcluir
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmExclusao}
      />
      <h1 style={{ textAlign: "center", marginTop: "35px" }}>
        Tabela de Contatos
      </h1>
      <Container style={{ width: "800px", margin: "auto", marginTop: "35px" }}>
        <Row
          className="row justify-content-md-end"
          style={{ marginBottom: "20px" }}
        >
          <Col className="col-3" style={{ textAlign: "right" }}>
            <Button
              variant="primary"
              onClick={() => {
                getContatos(actualPage);
              }}
            >
              Recarregar
            </Button>
          </Col>
          <Col className="col-3" style={{ textAlign: "right" }}>
            <Button
              variant="primary"
              onClick={() => {
                handleShowModalCadastrar();
              }}
            >
              Novo Contato
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contatos.map((contato) => (
                <tr key={contato.id}>
                  <td>{contato.nome}</td>
                  <td>{contato.email}</td>
                  <td>{contato.telefone}</td>
                  <td>
                    <Button
                      className="btn btn-primary mr-2"
                      onClick={() => handleShowModalEditar(contato)}
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleShowModal(contato)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row>
          {totalPages.map((e) => (
            <Col className="col-1">
              <Button
                className="btn primary"
                key={e}
                onClick={() => {
                  getContatos(e);
                }}
              >
                {e}
              </Button>
            </Col>
          ))}
        </Row>
        <Row>
          Exibindo {actualPage.toString()} de {totalPages.length.toString()} página(s), 
          contendo {totalRegisters.toString()} contato(s) no total.
        </Row>
      </Container>
    </div>
  );
}

export default TableContatos;

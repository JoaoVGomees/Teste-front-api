import React, { useRef, useEffect } from "react";
import api from "../../services/api";
import './index.css';

function Modal({ community, onClose }) {
  const inputName = useRef();

  useEffect(() => {
    if (community) {
      inputName.current.value = community.nome;
    }
  }, [community]);

  async function editCommunity(idComunidade) {
    await api.put(`comunidades/${idComunidade}`, {
      nome: inputName.current.value
    });
    onClose();
  }

  return (
    <section className="modal-container">
      <div className="modal">
        <button data-modal="fechar" className="fechar" onClick={onClose}>X</button>

        <form className="form-edit">
          <div className="label-input">
            <label htmlFor="nome">Nome: </label>
            <input name='nome' type='text' placeholder='Digite o nome da comunidade' ref={inputName} required />
          </div>

          <div className="btn-container">
            <button className="btn-voltar" onClick={onClose}>Voltar</button>
            <button onClick={(event) => {
              event.preventDefault();
              editCommunity(community.id);
            }}>Editar</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Modal;

import React, { useRef, useEffect } from "react";
import api from "../../services/api";
import './index.css';

function Modal({ user, onClose }) {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  useEffect(() => {
    if (user) {
      inputName.current.value = user.nome; // Corrigido para `user.nome`
      inputEmail.current.value = user.email;
    }
  }, [user]);

  async function editUsers(idUser) {
    await api.put(`usuarios/${idUser}`, {
      nome: inputName.current.value,
      email: inputEmail.current.value,
      senha: inputPassword.current.value,
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
            <input name='nome' type='text' placeholder='Digite seu nome' ref={inputName} required />
          </div>

          <div className="label-input">
            <label htmlFor="email">Email: </label>
            <input name='email' type='email' placeholder='Digite seu email' ref={inputEmail} required />
          </div>

          <div className="label-input">
            <label htmlFor="senha">Senha: </label>
            <input name='senha' type='password' placeholder='Digite sua senha' ref={inputPassword} required />
          </div>

          <div className="btn-container">
            <button className="btn-voltar" onClick={onClose}>Voltar</button>
            <button onClick={(event) => {
              event.preventDefault();
              editUsers(user.id);
            }}>Editar</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Modal;

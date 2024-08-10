import { useState, useEffect, useRef } from 'react';
import RemoveIcon from '../../assets/remove.svg';
import EditIcon from '../../assets/edit.svg';
import Modal from '../ModalCommunity';
import api from '../../services/api';

function Comunidades() {
  const [community, setCommunity] = useState([]);
  const [editingCommunity, setEditingCommunity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let inputName = useRef();

  async function getCommunity() {
    const communityFromApi = await api.get('comunidades');
    setCommunity(communityFromApi.data);
  }

  async function createCommunity() {
    await api.post('comunidades', {
      nome: inputName.current.value,
    });

    inputName.current.value = '';
    getCommunity();
  }

  async function deleteCommunity(id) {
    await api.delete(`comunidades/${id}`);
    getCommunity();
  }

  useEffect(() => {
    getCommunity();
  }, []);

  const handleEditClick = (community) => {
    setEditingCommunity(community);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCommunity(null);
    getCommunity();
  };

  return (
    <div className='container'>
      <form className='home-form'>
        <h1>Cadastro de Comunidades</h1>
        <input name='nome' type='text' placeholder='Digite o nome da comunidade' ref={inputName} required />

        <button onClick={createCommunity} className='btn' type='button'>
          Cadastrar
        </button>
      </form>

      <section className='card-section'>
        {community.map((community) => (
          <div key={community.id} className='card'>
            <div>
              <p>
                Nome: <span>{community.nome}</span>
              </p>
            </div>
            <div className='btn-container'>
              <button>
                <img src={RemoveIcon} width={32} onClick={() => deleteCommunity(community.id)} />
              </button>
              <button data-modal='abrir'>
                <img src={EditIcon} width={32} onClick={() => handleEditClick(community)} />
              </button>
            </div>
          </div>
        ))}
      </section>
      {isModalOpen && <Modal community={editingCommunity} onClose={handleCloseModal} />}
    </div>
  );
}

export default Comunidades;

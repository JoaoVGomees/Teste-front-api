import { Link } from 'react-router-dom';
import './index.css'

export default function Home() {
  return (
    <div className='links'>
      <Link to="/usuarios" className='link'>Página de Cadastro de Usuários</Link>
      <Link to="/comunidades" className='link'>Página de Cadastro de Comunidades</Link>
    </div>
  );
}
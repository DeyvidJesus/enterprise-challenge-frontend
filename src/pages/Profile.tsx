import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';

interface User {
  nomeCompleto: string;
  email: string;
  numeroCelular: string;
  idade?: number;
  conheceProgramacao?: boolean;
  senha: string;
  role: 'Usuario' | 'Voluntario';
}

const initialUserData: User = {
  nomeCompleto: 'João da Silva',
  email: 'joao@example.com',
  numeroCelular: '99999-9999',
  idade: 25,
  conheceProgramacao: true,
  senha: 'senha123',
  role: 'Usuario',
};

const ProfilePage: React.FC = () => {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState<User>(initialUserData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = cookies["token"];
    if (!token) {
      window.location.assign("http://localhost:4200/");
    }
    
    Modal.setAppElement('body');
  }, [cookies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDeleteAccount = () => {
    console.log('Conta excluída permanentemente');
    closeModal();
  };

  const handleSaveChanges = () => {
    console.log('Dados salvos:', user);
    closeModal();
  };

  return (
    <div className="max-w-xl w-full mt-8 mx-auto p-6 bg-slate-300 rounded shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuário</h1>
      <div className="mb-4">
        <p><strong>Nome Completo:</strong> {user.nomeCompleto}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Número de Celular:</strong> {user.numeroCelular}</p>
        {user.role === 'Usuario' && (
          <>
            <p><strong>Idade:</strong> {user.idade}</p>
            <p><strong>Conhece Programação:</strong> {user.conheceProgramacao ? 'Sim' : 'Não'}</p>
          </>
        )}
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" 
          onClick={openModal}
        >
          Editar Perfil
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        className="bg-white rounded shadow-lg p-6 w-full max-w-lg mx-auto my-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
        <form>
          <label className="block mb-2">
            Nome Completo:
            <input 
              type="text" 
              name="nomeCompleto" 
              value={user.nomeCompleto} 
              onChange={handleChange} 
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input 
              type="email" 
              name="email" 
              value={user.email} 
              onChange={handleChange} 
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Número de Celular:
            <input 
              type="text" 
              name="numeroCelular" 
              value={user.numeroCelular} 
              onChange={handleChange} 
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          {user.role === 'Usuario' && (
            <>
              <label className="block mb-2">
                Idade:
                <input 
                  type="number" 
                  name="idade" 
                  value={user.idade} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border rounded p-2"
                />
              </label>
              <label className="block mb-2">
                Conhece Programação:
                <input 
                  type="checkbox" 
                  name="conheceProgramacao" 
                  checked={user.conheceProgramacao} 
                  onChange={handleChange} 
                  className="ml-2"
                />
              </label>
            </>
          )}
          <label className="block mb-4">
            Senha:
            <input 
              type="password" 
              name="senha" 
              value={user.senha} 
              onChange={handleChange} 
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
        </form>

        <div className="flex justify-between">
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500" 
            onClick={handleSaveChanges}
          >
            Salvar Alterações
          </button>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500" 
            onClick={handleDeleteAccount}
          >
            Excluir Conta
          </button>
          <button 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-200" 
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
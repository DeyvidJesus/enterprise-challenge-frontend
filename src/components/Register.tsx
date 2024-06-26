import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
  const [cookies,] = useCookies(["token"])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, password?: string }>({});

  useEffect(() => {
    const cookieValue = cookies["token"];
    if (cookieValue) {
      window.location.assign("http://localhost:4200/dashboard");
    }
  }, [])

  const validate = (): boolean => {
    const newErrors: { username?: string, password?: string } = {};

    if (!username) {
      newErrors.username = 'Nome de usuário é obrigatório.';
    } else if (username.length < 3) {
      newErrors.username = 'Nome de usuário deve ter ao menos 3 caracteres.';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter ao menos 6 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:8091/usuario/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nomeUsuario: username, senha: password })
        });
        if (response.ok) {
          await response.json();
          toast.success('Usuário cadastrado com sucesso, faça login na sua conta.');
        } else {
          toast.error('Não foi possível criar o usuário');
        }
      } catch (error) {
        toast.error('O cadastro falhou');
      }
    }
  };

  return (
    <>
      <form className='flex rounded flex-col border-2 border-black p-6 bg-gray-50 bg-opacity-70' onSubmit={handleRegister}>
        <h2 className='text-center font-semibold text-2xl mb-4'>Formulário de Cadastro</h2>
        <label className='font-medium'>Nome de usuário:</label>
        <input className='w-96 p-2 rounded border-black border mb-2' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        {errors.username && <span className="text-red-600 font-medium mb-1">{errors.username}</span>}

        <label className='font-medium'>Senha:</label>
        <input className='w-96 p-2 rounded border-black border mb-2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <span className="text-red-600 font-medium mb-1">{errors.password}</span>}

        <button className='w-96 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4' type="submit">Registrar-se</button>
        <a href="/" className='mt-3 font-semibold hover:underline'>Já possui conta? Entre!</a>
      </form>
      <ToastContainer />
    </>
  );
};

export default Register;

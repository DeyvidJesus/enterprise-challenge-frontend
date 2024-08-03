import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [cookies] = useCookies(["token"]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, password?: string }>({});

  useEffect(() => {
    const cookieValue = cookies["token"];
    if (cookieValue) {
      window.location.assign("http://localhost:4200/dashboard");
    }
  }, [cookies]);

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
          toast.success('Usuário cadastrado com sucesso, faça login na sua conta.');
          setUsername('');
          setPassword('');
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Não foi possível criar o usuário');
        }
      } catch (error) {
        toast.error('O cadastro falhou');
      }
    }
  };

  return (
    <div className='w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]'>
      <form className='w-full mx-4 md:w-1/2 h-3/4 flex flex-col items-center rounded border-2 border-black p-6 bg-gray-50 bg-opacity-70' onSubmit={handleRegister}>
        <h2 className='text-center font-semibold text-2xl mb-4'>Cadastre-se</h2>

        <label className='w-2/3 font-medium' htmlFor="username">Nome de usuário:</label>
        <input
          id="username"
          className={`w-2/3 p-2 rounded border ${errors.username ? 'border-red-500' : 'border-black'} mb-2`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-describedby="username-error"
        />
        {errors.username && <span id="username-error" className="text-red-600 font-medium mb-1">{errors.username}</span>}

        <label className='w-2/3 font-medium' htmlFor="password">Senha:</label>
        <input
          id="password"
          className={`w-2/3 p-2 rounded border ${errors.password ? 'border-red-500' : 'border-black'} mb-2`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="password-error"
        />
        {errors.password && <span id="password-error" className="text-red-600 font-medium mb-1">{errors.password}</span>}

        <button className='w-2/3 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4' type="submit">Registrar-se</button>
        <a href="/login" className='mt-3 font-semibold hover:underline'>Já possui conta? Entre!</a>
      </form>
    </div>
  );
};

export default Register;

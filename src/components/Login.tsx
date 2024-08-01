import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [cookies, setCookie] = useCookies(['token']);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nomeUsuario: username, senha: password })
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.token)
          setCookie('token', data.token, { path: '/' });
          window.location.assign("http://localhost:4200/dashboard");
        } else {
          toast.error('As credenciais informadas estão incorretas');
        }
      } catch (error) {
        toast.error('As credenciais informadas estão incorretas');
      }
    }
  };

  return (
    <div className='w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]'>
      <form className='w-1/2 h-3/4 justify-center items-center flex rounded flex-col border-2 border-black p-6 bg-gray-50 bg-opacity-70' onSubmit={handleLogin}>
        <h2 className='text-center font-semibold text-2xl mb-4'>Faça login</h2>
        <label className='w-2/3 font-medium'>Nome de usuário:</label>
        <input className='w-2/3 p-2 rounded border-black border mb-2' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        {errors.username && <span className="text-red-600 font-medium mb-1">{errors.username}</span>}
        <label className='w-2/3 font-medium'>Senha:</label>
        <input className='w-2/3 p-2 rounded border-black border mb-2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <span className="text-red-600 font-medium mb-1">{errors.password}</span>}

        <button className='bg-green-700 w-2/3 p-2 text-white font-medium rounded hover:bg-green-600 mt-4' type="submit">Entrar</button>
        <a href="/register" className='mt-3 font-semibold hover:underline'>Não possui conta ainda? Cadastre-se já!</a>
      </form>
    </div>
  );
};

export default Login;

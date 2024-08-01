import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Learn: React.FC = () => {
  const [cookies,] = useCookies(['token']);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    techKnowledge: 'no'
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = { fullName: '', email: '', phone: '', age: '' };
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Nome completo é obrigatório.';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido.';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório.';
      isValid = false;
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido. Formato esperado: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.';
      isValid = false;
    }

    if (!formData.age) {
      newErrors.age = 'Idade é obrigatória.';
      isValid = false;
    } else if (!/^\d+$/.test(formData.age)) {
      newErrors.age = 'Idade deve ser um número.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const token = cookies["token"];

        const response = await fetch('http://localhost:8080/cadastros/alunos', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Cadastro realizado com sucesso!');
          setFormData({ fullName: '', email: '', phone: '', age: '', techKnowledge: 'no' });
        } else {
          console.error('Resposta do servidor:', response);
          toast.error('Falha ao enviar cadastro.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        toast.error('Erro ao enviar cadastro.');
      }
    }
  };

  return (
    <div className='w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]'>
      <form className='w-1/2 h-3/4 justify-center items-center flex rounded flex-col border-2 border-black p-6 bg-gray-50 bg-opacity-70' onSubmit={handleSubmit}>
        <h2 className="text-center font-semibold text-2xl mb-4">Cadastro de Alunos</h2>

        <label className="font-medium w-2/3">Nome Completo:</label>
        <input
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="text-red-600 font-medium mb-1">{errors.fullName}</span>}

        <label className="font-medium w-2/3">Email:</label>
        <input
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="text-red-600 font-medium mb-1">{errors.email}</span>}

        <label className="font-medium w-2/3">Telefone:</label>
        <input
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="text-red-600 font-medium mb-1">{errors.phone}</span>}

        <label className="font-medium w-2/3">Idade:</label>
        <input
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <span className="text-red-600 font-medium mb-1">{errors.age}</span>}

        <label className="font-medium">Possui conhecimentos em tecnologia?</label>
        <div className="flex mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="techKnowledge"
              value="yes"
              checked={formData.techKnowledge === 'yes'}
              onChange={handleChange}
              className='mr-2'
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="techKnowledge"
              value="no"
              checked={formData.techKnowledge === 'no'}
              onChange={handleChange}
              className='mr-2'
            />
            Não
          </label>
        </div>

        <button className="w-2/3 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4" type="submit">Enviar</button>
      </form>
    </div>
  );
};
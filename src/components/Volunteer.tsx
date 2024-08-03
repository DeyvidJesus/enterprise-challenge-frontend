import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    numeroCelular: '',
    motivacao: ''
  });

  const [errors, setErrors] = useState({
    nomeCompleto: '',
    email: '',
    numeroCelular: '',
    motivacao: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = { nomeCompleto: '', email: '', numeroCelular: '', motivacao: '' };
    let isValid = true;

    if (!formData.nomeCompleto) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório.';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido.';
      isValid = false;
    }

    if (!formData.numeroCelular) {
      newErrors.numeroCelular = 'Telefone é obrigatório.';
      isValid = false;
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.numeroCelular)) {
      newErrors.numeroCelular = 'Telefone inválido. Formato esperado: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.';
      isValid = false;
    }

    if (!formData.motivacao) {
      newErrors.motivacao = 'Motivação é obrigatória.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:8091/cadastros/voluntarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Inscrição realizada com sucesso!');
          setFormData({ nomeCompleto: '', email: '', numeroCelular: '', motivacao: '' });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Falha ao enviar inscrição.');
        }
      } catch (error) {
        toast.error('Erro ao enviar inscrição.');
      }
    }
  };

  return (
    <div className='w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]'>
      <form
        className='w-full mx-4 md:w-1/2 h-full flex flex-col items-center rounded border-2 border-black p-6 bg-gray-50 bg-opacity-70'
        onSubmit={handleSubmit}
      >
        <h2 className="text-center font-semibold text-2xl mb-4">Inscrição de Voluntários</h2>

        <label className="font-medium w-2/3" htmlFor="nomeCompleto">Nome Completo:</label>
        <input
          id="nomeCompleto"
          className={`w-2/3 p-2 rounded border ${errors.nomeCompleto ? 'border-red-500' : 'border-black'} mb-2`}
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
          aria-describedby="nomeCompleto-error"
        />
        {errors.nomeCompleto && <span id="nomeCompleto-error" className="text-red-600 font-medium mb-1">{errors.nomeCompleto}</span>}

        <label className="font-medium w-2/3" htmlFor="email">Email:</label>
        <input
          id="email"
          className={`w-2/3 p-2 rounded border ${errors.email ? 'border-red-500' : 'border-black'} mb-2`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby="email-error"
        />
        {errors.email && <span id="email-error" className="text-red-600 font-medium mb-1">{errors.email}</span>}

        <label className="font-medium w-2/3" htmlFor="numeroCelular">Telefone:</label>
        <input
          id="numeroCelular"
          className={`w-2/3 p-2 rounded border ${errors.numeroCelular ? 'border-red-500' : 'border-black'} mb-2`}
          type="text"
          name="numeroCelular"
          value={formData.numeroCelular}
          onChange={handleChange}
          aria-describedby="numeroCelular-error"
        />
        {errors.numeroCelular && <span id="numeroCelular-error" className="text-red-600 font-medium mb-1">{errors.numeroCelular}</span>}

        <label className="font-medium w-2/3" htmlFor="motivacao">Motivação:</label>
        <textarea
          id="motivacao"
          className={`w-2/3 p-2 rounded border ${errors.motivacao ? 'border-red-500' : 'border-black'} mb-2`}
          name="motivacao"
          rows={3}
          value={formData.motivacao}
          onChange={handleChange}
          aria-describedby="motivacao-error"
        />
        {errors.motivacao && <span id="motivacao-error" className="text-red-600 font-medium mb-1">{errors.motivacao}</span>}

        <button className="w-2/3 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4" type="submit">Enviar</button>
      </form>
    </div>
  );
};

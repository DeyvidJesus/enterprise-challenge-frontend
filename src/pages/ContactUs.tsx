import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    numeroCelular: '',
    criticaSugestao: '',
    senha: '',
    roleId: 3
  });

  const [errors, setErrors] = useState({
    nomeCompleto: '',
    email: '',
    numeroCelular: '',
    criticaSugestao: '',
    senha: '',
    roleId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = { nomeCompleto: '', email: '', numeroCelular: '', criticaSugestao: '', senha: '', roleId: '' };
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

    if (!formData.criticaSugestao) {
      newErrors.criticaSugestao = 'Mensagem é obrigatória.';
      isValid = false;
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória.';
      isValid = false;
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'A senha deve ter ao menos 6 caracteres.';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('enterprise-challenge-backend-production.up.railway.app/contatos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Cadastro realizado com sucesso!');
          setFormData({ nomeCompleto: '', email: '', numeroCelular: '', criticaSugestao: '', senha: '', roleId: 3 });
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
      <form 
        className='w-full mx-4 md:w-1/2 h-3/4 justify-center items-center flex rounded flex-col border-2 border-black p-6 bg-gray-50 bg-opacity-70' 
        onSubmit={handleSubmit}
        aria-labelledby="contact-form-title"
      >
        <h2 id="contact-form-title" className="text-center font-semibold text-2xl mb-4">Fale Conosco</h2>
        
        <label htmlFor="nomeCompleto" className="font-medium w-2/3">Nome Completo:</label>
        <input
          id="nomeCompleto"
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
          aria-describedby="nomeCompleto-error"
        />
        {errors.nomeCompleto && <span id="nomeCompleto-error" className="text-red-600 font-medium mb-1" role="alert">{errors.nomeCompleto}</span>}

        <label htmlFor="email" className="font-medium w-2/3">Email:</label>
        <input
          id="email"
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby="email-error"
        />
        {errors.email && <span id="email-error" className="text-red-600 font-medium mb-1" role="alert">{errors.email}</span>}

        <label htmlFor="numeroCelular" className="font-medium w-2/3">Telefone:</label>
        <input
          id="numeroCelular"
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="text"
          name="numeroCelular"
          value={formData.numeroCelular}
          onChange={handleChange}
          aria-describedby="numeroCelular-error"
        />
        {errors.numeroCelular && <span id="numeroCelular-error" className="text-red-600 font-medium mb-1" role="alert">{errors.numeroCelular}</span>}

        <label htmlFor="criticaSugestao" className="font-medium w-2/3">Mensagem:</label>
        <textarea
          id="criticaSugestao"
          className="w-2/3 p-2 rounded border-black border mb-2"
          name="criticaSugestao"
          rows={3}
          value={formData.criticaSugestao}
          onChange={handleChange}
          aria-describedby="criticaSugestao-error"
        />
        {errors.criticaSugestao && <span id="criticaSugestao-error" className="text-red-600 font-medium mb-1" role="alert">{errors.criticaSugestao}</span>}

        <label htmlFor="senha" className="font-medium w-2/3">Senha:</label>
        <input
          id="senha"
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="text"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          aria-describedby="senha-error"
        />
        {errors.senha && <span id="senha-error" className="text-red-600 font-medium mb-1" role="alert">{errors.senha}</span>}

        
        <button className="w-2/3 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4" type="submit">Enviar</button>
      </form>
    </div>
  );
};

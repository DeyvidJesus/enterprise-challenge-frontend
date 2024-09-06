import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const Learn: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    numeroCelular: '',
    idade: '',
    conheceProgramacao: false,
    oficinaSelecionada: ''
  });

  const [errors, setErrors] = useState({
    nomeCompleto: '',
    email: '',
    numeroCelular: '',
    idade: ''
  });

  const [oficinas, setOficinas] = useState([]);

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await fetch('http://localhost:3000/oficinas');
        const data = await response.json();
        setOficinas(data);
      } catch (error) {
        console.error('Erro ao buscar oficinas:', error);
        toast.error('Erro ao carregar oficinas.');
      }
    };

    fetchOficinas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value === 'yes'
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const validate = () => {
    const newErrors = { nomeCompleto: '', email: '', numeroCelular: '', idade: '' };
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
      newErrors.numeroCelular = 'Número de celular é obrigatório.';
      isValid = false;
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.numeroCelular)) {
      newErrors.numeroCelular = 'Número de celular inválido. Formato esperado: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.';
      isValid = false;
    }

    if (!formData.idade) {
      newErrors.idade = 'Idade é obrigatória.';
      isValid = false;
    } else if (!/^\d+$/.test(formData.idade) || +formData.idade < 1 || +formData.idade > 120) {
      newErrors.idade = 'Idade deve ser um número entre 1 e 120.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:8091/cadastros/alunos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Cadastro realizado com sucesso!');
          setFormData({ nomeCompleto: '', email: '', numeroCelular: '', idade: '', conheceProgramacao: false, oficinaSelecionada: '' });
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
      <form className='w-full max-w-lg mx-4 md:w-1/2 h-auto flex flex-col justify-center items-center rounded border-2 border-black p-6 bg-gray-50 bg-opacity-70' onSubmit={handleSubmit}>
        <h2 className="text-center font-semibold text-2xl mb-6">Cadastro de Alunos</h2>

        <label className="font-medium mb-1 w-full text-left">Nome Completo:</label>
        <input
          className={`w-full p-2 rounded border border-gray-300 mb-2 ${errors.nomeCompleto ? 'border-red-500' : ''}`}
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
        />
        {errors.nomeCompleto && <span className="text-red-600 font-medium mb-2">{errors.nomeCompleto}</span>}

        <label className="font-medium mb-1 w-full text-left">Email:</label>
        <input
          className={`w-full p-2 rounded border border-gray-300 mb-2 ${errors.email ? 'border-red-500' : ''}`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="text-red-600 font-medium mb-2">{errors.email}</span>}

        <label className="font-medium mb-1 w-full text-left">Telefone:</label>
        <input
          className={`w-full p-2 rounded border border-gray-300 mb-2 ${errors.numeroCelular ? 'border-red-500' : ''}`}
          type="text"
          name="numeroCelular"
          value={formData.numeroCelular}
          onChange={handleChange}
        />
        {errors.numeroCelular && <span className="text-red-600 font-medium mb-2">{errors.numeroCelular}</span>}

        <label className="font-medium mb-1 w-full text-left">Idade:</label>
        <input
          className={`w-full p-2 rounded border border-gray-300 mb-2 ${errors.idade ? 'border-red-500' : ''}`}
          type="number"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
        />
        {errors.idade && <span className="text-red-600 font-medium mb-2">{errors.idade}</span>}

        <label className="font-medium mb-2 w-full text-left">Possui conhecimentos em tecnologia?</label>
        <div className="flex mb-4 w-full">
          <label className="mr-4 flex items-center">
            <input
              type="radio"
              name="conheceProgramacao"
              value="yes"
              checked={formData.conheceProgramacao === true}
              onChange={handleChange}
              className='mr-2'
            />
            Sim
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="conheceProgramacao"
              value="no"
              checked={formData.conheceProgramacao === false}
              onChange={handleChange}
              className='mr-2'
            />
            Não
          </label>
        </div>

        {/* Seção do select para oficinas */}
        <label className="font-medium mb-1 w-full text-left">Selecione uma Oficina:</label>
        <select
          className="w-full p-2 rounded border border-gray-300 mb-2"
          name="oficinaSelecionada"
          value={formData.oficinaSelecionada}
          onChange={handleChange}
        >
          <option value="">Selecione uma oficina</option>
          {oficinas.map((oficina: any) => (
            <option key={oficina.id} value={oficina.id}>
              {oficina.nome}
            </option>
          ))}
        </select>

        <button className="w-full bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4" type="submit">Enviar</button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    // cpf: '',
    email: '',
    phone: '',
    motivation: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    // cpf: '',
    email: '',
    phone: '',
    motivation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = { fullName: '', email: '', phone: '', motivation: '' };
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Nome completo é obrigatório.';
      isValid = false;
    }

    // if (!formData.cpf) {
    //   newErrors.cpf = 'CPF é obrigatório.';
    //   isValid = false;
    // } else if (!/^\d{11}$/.test(formData.cpf)) {
    //   newErrors.cpf = 'CPF deve ter 11 dígitos.';
    //   isValid = false;
    // }

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

    if (!formData.motivation) {
      newErrors.motivation = 'Motivação é obrigatória.';
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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Inscrição realizada com sucesso!');
          setFormData({ fullName: '', email: '', phone: '', motivation: '' });
        } else {
          toast.error('Falha ao enviar inscrição.');
        }
      } catch (error) {
        toast.error('Erro ao enviar inscrição.');
      }
    }
  };

  return (
    <div className='w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]'>
      <form className='w-1/2 h-full justify-center items-center flex rounded flex-col border-2 border-black p-6 bg-gray-50 bg-opacity-70' onSubmit={handleSubmit}>
        <h2 className="text-center font-semibold text-2xl mb-4">Inscrição de Voluntários</h2>

        <label className="font-medium w-2/3">Nome Completo:</label>
        <input
          className="w-2/3 p-2 rounded border-black border mb-2"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="text-red-600 font-medium mb-1">{errors.fullName}</span>}

        {/* <label className="font-medium w-2/3">CPF:</label>
        <input
          className="w-96 p-2 rounded border-black border mb-2"
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
        />
        {errors.cpf && <span className="text-red-600 font-medium mb-1">{errors.cpf}</span>} */}

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

        <label className="font-medium w-2/3">Motivação:</label>
        <textarea
          className="w-2/3 p-2 rounded border-black border mb-2"
          name="motivation"
          rows={3}
          value={formData.motivation}
          onChange={handleChange}
        />
        {errors.motivation && <span className="text-red-600 font-medium mb-1">{errors.motivation}</span>}

        <button className="w-2/3 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4" type="submit">Enviar</button>
      </form>
    </div>
  );
};

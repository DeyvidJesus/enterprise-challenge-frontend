import React, { useState } from 'react';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = { fullName: '', email: '', phone: '', message: '' };
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

    if (!formData.message) {
      newErrors.message = 'Mensagem é obrigatória.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Dados do formulário:', formData);
      // Aqui você pode adicionar a lógica para enviar os dados do formulário para um backend ou serviço de email.
    }
  };

  return (
    <div className='w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]'>
      <form className='w-1/2 h-3/4 justify-center items-center flex rounded flex-col border-2 border-black p-6 bg-gray-50 bg-opacity-70' onSubmit={handleSubmit}>
        <h2 className="text-center font-semibold text-2xl mb-4">Fale Conosco</h2>
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

        <label className="font-medium w-2/3">Mensagem:</label>
        <textarea
          className="w-2/3 p-2 rounded border-black border mb-2"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className="text-red-600 font-medium mb-1">{errors.message}</span>}

        <button className="w-2/3 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4" type="submit">Enviar</button>
      </form>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Oficina } from "../types/entities";

export const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    numeroCelular: "",
    motivacao: "",
    oficinaId: "",
    senha: "",
    aceitaTermo: false, // Adicionando o campo para aceitar os termos
    roleId: 2,
  });

  const [errors, setErrors] = useState({
    nomeCompleto: "",
    email: "",
    numeroCelular: "",
    motivacao: "",
    oficinaId: "",
    senha: "",
    aceitaTermo: "", // Campo de erro para termos
    roleId: "",
  });

  const [oficinas, setOficinas] = useState([]);

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await fetch("http://localhost:8091/oficinas");
        const data = await response.json();
        console.log("oficinas", data);
        setOficinas(data);
      } catch (error) {
        console.error("Erro ao buscar oficinas:", error);
        toast.error("Erro ao carregar oficinas.");
      }
    };

    fetchOficinas();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement; // Usando cast para HTMLInputElement

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked, // Atualizando o estado para checkbox
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {
      nomeCompleto: "",
      email: "",
      numeroCelular: "",
      motivacao: "",
      oficinaId: "",
      senha: "",
      aceitaTermo: "",
      roleId: "",
    };
    let isValid = true;

    if (!formData.nomeCompleto) {
      newErrors.nomeCompleto = "Nome completo é obrigatório.";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido.";
      isValid = false;
    }

    if (!formData.numeroCelular) {
      newErrors.numeroCelular = "Telefone é obrigatório.";
      isValid = false;
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.numeroCelular)) {
      newErrors.numeroCelular =
        "Telefone inválido. Formato esperado: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.";
      isValid = false;
    }

    if (!formData.motivacao) {
      newErrors.motivacao = "Motivação é obrigatória.";
      isValid = false;
    }

    if (!formData.oficinaId) {
      newErrors.oficinaId = "Oficina é obrigatória.";
      isValid = false;
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória.";
      isValid = false;
    } else if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter ao menos 6 caracteres.";
      isValid = false;
    }

    if (!formData.aceitaTermo) {
      newErrors.aceitaTermo = "Você deve aceitar os termos e condições.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:8091/voluntarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Inscrição realizada com sucesso!");
          // Garantindo que roleId seja incluído ao redefinir formData
          setFormData({
            nomeCompleto: "",
            email: "",
            numeroCelular: "",
            motivacao: "",
            oficinaId: "",
            senha: "",
            aceitaTermo: false,
            roleId: 2,
          });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Falha ao enviar inscrição.");
        }
      } catch (error) {
        toast.error("Erro ao enviar inscrição.");
      }
    }
  };

  return (
    <div className="w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]">
      <form
        className="w-full mx-4 md:w-1/2 h-full flex flex-col items-center rounded border-2 border-black p-6 bg-gray-50 bg-opacity-70"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center font-semibold text-2xl mb-4">
          Inscrição de Voluntários
        </h2>

        <label className="font-medium w-2/3" htmlFor="nomeCompleto">
          Nome Completo:
        </label>
        <input
          id="nomeCompleto"
          className={`w-2/3 p-2 rounded border ${
            errors.nomeCompleto ? "border-red-500" : "border-black"
          } mb-2`}
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
          aria-describedby="nomeCompleto-error"
        />
        {errors.nomeCompleto && (
          <span
            id="nomeCompleto-error"
            className="text-red-600 font-medium mb-1"
          >
            {errors.nomeCompleto}
          </span>
        )}

        <label className="font-medium w-2/3" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          className={`w-2/3 p-2 rounded border ${
            errors.email ? "border-red-500" : "border-black"
          } mb-2`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby="email-error"
        />
        {errors.email && (
          <span id="email-error" className="text-red-600 font-medium mb-1">
            {errors.email}
          </span>
        )}

        <label className="font-medium w-2/3" htmlFor="numeroCelular">
          Telefone:
        </label>
        <input
          id="numeroCelular"
          className={`w-2/3 p-2 rounded border ${
            errors.numeroCelular ? "border-red-500" : "border-black"
          } mb-2`}
          type="text"
          name="numeroCelular"
          value={formData.numeroCelular}
          onChange={handleChange}
          aria-describedby="numeroCelular-error"
        />
        {errors.numeroCelular && (
          <span
            id="numeroCelular-error"
            className="text-red-600 font-medium mb-1"
          >
            {errors.numeroCelular}
          </span>
        )}

        <label className="font-medium w-2/3" htmlFor="motivacao">
          Motivação:
        </label>
        <textarea
          id="motivacao"
          className={`w-2/3 p-2 rounded border ${
            errors.motivacao ? "border-red-500" : "border-black"
          } mb-2`}
          name="motivacao"
          rows={3}
          value={formData.motivacao}
          onChange={handleChange}
          aria-describedby="motivacao-error"
        />
        {errors.motivacao && (
          <span id="motivacao-error" className="text-red-600 font-medium mb-1">
            {errors.motivacao}
          </span>
        )}

        {/* Seção do select para oficinas */}
        <label className="font-medium w-2/3" htmlFor="oficinaId">
          Selecione uma Oficina:
        </label>
        <select
          id="oficinaId"
          className="w-2/3 p-2 rounded border border-black mb-2"
          name="oficinaId"
          value={formData.oficinaId}
          onChange={handleChange}
        >
          <option value="">Selecione uma oficina</option>
          {oficinas.map((oficina: Oficina) => (
            <option key={oficina.id} value={oficina.id}>
              {oficina.nomeOficina} - {oficina.horarios}
            </option>
          ))}
        </select>

        <label className="font-medium w-2/3" htmlFor="senha">
          Senha:
        </label>
        <input
          id="senha"
          className={`w-2/3 p-2 rounded border ${
            errors.senha ? "border-red-500" : "border-black"
          } mb-2`}
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          aria-describedby="senha-error"
        />
        {errors.senha && (
          <span id="senha-error" className="text-red-600 font-medium mb-1">
            {errors.senha}
          </span>
        )}

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="aceitaTermo"
            checked={formData.aceitaTermo}
            onChange={handleChange}
            className="mr-2"
          />
          Eu aceito os
          <a
            href="/termos-e-condicoes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-1"
          >
            termos e condições
          </a>
        </label>
        {errors.aceitaTermo && (
          <span className="text-red-600 font-medium mb-2">
            {errors.aceitaTermo}
          </span>
        )}

        <button
          className="w-2/3 bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

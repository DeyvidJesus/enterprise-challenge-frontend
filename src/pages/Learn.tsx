import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Oficina } from "../types/entities";

export const Learn: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    numeroCelular: "",
    idade: "",
    conheceProgramacao: false,
    oficinaId: "",
    senha: "",
    roleId: 1,
    aceitaTermo: false,
  });

  const [errors, setErrors] = useState({
    nomeCompleto: "",
    email: "",
    numeroCelular: "",
    idade: "",
    conheceProgramacao: "",
    oficinaId: "",
    senha: "",
    roleId: "",
    aceitaTermo: "",
  });

  const [oficinas, setOficinas] = useState([]);

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await fetch("http://localhost:8091/oficinas");
        const data = await response.json();
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
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value === "yes",
      }));
    } else if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {
      nomeCompleto: "",
      email: "",
      numeroCelular: "",
      idade: "",
      conheceProgramacao: "",
      oficinaId: "",
      senha: "",
      roleId: "",
      aceitaTermo: "",
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
      newErrors.numeroCelular = "Número de celular é obrigatório.";
      isValid = false;
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.numeroCelular)) {
      newErrors.numeroCelular =
        "Número de celular inválido. Formato esperado: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.";
      isValid = false;
    }

    if (!formData.idade) {
      newErrors.idade = "Idade é obrigatória.";
      isValid = false;
    } else if (
      !/^\d+$/.test(formData.idade) ||
      +formData.idade < 1 ||
      +formData.idade > 120
    ) {
      newErrors.idade = "Idade deve ser um número entre 1 e 120.";
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
        const response = await fetch("http://localhost:8091/alunos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Cadastro realizado com sucesso!");
          setFormData({
            nomeCompleto: "",
            email: "",
            numeroCelular: "",
            idade: "",
            conheceProgramacao: false,
            oficinaId: "",
            senha: "",
            roleId: 1,
            aceitaTermo: false,
          });
        } else {
          console.error("Resposta do servidor:", response);
          toast.error("Falha ao enviar cadastro.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        toast.error("Erro ao enviar cadastro.");
      }
    }
  };

  return (
    <div className="w-screen bg-cover py-10 flex justify-center h-full max-h-full max-w-full bg-[url(/images/background.jpg)]">
      <form
        className="w-full max-w-lg mx-4 md:w-1/2 h-auto flex flex-col justify-center items-center rounded border-2 border-black p-6 bg-gray-50 bg-opacity-70"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center font-semibold text-2xl mb-6">
          Cadastro de Alunos
        </h2>

        <label className="font-medium mb-1 w-full text-left">
          Nome Completo:
        </label>
        <input
          className={`w-full p-2 rounded border ${
            errors.nomeCompleto ? "border-red-500" : "border-black"
          } mb-2`}
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
        />
        {errors.nomeCompleto && (
          <span className="text-red-600 font-medium mb-2">
            {errors.nomeCompleto}
          </span>
        )}

        <label className="font-medium mb-1 w-full text-left">Email:</label>
        <input
          className={`w-full p-2 rounded border ${
            errors.email ? "border-red-500" : "border-black"
          } mb-2`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="text-red-600 font-medium mb-2">{errors.email}</span>
        )}

        <label className="font-medium mb-1 w-full text-left">Telefone:</label>
        <input
          className={`w-full p-2 rounded border ${
            errors.numeroCelular ? "border-red-500" : "border-black"
          } mb-2`}
          type="text"
          name="numeroCelular"
          value={formData.numeroCelular}
          onChange={handleChange}
        />
        {errors.numeroCelular && (
          <span className="text-red-600 font-medium mb-2">
            {errors.numeroCelular}
          </span>
        )}

        <label className="font-medium mb-1 w-full text-left">Idade:</label>
        <input
          className={`w-full p-2 rounded border ${
            errors.idade ? "border-red-500" : "border-black"
          } mb-2`}
          type="number"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
        />
        {errors.idade && (
          <span className="text-red-600 font-medium mb-2">{errors.idade}</span>
        )}

        <label className="font-medium mb-2 w-full text-left">
          Possui conhecimentos em tecnologia?
        </label>
        <div className="flex mb-4 w-full">
          <label className="mr-4 flex items-center">
            <input
              type="radio"
              name="conheceProgramacao"
              value="yes"
              checked={formData.conheceProgramacao === true}
              onChange={handleChange}
              className="mr-2"
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
              className="mr-2"
            />
            Não
          </label>
        </div>

        {/* Seção do select para oficinas */}
        <label className="font-medium mb-1 w-full text-left">
          Selecione uma Oficina:
        </label>
        <select
          className={`w-full p-2 rounded border ${
            errors.senha ? "border-red-500" : "border-black"
          } mb-2`}
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

        <label className="font-medium mb-1 w-full text-left">Senha:</label>
        <input
          className={`w-full p-2 rounded border ${
            errors.senha ? "border-red-500" : "border-black"
          } mb-2`}
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
        />
        {errors.senha && (
          <span className="text-red-600 font-medium mb-2">{errors.senha}</span>
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
          className="w-full bg-green-700 p-2 text-white font-medium rounded hover:bg-green-600 mt-4"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

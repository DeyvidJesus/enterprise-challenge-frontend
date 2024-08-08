import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

// Tipo base
interface Pessoa {
  nomeCompleto: string;
  numeroCelular: string;
  email: string;
}

// Tipos específicos
interface Voluntario extends Pessoa {
  motivacao: string;
}

interface Aluno extends Pessoa {
  idade: number;
  conheceProgramacao: boolean;
}

interface Contato extends Pessoa {
  criticaSugestao: string;
}

export function Dashboard() {
  const [cookies] = useCookies(["token"]);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [contatos, setContatos] = useState<Contato[]>([]);

  useEffect(() => {
    const token = cookies["token"];

    if (!token) {
      window.location.assign("http://localhost:4200/");
    }

    async function getData() {
      try {
        const [voluntariosResponse, alunosResponse, contatosResponse] = await Promise.all([
          fetch('http://localhost:8091/cadastros/voluntarios', { method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
          }}),
          fetch('http://localhost:8091/cadastros/alunos', { method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
          }}),
          fetch('http://localhost:8091/cadastros/contatos', { method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
          }})
        ]);

        if (voluntariosResponse.ok && alunosResponse.ok && contatosResponse.ok) {
          setVoluntarios(await voluntariosResponse.json());
          setAlunos(await alunosResponse.json());
          setContatos(await contatosResponse.json());
        } else {
          toast.error('Falha ao carregar os dados.');
        }
      } catch (error) {
        toast.error('Erro ao carregar os dados.');
      }
    }

    getData();
  }, [cookies]);

  return (
    <div className="flex flex-col p-6 bg-gray-100 min-h-screen w-screen max-w-full">
      <h1 className="text-6xl text-gray-800 font-semibold mb-10 text-center">Dashboard</h1>
      
      <div className="mb-10 overflow-auto" aria-labelledby="voluntarios-section">
        <h2 id="voluntarios-section" className="text-3xl text-gray-700 mb-4" role="heading" aria-level={2}>Voluntários</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md" aria-label="Tabela de Voluntários">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Nome Completo</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Email</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Telefone</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Motivação</th>
            </tr>
          </thead>
          <tbody>
            {voluntarios.map((voluntario, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{voluntario.nomeCompleto}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{voluntario.email}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{voluntario.numeroCelular}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{voluntario.motivacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10 overflow-auto" aria-labelledby="contatos-section">
        <h2 id="contatos-section" className="text-3xl text-gray-700 mb-4" role="heading" aria-level={2}>Contatos</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md" aria-label="Tabela de Contatos">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Nome Completo</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Telefone</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Email</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Mensagem</th>
            </tr>
          </thead>
          <tbody>
            {contatos.map((contato, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{contato.nomeCompleto}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{contato.numeroCelular}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{contato.email}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{contato.criticaSugestao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10 overflow-auto" aria-labelledby="alunos-section">
        <h2 id="alunos-section" className="text-3xl text-gray-700 mb-4" role="heading" aria-level={2}>Alunos</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md" aria-label="Tabela de Alunos">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Nome Completo</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Telefone</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Email</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Idade</th>
              <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Conhece Programação</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{aluno.nomeCompleto}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{aluno.numeroCelular}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{aluno.email}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{aluno.idade}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{aluno.conheceProgramacao ? 'Sim' : 'Não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

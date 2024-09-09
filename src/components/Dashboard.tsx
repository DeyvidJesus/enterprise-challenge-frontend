import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { Oficina } from "../types/entities";

export function Dashboard() {

  const [cookies] = useCookies(["token", "role", "email"]);
  const [oficina, setOficina] = useState<Oficina>({ id: -1, nomeOficina: '', horarios: ''});
  const [userRole, setUserRole] = useState<string>('admin');
  const [userEmail, setUserEmail] = useState<string>('');
  const [horarios, setHorarios] = useState<any[]>([]);

  useEffect(() => {
    const token = cookies["token"];
    const emailFromCookie = cookies["email"];

    if (!token) {
      window.location.assign("http://localhost:4200/");
    }

    if (emailFromCookie) {
      setUserEmail(emailFromCookie);
    }

  }, [cookies, userEmail]);

  useEffect(() => {
    const token = cookies["token"];
    const roleFromCookie = cookies["role"];
    const emailFromCookie = cookies["email"];

    if (!token) {
      window.location.assign("http://localhost:4200/");
    }

    async function getData(emailFromCookie: string, roleFromCookie: string) {
      try {
        const [oficinasResponse] = await Promise.all([
          fetch('http://localhost:8091/oficinas-por-usuario/' + encodeURI(emailFromCookie) + '?role=' + roleFromCookie, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        ]);

        if (oficinasResponse.ok) {

          var response = await oficinasResponse.json();

          let horario = response.horarios.split(",");

          let dias = horario[0].split("/");
          let horas = horario[1];
          let horariosAulas: any[] = [];

          dias.forEach((d: string) => horariosAulas.push({dia: d, hora: horas}));

          setHorarios(horariosAulas);

          setOficina(response);

        } else {
          toast.error('Falha ao carregar os dados.');
        }
      } catch (error) {
        console.log(error);
        toast.error('Erro ao carregar os dados.');
      }
    }

    if (roleFromCookie === 'ROLE_ALUNO' || roleFromCookie === 'ROLE_VOLUNTARIO') {
      getData(emailFromCookie, roleFromCookie);
    }

    if (roleFromCookie) {
      setUserRole(roleFromCookie);
    }

  }, [cookies, userRole]);

  return (

  
    <div className="flex flex-col p-6 bg-gray-100 w-screen max-w-full">
      {userRole === "ROLE_ALUNO" && (
        <h1 className="text-6xl text-gray-800 font-semibold mb-10 text-center">
          Dashboard Aluno
        </h1>
      )}
      {userRole === "ROLE_VOLUNTARIO" && (
        <h1 className="text-6xl text-gray-800 font-semibold mb-10 text-center">
          Dashboard Voluntário
        </h1>
      )}
      {userRole === "ROLE_CONTATO" && (
        <div>
          
        </div>
      )}
      {(userRole === "ROLE_ALUNO" || userRole === "ROLE_VOLUNTARIO") && (
        <>
          <div className="mb-10 overflow-auto" aria-labelledby="voluntarios-section">
            <h2 id="voluntarios-section" className="text-3xl text-gray-700 mb-4" role="heading" aria-level={2}>Tabela de Horários</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md" aria-label="Tabela de Horários">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Segunda</th>
                  <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Terça</th>
                  <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Quarta</th>
                  <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Quinta</th>
                  <th scope="col" className="py-2 px-4 border-b text-center whitespace-nowrap">Sexta</th>

                </tr>
              </thead>
              <tbody>
                {horarios.map((horario, index) => (
                  <><tr key={index} className="hover:bg-gray-100">
                      {horario.dia === 'SEG' && (
                        <td className="py-2 px-4 border-b text-center whitespace-nowrap">{horario.hora} - {oficina.nomeOficina}</td>
                      )}
                      <td className="py-2 px-4 border-b text-center whitespace-nowrap"></td>
                      {horario.dia === 'TER' && (
                        <td className="py-2 px-4 border-b text-center whitespace-nowrap">{horario.hora} - {oficina.nomeOficina}</td>
                      )}
                      <td className="py-2 px-4 border-b text-center whitespace-nowrap"></td>
                      {horario.dia === 'QUA' && (
                        <td className="py-2 px-4 border-b text-center whitespace-nowrap">{horario.hora} - {oficina.nomeOficina}</td>
                      )}
                      <td className="py-2 px-4 border-b text-center whitespace-nowrap"></td>
                      {horario.dia === 'QUI' && (
                        <td className="py-2 px-4 border-b text-center whitespace-nowrap">{horario.hora} - {oficina.nomeOficina}</td>
                      )}
                      <td className="py-2 px-4 border-b text-center whitespace-nowrap"></td>
                      {horario.dia === 'SEX' && (
                        <td className="py-2 px-4 border-b text-center whitespace-nowrap">{horario.hora} - {oficina.nomeOficina}</td>
                      )}
                      <td className="py-2 px-4 border-b text-center whitespace-nowrap"></td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

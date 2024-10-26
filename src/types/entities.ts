// Tipo base
interface Pessoa {
  nomeCompleto: string;
  numeroCelular: string;
  email: string;
}

// Tipos específicos
export interface Voluntario extends Pessoa {
  id: string;
  motivacao: string;
  oficinas?: Oficina[];
}

export interface Aluno extends Pessoa {
  id: string;
  idade: number;
  conheceProgramacao: boolean;
  oficinas?: Oficina[];
}

export interface Contato extends Pessoa {
  criticaSugestao: string;
}

export interface Oficina {
  id: number;
  nomeOficina: string;
  horarios: string;
}
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
  oficinas?: Oficina[]; // Adicionado para associar oficinas aos voluntários
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

// Novo tipo
export interface Oficina {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  alunos?: string[];
  voluntarios?: string[];
}

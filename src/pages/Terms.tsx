import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Termos e Condições</h1>
      <p>
        Estes Termos e Condições regem o uso do nosso serviço. Ao utilizar nosso serviço, você concorda com estes termos.
      </p>
      <h2 className="text-xl font-semibold mt-4">1. Aceitação dos Termos</h2>
      <p>
        Ao acessar ou usar o serviço, você concorda em ficar vinculado a estes Termos e Condições.
      </p>
      <h2 className="text-xl font-semibold mt-4">2. Modificações</h2>
      <p>
        Podemos modificar estes termos a qualquer momento. É sua responsabilidade verificar regularmente.
      </p>
    </div>
  );
};

export default TermsAndConditions;

export function Home() {
  return (
    <div className="w-screen max-w-full flex flex-col items-center mt-8 px-4">
      <h1 className="text-3xl text-blue-700 text-center font-semibold mb-8">
        Venha participar das nossas oficinas, <br /> ou seja um voluntário!
      </h1>
      <img 
        className="my-8 w-full max-w-lg object-cover" 
        src="/images/sexo.png" 
        alt="Meninas e mulheres jovens participando de oficinas de programação"
      />
      <p className="text-center w-full max-w-3xl font-medium mb-8">
        Ainda que meninas e jovens mulheres sejam minoria nas oficinas de programação de jogos, o número de crianças e adolescentes pertencentes a esse grupo vem aumentando a cada ano, o que significa que mais mulheres estão se engajando na área de ciência da computação, área que antes era dominada por homens.
      </p>
      <img 
        className="my-8 w-full max-w-lg object-cover" 
        src="/images/grupos.png" 
        alt="Crianças e adolescentes de grupos étnico-raciais minoritários participando de oficinas"
      />
      <p className="text-center w-full max-w-3xl font-medium">
        Pudemos notar também que mais crianças e adolescentes de grupos étnico-raciais minoritários vêm cada vez mais marcando presença nas nossas oficinas.
      </p>
    </div>
  );
}

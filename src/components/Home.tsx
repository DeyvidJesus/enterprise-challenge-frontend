export function Home() {
  return (
    <div className="w-screen max-w-full flex flex-col items-center mt-8">
      <h1 className="text-3xl text-blue-700 text-center font-semibold">Venha participar das nossas oficinas, <br /> ou seja um voluntário!</h1>
      <img className="my-8" src="/images/sexo.png" alt="" />
      <p className="text-center w-3/4 font-medium ">Ainda que meninas e jovens mulheres sejam ainda minoria nas oficinas de programação de jogos, o número de crianças e adolescentes pertencentes a esse grupo vem aumentando a cada ano, o que significa que mais mulheres estão se engajando na área de ciência da computação, área que antes era dominada por homens.</p>
      <img className="my-8" src="/images/grupos.png" alt="" />
      <p className="text-center w-3/4 font-medium ">Pudemos notar também que mais crianças e adolescentes de grupos étnicos-raciais minoritários vêm cada vez mais marcando presença nas nossas oficinas.</p>
    </div>
  );
}
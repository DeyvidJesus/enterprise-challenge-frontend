export function Header() {
  return (
    <header className="w-screen max-w-full flex flex-col border-b border-[#dadada]">
      <div className="bg-[#065BF1] text-white flex w-full justify-around">
        <ul className="flex w-1/6 justify-between p-3">
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/facebook.svg" alt="Ícone do Facebook" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/instagram.svg" alt="Ícone do Instagram" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/linkedin.svg" alt="Ícone do Linkedin" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/youtube.svg" alt="Ícone do Youtube" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/x.svg" alt="Ícone do X" /></li>
        </ul>
        <a className="font-semibold self-center pr-4 hover:brightness-90" href="/login">Login</a>
      </div>

      <div className="flex items-center justify-around py-2">
        <a href="/"><img className="w-24" src="/images/logo.png" alt="Logo" /></a>
        <nav className="flex w-1/2 justify-between font-medium text-lg">
          <a href="/">Home</a>
          <a href="/quem-somos">Quem Somos</a>
          <a href="/aprenda">Aprenda</a>
          <a href="/seja-voluntario">Seja um Voluntário</a>
          <a href="/contato">Contato</a>
        </nav>
      </div>
    </header>
  )
}
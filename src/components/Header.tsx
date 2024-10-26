import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Header() {
  const [cookies, , removeCookie] = useCookies(["token", "role", "email"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = cookies["token"];

  function handleLogout() {
    const toastId = toast(
      <div className="flex flex-col items-center">
        <p>Você realmente deseja sair?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              removeCookie("token", { path: '/'});
              removeCookie("role", { path: '/'});
              removeCookie("email", { path: '/'});
              window.location.href = "/login"; // Redireciona para a página de login após o logout
              toast.dismiss(toastId); // Fecha o toast
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sim
          </button>
          <button
            onClick={() => toast.dismiss(toastId)} // Fecha o toast sem fazer logout
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Não
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        draggable: false,
        position: "top-center",
      }
    );
  }

  return (
    <header className="w-screen max-w-full flex flex-col border-b border-[#dadada]">
      {/* Seção de ícones sociais e opções de login/logout */}
      <div className="bg-[#065BF1] text-white flex flex-wrap items-center justify-around p-3 md:flex-nowrap">
        <ul className="flex flex-wrap items-center gap-2 md:gap-4">
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/facebook.svg" alt="Ícone do Facebook" aria-label="Facebook" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/instagram.svg" alt="Ícone do Instagram" aria-label="Instagram" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/linkedin.svg" alt="Ícone do LinkedIn" aria-label="LinkedIn" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/youtube.svg" alt="Ícone do YouTube" aria-label="YouTube" /></li>
          <li><img className="w-5 cursor-pointer hover:brightness-90" src="/images/x.svg" alt="Ícone do X" aria-label="X" /></li>
        </ul>
        <div className="flex items-center">
          <a className="font-semibold hover:brightness-90 text-base md:text-lg" href={token ? "/dashboard" : "/login"}>
            {token ? "Dashboard" : "Login"}
          </a>
          {token && (
            <>
              <a href="/dashboard/profile" className="font-semibold hover:brightness-90 text-base md:text-lg ml-4">
                Perfil
              </a>
              <button
                aria-label="Logout"
                className="py-2 px-4 text-white font-medium bg-blue-900 rounded hover:opacity-90 text-sm md:text-base ml-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Seção do logo e menu hambúrguer */}
      <div className="flex items-center justify-around py-2 md:hidden">
        <a href="/" aria-label="Home">
          <img className="w-24" src="/images/logo.png" alt="Logo" />
        </a>
        <button
          aria-label="Abrir menu"
          className="text-white text-3xl bg-blue-700 p-2 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menu hambúrguer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center md:hidden">
          <nav className="bg-white text-black p-6 rounded-lg shadow-lg absolute top-16 right-0 w-3/4 md:w-1/2" aria-labelledby="menu-title">
            <button
              aria-label="Fechar menu"
              className="absolute top-2 right-2 text-3xl"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
            <div className="flex flex-col items-center mt-4" id="menu-title">
              <a className="py-2 text-lg font-medium" href="/">Home</a>
              <a className="py-2 text-lg font-medium" href="/quem-somos">Quem Somos</a>
              <a className="py-2 text-lg font-medium" href="/aprenda">Aprenda</a>
              <a className="py-2 text-lg font-medium" href="/seja-voluntario">Seja um Voluntário</a>
              <a className="py-2 text-lg font-medium" href="/contato">Contato</a>
            </div>
          </nav>
        </div>
      )}

      {/* Navegação para telas grandes */}
      <div className="hidden md:flex items-center justify-around py-2">
        <a href="/" aria-label="Home">
          <img className="w-24" src="/images/logo.png" alt="Logo" />
        </a>
        <nav className="flex flex-row gap-4 text-lg font-medium">
          <a href="/">Home</a>
          <a href="/quem-somos">Quem Somos</a>
          <a href="/aprenda">Aprenda</a>
          <a href="/seja-voluntario">Seja um Voluntário</a>
          <a href="/contato">Contato</a>
        </nav>
      </div>
    </header>
  );
}

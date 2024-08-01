import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function Dashboard() {
  const [cookies, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies["token"];

    if (!token) {
      window.location.assign("http://localhost:4200/");
    }
  }, [cookies]);

  function handleLogout() {
    removeCookie('token', { path: '/', domain: 'localhost' });
  }

  return (
    <>
      <h1 className="text-6xl text-white mt-10 font-semibold">Dashboard</h1>
      <button className="bg-red-700 py-4 px-8 rounded text-white font-medium mt-6 hover:bg-opacity-95" onClick={handleLogout}>Logout</button>
    </>
  );
}

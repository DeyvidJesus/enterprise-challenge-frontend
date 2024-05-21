import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function Dashboard() {
  const [cookies, removeCookie] = useCookies(["token"])

  useEffect(() => {
    const cookieValue = cookies["token"];
    if (!cookieValue) {
      window.location.assign("http://localhost:4200/");
    }
  }, [])

  function handleLogout() {
    removeCookie("token", "");
    window.location.assign("/");
  }

  return (
    <>
      <h1 className="text-6xl text-white mt-10 font-semibold">Dashboard</h1>
      <button className="bg-red-700 py-4 px-8 rounded text-white font-medium mt-6 hover:bg-opacity-95" onClick={handleLogout}>Logout</button>
    </>
  );
}
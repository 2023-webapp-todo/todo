import Navbar from "@/components/Navbar";
import useCheckAuth from "@/hooks/useCheckAuth";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const authState = useCheckAuth();

  return (
    <>
      <Navbar authState={authState} />
      <Outlet context={authState} />
    </>
  );
}

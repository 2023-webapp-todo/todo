import { useRoutes } from "react-router-dom";
import { routes } from "@/Routes";

export default function App() {
  const elem = useRoutes(routes);

  return <>{elem}</>;
}

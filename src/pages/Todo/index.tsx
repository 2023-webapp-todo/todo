import { Navigate, useOutletContext } from "react-router-dom";

export default function Todo() {
  const authState = useOutletContext();

  if (!authState) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

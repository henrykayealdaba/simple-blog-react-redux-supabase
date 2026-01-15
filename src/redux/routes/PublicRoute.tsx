import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

type Props = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

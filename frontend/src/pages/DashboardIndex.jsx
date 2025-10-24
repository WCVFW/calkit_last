import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/lib/auth";

export default function DashboardIndex() {
  const nav = useNavigate();
  useEffect(() => {
    const u = getUser();
    const role = u?.role || "USER";
    if (role === "ADMIN") nav("/dashboard/admin", { replace: true });
    else if (role === "EMPLOYEE") nav("/dashboard/employee", { replace: true });
    else nav("/dashboard/user", { replace: true });
  }, [nav]);
  return null;
}

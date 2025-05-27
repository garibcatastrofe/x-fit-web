// hooks/useRouteLoader.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useRouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // simulación de carga
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading;
};

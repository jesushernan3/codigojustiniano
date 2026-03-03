import React from "react";
import { useRouteError } from "react-router";

export default function NotFound() {
  const err = useRouteError();
  const status = err?.status || 404;

  return (
    <div>
      <h1>404</h1>
      <p>Ruta o contenido no encontrado. ({status})</p>
    </div>
  );
}

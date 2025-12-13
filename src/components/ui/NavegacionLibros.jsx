import React from "react";
import { Link } from "react-router";

const NavegacionLibros = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Link>Principal 1</Link>
        <Link>Principal 2</Link>
        <Link>Principal 3</Link>
      </div>
      <div></div>
      <Link>Libros</Link>
      <Link>Libros</Link>
      <Link>Libros</Link>
      <Link>Libros</Link>
      <Link>Libros</Link>
      <Link>Libros</Link>
      <Link>Libros</Link>
      <Link>Libros</Link>
    </div>
  );
};

export default NavegacionLibros;

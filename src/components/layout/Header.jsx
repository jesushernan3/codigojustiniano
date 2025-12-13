import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-black min-h-50 text-white">
      <Link to={"/"}>
        <h1 className="text-7xl font-extrabold">CORPUS IURIS CIVILE</h1>
      </Link>
      <h3>Cuerpo Justiniano de Ley Civil</h3>
    </div>
  );
};

export default Header;

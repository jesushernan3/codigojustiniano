import React from "react";
import { Link } from "react-router";

const MenuCodex = () => {
  return (
    <div>
      <nav>
        <Link to={"denovocodice"}>De Novo Codice Componendo</Link>
        <Link>De Iustiniano Codice Confirmando</Link>
        <Link>De Emendionate Codicis Iustiniani Et Secunda Eius Editione</Link>
      </nav>
    </div>
  );
};

export default MenuCodex;

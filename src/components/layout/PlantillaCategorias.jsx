import { Outlet } from "react-router";
import React from "react";
import NavegacionPrincipal from "../ui/NavegacionPrincipal";
import Header from "./Header";
import Footer from "./Footer";
import NavegacionLibros from "../ui/NavegacionLibros";
import { useParams } from "react-router";

const PlantillaCategorias = () => {
  const params = useParams();
  return (
    <>
      <Header />
      <NavegacionPrincipal />
      <main className="container flex mx-auto p-10">
        <div className="grow-3">
          <Outlet />
        </div>
        <div className="grow-0">
          <NavegacionLibros />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PlantillaCategorias;

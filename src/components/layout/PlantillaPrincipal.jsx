import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router";

import React from "react";
import BarraNavegacion from "../ui/NavegacionPrincipal";

const PlantillaPrincipal = () => {
  return (
    <>
      <Header />
      <BarraNavegacion />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PlantillaPrincipal;

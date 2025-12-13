import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center flex-col pt-10 px-5 bg-gray-500">
      <div className="grid grid-cols-4 gap-4" py-10>
        <div>
          <h3 className="mb-3">TIENDAS</h3>
          <ul className="text-sm">
            <li>Brasil</li>
            <li>Chile</li>
            <li>Argentina</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3">PEDIDOS</h3>
          <ul className="text-sm">
            <li>Envios</li>
            <li>Devoluciones</li>
            <li>Garantias</li>
          </ul>
        </div>
        <div>
          <div>
            <h3 className="mb-3">CATEGORIAS</h3>
            <ul className="text-sm">
              <li>Tablas</li>
              <li>Trapecios</li>
              <li>Aros</li>
              <li>Clavas</li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Anotate para recibir!</h3>
          <form action="">
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                  workcation.com/
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="janesmith"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-between py-10 text-xs">
        <div>copyrigth 2025 - persevere</div> <div>logos</div>
      </div>
    </div>
  );
};

export default Footer;

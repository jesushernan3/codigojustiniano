import React from "react";
import { NavLink } from "react-router";
import MenuPrincipal from "./MenuPrincipal";
// import { assets } from "../../assets/assets";
import { MainRoutes } from "../../assets/menuItems";

// function SubMenu({ item }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <li
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <NavLink href={item.path}>
//         {item.title}
//         {item.submenu && isOpen && (
//           <ul className="absolute bg-amber-300 p-1 m-1 w-[120px]">
//             {item.submenu.map((subItem, subIndex) => (
//               <li className="underline-offset-auto bg-amber-200" key={subIndex}>
//                 <SubMenu item={subItem} key={subIndex} />
//               </li>
//             ))}
//           </ul>
//         )}
//       </NavLink>
//     </li>
//   );
// }

const BarraNavegacion = () => {
  return (
    <div className="flex justify-center py-1 px-3 bg-white items-center shadow-md">
      {/* Sección del Menu */}
      <nav className="flex items-center gap-5 relative tracking-widest uppercase font-medium text-sm">
        {MainRoutes.map((menu) => (
          <NavLink to={menu.path} key={menu.id}>
            {menu.title}
          </NavLink>
        ))}
      </nav>

      {/* Sección del Logo */}
      {/* <div>
        <NavLink to="/" className="flex items-center">
          <img src={assets.LogoFondoBlanco} alt="persevere" className="w-12" />
        </NavLink>
      </div> */}

      {/* <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">
        Iniciar Sesion
      </button> */}
    </div>
  );
};
export default BarraNavegacion;

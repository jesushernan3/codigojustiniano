import { NavLink } from "react-router";

const MenuPrincipal = (path, title) => {
  return <NavLink to={path}>{title}</NavLink>;
};

export default MenuPrincipal;

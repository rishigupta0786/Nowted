import archive from "../../assets/archive.svg";
import fav from "../../assets/fav.svg";
import del from "../../assets/del.svg";
import { NavLink } from "react-router-dom";

function More() {
  const menuItems = [
    { to: "/Favorites", label: "Favorites", icon: fav, hover: "hover:bg-gray-700" },
    { to: "/Archive", label: "Archived Notes", icon: archive, hover: "hover:bg-gray-700" },
    { to: "/Trash", label: "Trash", icon: del, hover: "hover:bg-red-600" },
  ];

  return (
    <div className="px-1 mb-4">
      <p className="text-gray-400 text-sm font-semibold  px-2 mb-2 ">MORE</p>
      <div className="flex flex-col">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={`flex items-center gap-3  p-2 rounded-md text-gray-300 
                        transition-all duration-300 ease-in-out 
                        ${item.hover} hover:text-white hover:shadow-md`}
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default More;

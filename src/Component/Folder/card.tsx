import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  text: string;
  lastdate: string;
  folderId: string;
  folderName: string;
  Mode: string;
}

function Card({ title, text, lastdate, id, folderId, folderName, Mode }: CardProps) {
  const [Url, setUrl] = useState("");
  useEffect(() => {
    if (Mode === "Favorites" || Mode === "Archive" || Mode === "Trash") {
      setUrl(`${Mode}/${title}/${id}`);
    } else {
      setUrl(`${folderName}/${folderId}/Notes/${id}`);
    }
  }, [Mode, folderName, folderId, id, title]);

  return (
    <NavLink
      to={`/${Url}`}
      className={({ isActive }) =>
        `block rounded-md p-4 h-20 flex flex-col justify-between transition-all duration-300
         bg-gray-900 text-gray-200 cursor-pointer
         ${
           isActive
                    ? "bg-gray-800 text-white border-l-4 border-neon-green"
             : "hover:bg-gray-800  hover:scale-[1.01]"
         }`
      }
    >
      <h2 className="text-sm font-medium truncate">{title}</h2>
      <p className="text-xs text-gray-400 leading-snug">
        {new Date(lastdate).toLocaleString()} &nbsp; {text.slice(0, 40) + "..."}
      </p>
    </NavLink>
  );
}

export default Card;

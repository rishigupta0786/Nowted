import axios from "axios";
import { useEffect, useState } from "react";
import doc from "../../assets/doc.svg";
import { NavLink } from "react-router-dom";

interface datatypes {
  id: string;
  folderId: string;
  title: string;
  folder: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

function Recent() {
  const RecentApi = "https://nowted-server.remotestate.com/notes/recent";
  const [temp, settemp] = useState<datatypes[]>([]);

  const recentdata = async () => {
    try {
      const response = await axios.get(RecentApi);
      const data = response.data.recentNotes;
      settemp(data);
    } catch (error) {
      console.log("error is ", error);
    }
  };

  useEffect(() => {
    recentdata();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-gray-400 pl-3 pt-2 tracking-wide uppercase">
        Recents
      </p>
      <ul className="flex flex-col w-full">
        {temp.map((e) => (
          <NavLink
            to={`/${e.folder.name}/${e.folder.id}/notes/${e.id}`}
            key={e.id}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-300 ease-in-out
               text-gray-200 
               ${isActive 
                    ? "bg-gray-800 text-white border-l-4 border-neon-green"
                  : "hover:bg-gray-800 "}` 
            }
          >
            <img src={doc} alt="doc" className="h-5 opacity-80" />
            <span className="truncate text-sm">{e.title}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Recent;

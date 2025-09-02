import axios from "axios";
import { useContext, useEffect, useState } from "react";
import addfolder from "../../assets/addfolder.svg";
import folderimg from "../../assets/folder.svg";
import delimg from "../../assets/del.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { RenderContext } from "../../RenderContext";

interface datatypes {
  id: string;
  name: string;
}

function Folderlist() {
  const API = "https://nowted-server.remotestate.com/folders";
  const [folders, setFolders] = useState<datatypes[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");
  const navigate = useNavigate();
  const { setIsRender } = useContext(RenderContext);

  const fetchFolders = async () => {
    try {
      const response = await axios.get(API);
      setFolders(response.data.folders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleClick = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleBlur = async () => {
    if (editingId) {
      try {
        await axios.patch(`${API}/${editingId}`, { name: editValue });
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === editingId ? { ...folder, name: editValue } : folder
          )
        );
        setEditingId("");
        setIsRender(true);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const delfolder = async (id: string) => {
    const delApi = `https://nowted-server.remotestate.com/folders/${id}`;
    try {
      await axios.delete(delApi);
      alert(`Folder deleted.`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addfolders = async () => {
    try {
      const response = await axios.post(API, { name: " New Folder" });
      setFolders([...folders, response.data]);
      fetchFolders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-3">
        <p className="text-base text-slate-300">FOLDERS</p>
        <button onClick={addfolders}>
          <img src={addfolder} alt="add folder" className="h-5" />
        </button>
      </div>
      <ul>
        {folders.map((folder) => (
          <NavLink
            to={`/${folder.name}/${folder.id}`}
            key={folder.id}
            className={({ isActive }) =>
              `flex justify-between items-center py-2 px-3 rounded-md cursor-pointer transition-all duration-300
                ${
                  isActive
                    ? "bg-gray-800 text-white border-l-4 border-neon-green"
                    : "text-gray-300 hover:bg-gray-800  hover:border-gray-600"
                }`
            }
            onDoubleClick={() => handleClick(folder.id, folder.name)}
          >
            <div className="flex gap-3 items-center">
              <img src={folderimg} className="w-5" />
              {editingId === folder.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                  autoFocus
                  className="bg-transparent outline-none border-b w-full border-gray-400 text-white"
                />
              ) : (
                folder.name
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                delfolder(folder.id);
              }}
              className="hover:scale-110 transition-transform duration-200"
            >
              <img src={delimg} className="w-5" />
            </button>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Folderlist;

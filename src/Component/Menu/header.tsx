import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import searchicon from "../../assets/search.svg";
import { useEffect, useState } from "react";
import CreateNote from "./CreateNote";
import close from "../../assets/close.svg";
import axios from "axios";

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: {
    name: string;
    id: string;
  };
}

function Header() {
  const [showInput, setShowInput] = useState(false);
  const [notes, setNotes] = useState<DataTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API =
    "https://nowted-server.remotestate.com/notes?archived=false&deleted=false&limit=*";

  useEffect(() => {
    if (showInput) {
      searchedNotes();
    }
  }, [showInput]);

  const searchedNotes = async () => {
    try {
      const response = await axios.get(API);
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const filteredNotes =
    searchTerm.trim() === ""
      ? []
      : notes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <>
      <div className="flex justify-between items-center px-3 pt-3 relative">
        <NavLink to={"/"}>
          <img src={logo} alt="logo"/>
        </NavLink>

        <button
          onClick={() => {
            setShowInput(!showInput);
            setSearchTerm(""); // reset search when closed
          }}
        //   className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-300"
        >
          <img
            src={showInput ? close : searchicon}
            alt="search icon"
            className="h-5 w-5"
          />
        </button>
      </div>

      {showInput && (
        <div className="relative px-2">
          {/* Search Input */}
          <input
            type="text"
            className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-gray-200 
                       placeholder-gray-500 focus:ring-2 focus:ring-blue-500 
                       outline-none transition-all duration-300"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Small search icon inside input */}
          <img
            src={searchicon}
            alt="search"
            className="absolute left-5 top-1/2 transform -translate-y-1/2 h-4 opacity-70"
          />

          {/* Dropdown results */}
          {searchTerm.trim() !== "" && (
            <div className="absolute top-full left-0 w-full bg-gray-900 shadow-lg border border-gray-700 rounded-lg mt-2 max-h-60 overflow-auto z-10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <NavLink
                    key={note.id}
                    to={`/${note.folder.name}/${note.folder.id}/Notes/${note.id}`}
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                  >
                    {note.title}
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-500 p-3">No matching notes found.</p>
              )}
            </div>
          )}
        </div>
      )}

      {!showInput && <CreateNote />}
    </>
  );
}

export default Header;

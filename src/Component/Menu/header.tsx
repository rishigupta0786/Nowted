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

    const API = "https://nowted-server.remotestate.com/notes?archived=false&deleted=false&limit=*";

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
            <div className="flex justify-between items-center px-2 pt-2 relative">
                <NavLink to={"/"}>
                    <img src={logo} alt="logo" />
                </NavLink>

                <button
                    onClick={() => {
                        setShowInput(!showInput);
                        setSearchTerm(""); // Clear search input on close
                    }}
                >
                    <img src={showInput ? close : searchicon} alt="search icon" className="h-5" />
                </button>
            </div>

            {showInput && (
                <div className="relative">
                    <input
                        type="text"
                        className="border p-2 rounded-sm w-full"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {searchTerm.trim() !== "" && (
                        <div className="absolute top-full overflow-auto  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 left-0 w-full bg-newgray shadow-lg border rounded-md mt-1 max-h-60 z-2">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map((note) => (
                                    <NavLink to={`/${note.folder.name}/${note.folder.id}/Notes/${note.id}`} >
                                        <div key={note.id} className="p-2 hover:bg-blue-500 cursor-pointer">
                                            {note.title}
                                        </div>
                                    </NavLink>
                                ))
                            ) : (
                                <p className="text-gray-500 p-2">No matching notes found.</p>
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

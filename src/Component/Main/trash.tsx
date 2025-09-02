import { NavLink, useParams } from "react-router-dom";
import del from "../../assets/del.svg";
import axios from "axios";
import { useContext } from "react";
import { RenderContext } from "../../RenderContext";

interface TrashProps {
    id: string;
    closeMenu: () => void;
    title: string
    foldername: string;
    folderid: string;
}

function Trash({ id, closeMenu, folderid, foldername }: TrashProps) {
    const delApi = `https://nowted-server.remotestate.com/notes/${id}`;
    const { setMainRender } = useContext(RenderContext);
    const { folderId } = useParams();
    const deleteNote = async () => {
        try {
            await axios.delete(delApi);
            alert("Note deleted successfully");
            setMainRender(true);
            closeMenu();
        } catch (error) {
            console.error("problem with the delete request:", error);
            alert("Failed to delete t");
        }
    };

    return (
        <NavLink to={folderId ? `/${foldername}/${folderid}/Notes/${id}` : "#"}
            onClick={deleteNote}
            className="flex gap-3 hover:bg-red-500 p-2 rounded-md cursor-pointer"
        >
            <img src={del} alt="Delete Icon" />
            <li>Trash</li>
        </NavLink>
    );
}

export default Trash;
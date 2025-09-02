import { useContext, useState } from "react";
import archive from "../../assets/archive.svg";
import axios from "axios";
import { NavLink, } from "react-router-dom";
import { RenderContext } from "../../RenderContext";

interface ArchivebtnProps {
    isArc: boolean;
    id: string;
    closeMenu: () => void;
    folderid: string
    foldername: string
}

function Archivebtn({ isArc, id, closeMenu, folderid, foldername }: ArchivebtnProps) {


    const [isarc, setIsarc] = useState(isArc);
    const context = useContext(RenderContext);
    const { setIsRender } = context

    const handleArchive = async (): Promise<void> => {
        const newArchiveState = !isarc;
        setIsarc(newArchiveState);
        try {
            await axios.patch(
                `https://nowted-server.remotestate.com/notes/${id}`,
                { isArchived: newArchiveState },
                { headers: { "Content-Type": "application/json" } }
            );
            alert("Notes Archived Successfully")
            setIsRender(true);
            closeMenu();
        } catch (error) {
            console.error("Error archiving note:", error);

        }
    };

    return (
        <div>
            <NavLink to={isarc ? "/Archive" : `/${foldername}/${folderid}`}
                onClick={handleArchive}
                className="hover:w-full flex gap-3 hover:bg-gray-500 p-2 rounded-md cursor-pointer"
            >
                <img src={archive} alt="Archive Icon" />
                {isarc ? "Unarchive" : "Archive"}
            </NavLink>
        </div>

    );
}

export default Archivebtn;
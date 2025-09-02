import { useContext, useState } from "react";
import fav from "../../assets/fav.svg";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { RenderContext } from "../../RenderContext";

interface FavbtnProps {
    isFav: boolean;
    id: string;
    closeMenu: () => void;
    folderid: string;
    foldername: string;
}

function Favbtn({ isFav, id, closeMenu, folderid, foldername }: FavbtnProps) {
    const [isfav, setIsfav] = useState(isFav);
    const { folderId } = useParams();
    const context = useContext(RenderContext);
    const { setMainRender, setIsRender } = context;

    const isFavchange = async (): Promise<void> => {
        const newFavState = !isfav;
        setIsfav(newFavState);
        try {
            await axios.patch(
                `https://nowted-server.remotestate.com/notes/${id}`,
                { isFavorite: newFavState },
            );

            setMainRender(true);
            setIsRender(true)
            setIsfav(newFavState)
            closeMenu();
        } catch (error) {
            console.error("Error marking note as favorite:", error);
            setIsfav(isfav);
        }
    };

    return (
        <div>
            <NavLink
                to={folderId ? `/${foldername}/${folderid}/Notes/${id}` : "/Favorites"}
                type="submit"
                onClick={isFavchange}
                className="flex gap-3 hover:bg-gray-500 p-2 rounded-md cursor-pointer"
            >
                <img src={fav} alt="Favorite Icon" />
                {isfav ? "Remove from Fav" : "Add to Favorite"}
            </NavLink>
        </div>
    );
}

export default Favbtn;

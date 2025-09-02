import { useState } from "react";
import dot from "../../assets/dot.svg";
import Trash from "./trash";
import Archivebtn from "./Archivebtn";
import Favbtn from "./Favbtn";
import { memo } from "react";

interface OptionProps {
    id: string;
    isArchived: boolean;
    isFavorite: boolean;
    foldername:string;
    folderid:string;
    title:string;
}

const Option = memo(({ id, isFavorite, isArchived ,folderid,foldername,title}: OptionProps) => {
    const [showMenu, setShowMenu] = useState(false); 
    
    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer absolute top-15 right-10 hover:border hover:rounded-2xl hover:border-amber-50"
            >
                <img src={dot} alt="Options" />
            </button>
            {showMenu && (
                <div className="absolute right-10 top-25 bg-newgray shadow-lg rounded-lg p-2 z-100">
                    <ul className="flex flex-col gap-1">
                        <Favbtn id={id} isFav={isFavorite} closeMenu={closeMenu} folderid={folderid} foldername={foldername}/>
                        <hr className="text-zinc-700" />
                        <Archivebtn id={id} isArc={isArchived} closeMenu={closeMenu} folderid={folderid} foldername={foldername} />
                        <hr className="text-zinc-700" />
                        <Trash id={id}  closeMenu={closeMenu} title={title} folderid={folderid} foldername={foldername}/>
                    </ul>
                </div>
            )}
        </>
    );
});

export default Option;
import { useParams } from "react-router-dom"
import Main from "../Main/Maincontent"
import Menu from "../Menu/menu"
import Default from "../Main/Default";
import Midddlecomponent from "../Folder/midddlecomponent";

function FolderPage() {
    const { notesId } = useParams();
    return (
        <>
            <Menu />
            <Midddlecomponent/>
            {notesId ? <Main /> : <Default />}
        </>

    )
}

export default FolderPage

import { NavLink, useParams } from "react-router-dom";
import restore from "../../assets/restore.svg"
import axios from "axios"; 
import { useCallback, useContext, useEffect, useState } from "react";
import { RenderContext } from "../../RenderContext";
interface DataTypes {
    id: string
    title: string;
    content: string;
    createdAt: string;
    isArchived: boolean;
    isFavorite: boolean;
    namefolder: string;
    folder: {
        id: string;
        name: string;
    };

}
function Restore() {
    const { notesId } = useParams();
    const {setMainRender} =useContext(RenderContext)
    const [contentdata, setContentdata] = useState<DataTypes | null>(null);

    const fetchDataContent = useCallback(async () => {
        if (!notesId) return;
        try {
            const response = await axios.get(`https://nowted-server.remotestate.com/notes/${notesId}`);
            setContentdata(response.data.note);
            //  console.log(response.data.note);
           
            
            
        } catch (error) {
                 console.error("Error fetching note:", error);
        }
    }, [notesId]);
    
    useEffect(() => {
        fetchDataContent();
    }, [fetchDataContent]);

    const restoreAPI = `https://nowted-server.remotestate.com/notes/${notesId}/restore`;
    const restoreNote = async () => {
        try {
            await axios.post(restoreAPI);
            setMainRender(true)
            alert(`Note restored successfully : ${contentdata?.title}`);
            //console.log(response.data);

        } catch (error) {
            console.error('Error restoring note:', error);
        }
    };
    
   
    return (
        <div className="flex flex-col justify-center w-3/5 items-center h-screen p-12 gap-5 ">

            <div><img src={restore} alt="Default View" /></div>
            <div className="text-3xl font-bold">Restore  " {contentdata?.title} "</div>
            <div className="text-lg text-center">
                <p className="px-20">
                    Don't want to lose this note? It's not too late! Just click the
                    'Restore'
                    button and it will be added back to your list. It's that simple.
                </p>
            </div>
            <NavLink to={`/${contentdata?.folder.name}/${contentdata?.folder.id}/Notes/${contentdata?.id}`} onClick={restoreNote} className="border py-2 px-4 rounded-lg hover:bg-newgray" > Restore</NavLink>
        </div>
    );
}

export default Restore

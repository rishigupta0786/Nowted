import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect,useState } from "react";
import axios from "axios";
import Defaultpage from "./Default";
import ContentCard from "./ContentCard";
import { RenderContext } from "../../RenderContext";
import Restore from "../Restore/Restore";

interface DataTypes {
    id: string
    title: string;
    content: string;
    createdAt: string;
    isArchived: boolean;
    isFavorite: boolean;
    namefolder:string;
    deletedAt: string | null;
    folder:{
        id:string;
        name:string;
    };

}
function Main() {
    const { notesId } = useParams();
    const [contentdata, setContentdata] = useState<DataTypes | null>(null);

    const { MainRender,setMainRender } = useContext(RenderContext)
    const fetchDataContent =useCallback( async () => {
        if (!notesId) return;
        try {
            const response = await axios.get(`https://nowted-server.remotestate.com/notes/${notesId}`);
            setContentdata(response.data.note);
                
            
        } catch (error) {
            console.error("Error fetching note:", error);
        }
    },[notesId]);
   
    useEffect(() => {

        if (MainRender) {
            setMainRender(false);
          }

        fetchDataContent();
    }, [fetchDataContent, MainRender, setMainRender]);
    
    return (
        <>
            {contentdata ? (
                
                contentdata.deletedAt?<Restore/>:

                <div className="w-3/5 h-screen overflow-x-hidden overflow-y-auto">
                    <ContentCard
                        id={contentdata.id}
                        namefolder={contentdata.folder.name}
                        folderid={contentdata.folder.id}
                        title={contentdata.title}
                        content={contentdata.content}
                        createdAt={contentdata.createdAt}
                        isFavorite={contentdata.isFavorite}
                        isArchived={contentdata.isArchived}

                    />
                </div>



            ) : (
                <Defaultpage />
            )}
        </>
    );
}

export default Main;

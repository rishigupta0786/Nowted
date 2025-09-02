import { useContext, useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchAllFavorites, fetchAllArchivedNotes, fetchAllTrashNotes, fetchAllNotes } from "../Api/api";
import Card from "./card";
import { RenderContext } from "../../RenderContext";

interface DataTypes {
    id: string;
    folderId: string | undefined;
    title: string;
    preview: string;
    updatedAt: string;
    folder: {
        id: string;
        name: string;
    };
}

function Middlecomponent() {
    const URL = useLocation().pathname.split("/").filter(Boolean);
    const Mode = URL.length > 0 ? decodeURIComponent(URL[0]) : "";
    const [notes, setNotes] = useState<DataTypes[]>([]);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    
    const { folderId } = useParams<{ folderId?: string }>();
    const { isRender, setIsRender } = useContext(RenderContext);

    const fetchData = useCallback(async (pageNumber = 1) => {
        try {
            setLoading(true);
            let data: DataTypes[] = [];
            switch (Mode) {
                case "Favorites":
                    data = await fetchAllFavorites(pageNumber);
                    break;
                case "Archive":
                    data = await fetchAllArchivedNotes(pageNumber);
                    break;
                case "Trash":
                    data = await fetchAllTrashNotes(pageNumber);
                    break;
                default:
                    data = await fetchAllNotes(folderId, pageNumber);
            }

            setNotes(prevNotes => pageNumber === 1 ? data : [...prevNotes, ...data]);
            if (isRender) {
                setIsRender(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [Mode, folderId, isRender, setIsRender]);

    useEffect(() => {
        setNotes([]);
        setPage(1);
        fetchData(1);
    }, [Mode, folderId, fetchData]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage);
    };

    return (
        <div className="flex flex-col gap-2 bg-[#1C1C1C] w-1/5 min-w-[25vh] p-2 relative h-screen">
            <h1 className="text-2xl">{Mode}</h1>
            <div className="flex px-2 py-1 flex-col h-[90vh] gap-2 overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-500">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <Card
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            text={note.preview}
                            lastdate={note.updatedAt}
                            folderId={note.folder?.id ?? ""}
                            folderName={note.folder?.name ?? ""}
                            Mode={Mode}
                        />
                    ))
                ) : (
                    <p className="text-gray-400">No Notes found.</p>
                )}
            </div>

            {notes.length > 9 && (
                <button
                    onClick={loadMore}
                    disabled={loading}
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 
                    bg-gray-700 text-white   w-19/20 rounded hover:bg-gray-800 disabled:bg-gray-400"
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            )}
        </div>
    );
}

export default Middlecomponent;

import axios from "axios";
import { useParams } from "react-router-dom";
import { RenderContext } from "../../RenderContext";
import { useContext } from "react";

const API = "https://nowted-server.remotestate.com/notes";
function CreateNote() {
  const { folderId } = useParams();
  const { isRender, setIsRender } = useContext(RenderContext);
  const addNote = async () => {
    if (!folderId) {
      alert("Select a folder first");
      return;
    }

    try {
      const noteData = {
        folderId: folderId,
        title: "New Note",
        content: "",
        isFavorite: false,
        isArchived: false,
      };
      await axios.post(API, noteData);
      setIsRender(!isRender);
      alert("Note created successfully");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="px-2">
      <button
        onClick={addNote}
        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 
             text-white font-medium shadow-md border border-gray-600 
             hover:from-gray-800 hover:to-gray-900 
             transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
      >
        + New Note
      </button>
    </div>
  );
}

export default CreateNote;

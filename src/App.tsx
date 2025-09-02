import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FolderPage from "./Component/pages/folderpage";
import { RenderContext } from "./RenderContext";
import { useState } from "react";

function App() {
  const [isRender, setIsRender] = useState<boolean>(false);
  const [MainRender, setMainRender] = useState<boolean>(false);

  return (
    <RenderContext.Provider value={{ isRender, setIsRender, MainRender, setMainRender }}>
      <Router>
        <div className="flex">
          <Routes>
            <Route path="/" element={<FolderPage />} />
            <Route path="/:folderName/:folderId/notes/:notesId" element={<FolderPage />} />
            <Route path="/:folderName/:folderId" element={<FolderPage />} />
            <Route path="/:mode" element={<FolderPage />} />
            <Route path="/:mode/:title/:notesId" element={<FolderPage />} />
          </Routes>
        </div>
        
      </Router>
    </RenderContext.Provider>
  );
}

export default App;
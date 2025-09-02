import axios from "axios";

export const fetchAllNotes = async (folderId: string | undefined, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://nowted-server.remotestate.com/notes?archived=false&deleted=false&folderId=${folderId}&page=${page}&limit=${limit}`
    );
    return response.data.notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

export const fetchAllFavorites = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://nowted-server.remotestate.com/notes?archived=false&favorite=true&deleted=false&page=${page}&limit=${limit}`
    );
    return response.data.notes || [];
  } catch (error) {
    console.log("Error fetching favorite notes:", error);
    return [];
  }
};

export const fetchAllArchivedNotes = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://nowted-server.remotestate.com/notes?archived=true&deleted=false&page=${page}&limit=${limit}`
    );
    return response.data.notes || [];
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    return [];
  }
};

export const fetchAllTrashNotes = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://nowted-server.remotestate.com/notes?deleted=true&page=${page}&limit=${limit}`
    );
    return response.data.notes || [];
  } catch (error) {
    console.error("Error fetching trash notes:", error);
    return [];
  }
};

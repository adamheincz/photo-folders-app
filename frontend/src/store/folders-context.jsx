import { createContext, useState, useReducer, useEffect } from "react";
import FolderSequenceReducer from "./folders-sequence-reducer";

const FoldersContext = createContext({
    folderSequence: [],
    openInnerFolder: (id) => {},
    openOuterFolder: (folder) => {},
    openMainFolder: (id) => {},
    goBack: () => {},
    currentMainFolder: {},
    currentID: 1,
    currentIsLoading: true
});

export function FoldersProvider({ children }) {
    //const [currentFolder, setCurrentFolder] = useState({});
    //const [folderSequence, setFolderSequence] = useState([]);
    const [currentID, setCurrentID] = useState(1);
    const [currentIsLoading, setCurrentIsLoading] = useState(true);

    const [folders, dispatchFolderAction] = useReducer(FolderSequenceReducer, { folderSequence: [] });

    async function fetchFolder(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/folders/${id}`);
            let folder = await res.json().then((res) => {
                return res.data;
            });
            return folder;
        } catch (error) {
            console.log(error);
        }
    }

    //let currentFolder = folders.foldersequence[folders.folderSequence.length - 1];
    let currentMainFolder = folders.folderSequence[0];

    async function openInnerFolder(id) {
        setCurrentID(id);
        setCurrentIsLoading(true);
        const folder = await fetchFolder(id);
        dispatchFolderAction({ type: 'OPEN_INNER_FOLDER', folder });
        setCurrentIsLoading(false);
    }

    function openOuterFolder(folder) {
        setCurrentID(folder.id);
        dispatchFolderAction({ type: 'OPEN_OUTER_FOLDER', folder });
    }

    async function openMainFolder(id) {
        setCurrentID(id);
        setCurrentIsLoading(true);
        const folder = await fetchFolder(id).then((res) => {
            setCurrentIsLoading(false);
            return res;
        });
        dispatchFolderAction({ type: 'OPEN_MAIN_FOLDER', folder });
    }

    function goBack() {
        setCurrentID(folders.folderSequence[folders.folderSequence.length - 2].id)
        dispatchFolderAction({ type: 'GO_BACK' });
    }


    const foldersContext = {
        folderSequence: folders.folderSequence,
        currentMainFolder,
        currentID,
        currentIsLoading,
        openInnerFolder,
        openOuterFolder,
        openMainFolder,
        goBack
    }

    return (
        <FoldersContext.Provider value={ foldersContext }>
            {children}
        </FoldersContext.Provider>
    );
}

export default FoldersContext;
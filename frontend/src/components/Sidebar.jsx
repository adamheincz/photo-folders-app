import { useContext, useState, useEffect } from "react";
import FoldersContext from "../store/folders-context";

export default function Sidebar({ setDirecton }) {

    const { currentMainFolder, folderSequence, openMainFolder } = useContext(FoldersContext);
    const [mainFolders, setMainFolders] = useState([]);

    console.log(folderSequence);
    console.log(currentMainFolder);

    function selectFolder(id) {
        setDirecton(0);
        openMainFolder(id);
    }

    useEffect(() => {
        try {
            fetch('http://localhost:3000/api/folders/main')
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setMainFolders(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="pr-12 flex-0">
            <div className="flex flex-col text-2xl">
                <h1 className="flex items-center font-semibold mb-12">
                    <span className="material-icons mr-2">
                        folder_copy
                    </span>
                    <span>
                        Folders
                    </span>
                </h1>
            </div>
            <div id="main-folders">
                <h2 className="uppercase mb-8 font-medium text-nowrap">Főmappák</h2>
                <ul className="flex flex-col gap-4 text-xl">
                    {mainFolders.map((folder, index) =>
                        <li
                            key={index}
                            className={"cursor-pointer " + (currentMainFolder && folder.id === currentMainFolder.id ? "text-white" : "")}
                            onClick={() => selectFolder(folder.id)}
                        >
                            {folder.title}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
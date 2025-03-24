import CurrentFolder from "./CurrentFolder";
import FolderSequenceBar from "./FolderSequenceBar";
import Sidebar from "./Sidebar";
import { FOLDERS } from "../assets/dummy-data";
import { useState, useRef } from "react";

export default function FolderContainer() {

    const [folderSequence, setFolderSequence] = useState([FOLDERS[0]])
    const [direction, setDirection] = useState();


    function handleSelectInnerFolder(folder) {
        setFolderSequence((prevFolderSequence) => {
            let updatedFolderSequence = [...prevFolderSequence];
            const currentFolder = updatedFolderSequence[updatedFolderSequence.length - 1]

            if (currentFolder !== folder) {
                if (updatedFolderSequence.includes(folder)) {
                    setDirection(-1);
                    const index = updatedFolderSequence.indexOf(folder);
                    updatedFolderSequence = updatedFolderSequence.slice(0, index + 1);
                } else {
                    setDirection(1);
                    updatedFolderSequence.push(folder);
                }
            }

            return updatedFolderSequence;
        });
    }

    function handleSelectMainFolder(folder) {
        setDirection(0);
        setFolderSequence([folder]);
    }

    function handleGoBack() {
        setDirection(-1);
        setFolderSequence((prevFolderSequence) => {
            let updatedFolderSequence = [...prevFolderSequence];
            if (updatedFolderSequence.length !== 1) {
                updatedFolderSequence.pop();
            }
            console.log(updatedFolderSequence);
            return updatedFolderSequence;
        })
    }

    return (
        <div className="max-h-[90vh] min-w-0 flex lg:w-[1200px] lg:h-[70vh] md:h-[80vh] xs:h-[90vh] p-8 pb-12 border-1 border-zinc-900 rounded-3xl my-auto mx-auto">
            <Sidebar
                folders={FOLDERS}
                onSelectFolder={handleSelectMainFolder}
                currentMainFolder={folderSequence[0]}
            />
            <div className="flex flex-col grow min-w-0">
                <FolderSequenceBar
                    folderSequence={folderSequence}
                    onSelectFolder={handleSelectInnerFolder}
                    onBack={handleGoBack}
                />
                <CurrentFolder
                    selectedFolder={folderSequence[folderSequence.length - 1]}
                    onSelectFolder={handleSelectInnerFolder}
                    direction={direction}
                />
            </div>
        </div>
    );
}
import CurrentFolder from "./CurrentFolder";
import FolderSequenceBar from "./FolderSequenceBar";
import Sidebar from "./Sidebar";
import { useState  } from "react";

export default function FolderContainer() {
    const [direction, setDirection] = useState(1);


    return (
        <div className="flex w-full h-full p-8 pb-12 border-1 border-zinc-900 rounded-3xl my-auto mx-auto">
            <Sidebar
            setDirecton={setDirection}
            />
            <div className="flex flex-col grow min-w-0">
                <FolderSequenceBar
                    setDirection={setDirection}
                />
                <CurrentFolder
                    direction={direction}
                    setDirection={setDirection}
                />
            </div>
        </div>
    );
}
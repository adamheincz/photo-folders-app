export default function Sidebar({ folders, currentMainFolder, onSelectFolder }) {
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
                    {folders.map((folder, index) =>
                        <li
                            key={index}
                            className={"cursor-pointer " + (folder === currentMainFolder ? "text-white" : "")}
                            onClick={() => onSelectFolder(folder)}
                        >
                            {folder.title}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
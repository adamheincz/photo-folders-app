import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

export default function FolderSequenceBar({ folderSequence, onSelectFolder, onBack }) {

    return (
        <div className="flex items-center mb-4" >
            <button
                onClick={onBack}
                disabled={folderSequence.length === 1}
                className="p-4 bg-zinc-900 text-white rounded-full inline-flex mr-4 disabled:text-zinc-700">
                <span style={{ fontSize: "1rem" }} className="material-icons p-0.5">
                    arrow_back
                </span>
            </button>
            <div id='bar' className="relative flex items-center justify-between min-w-0 flex-1 py-4 pl-4 pr-8 bg-zinc-900 rounded-4xl">
                <button className='bg-zinc-900 w-fit h-6 rounded-full py-0.5 px-1 absolute z-10 left-[15px]'>
                    <span style={{ fontSize: "1rem" }} className='material-icons text-white'>
                        more_horiz
                    </span>
                    </button>
                <ol className="w-full min-w-0 relative flex items-center justify-end gap-4 text-white font-medium leading-none overflow-x-hidden p-0.5 rounded-full">
                    <AnimatePresence initial={false} mode='popLayout'>
                        {folderSequence.map((folder, index) =>
                            <motion.li
                                layout
                                key={folder.title}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="cursor-pointer text-nowrap flex gap-4"
                                onClick={() => onSelectFolder(folder)}>
                                {index !== 0 &&
                                    <span style={{ fontSize: "1rem" }} className="material-icons">
                                        chevron_right
                                    </span>}{folder.title}
                            </motion.li>
                        )}
                    </AnimatePresence>
                </ol>
            </div>
        </div>
    );
}
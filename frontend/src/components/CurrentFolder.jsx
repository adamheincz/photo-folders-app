import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'

const variants = {
    initial: (direction) => {
        return { opacity: 0, x: `${60 * direction}%`, y: (direction === 0) ? "100%" : 0 }
    },
    active: { opacity: 1, x: 0, y: 0 },
    exit: (direction) => {
        return { opacity: 0, x: `${-60 * direction}%`, y: (direction === 0) ? "-100%" : 0 }
    },
}

export default function CurrentFolder({ selectedFolder, onSelectFolder, direction }) {

    const hiddenFileInput = useRef(null);

    function handleClick(e) {
        hiddenFileInput.current.click();
    }

    function handleChange(e) {
        const fileUploaded = e.target.files[0];
        handleFile(fileUploaded);
    }

    console.log(hiddenFileInput)

    return (
        <div className='flex flex-col flex-1 min-h-0 relative overflow-hidden'>
            <div className='flex gap-4 w-full bg-zinc-950 z-10'>
                <button
                    className='bg-zinc-900 text-white px-4 py-2 rounded-lg mb-3'>
                    Új mappa +
                </button>
                <div>
                    <button
                        className='bg-zinc-900 text-white px-4 py-2 rounded-lg mb-3'
                        type="button" onClick={handleClick}>
                        Kép feltöltés
                    </button>
                    <input
                        ref={hiddenFileInput}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <AnimatePresence mode='popLayout' custom={direction}>
                <motion.div
                    variants={variants}
                    custom={direction}
                    initial="initial"
                    animate="active"
                    exit="exit"
                    transition={{ ease: "easeInOut", duration: 0.35 }}
                    key={selectedFolder.title}
                    className="flex flex-col flex-1 min-h-0 shrink">
                    <div id="inner-folder" className="border-b-1 border-zinc-900 pb-8 mb-8 overflow-hidden relative">
                        <div>
                            <h3
                                className="mb-6 font-medium w-fit">
                                Mappák
                            </h3>
                            <div>
                                {selectedFolder.folders &&
                                    <ul className="text-white text-2xl">
                                        {selectedFolder.folders.map(folder =>
                                            <li
                                                key={folder.title}
                                                className="cursor-pointer w-fit mb-1"
                                                onClick={() => onSelectFolder(folder)}
                                            >
                                                {folder.title}
                                            </li>
                                        )}
                                    </ul>
                                }
                                {
                                    !selectedFolder.folders &&
                                    <p>Nincsenek belső mappák.</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div
                        id="images" className="flex flex-col flex-1 min-h-0">
                        <h3 className="mb-6 font-medium flex-none">Fényképek</h3>
                        <div className='flex flex-col flex-1 min-h-0'>
                            {selectedFolder.images &&
                                <ul
                                    className="flex flex-wrap gap-6 shrink basis-auto min-h-0 overflow-y-scroll pr-1">
                                    {selectedFolder.images.length &&
                                        selectedFolder.images.map((image, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="w-36">
                                                    <img className="w-36" src={image} alt="Placeholder" />
                                                </li>
                                            );
                                        }
                                        )}
                                </ul>
                            }
                            {!selectedFolder.images &&
                                <p>Nincsenek fényképek.</p>
                            }
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div >
    );
}
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useContext, useEffect, useState } from 'react';
import FoldersContext from '../store/folders-context';
import ImagesSkeleton from './ImagesSkeleton';
import Images from './Images';

const variants = {
    initial: (direction) => {
        return { opacity: 0, x: `${60 * direction}%`, y: (direction === 0) ? "100%" : 0 }
    },
    active: { opacity: 1, x: 0, y: 0 },
    exit: (direction) => {
        return { opacity: 0, x: `${-60 * direction}%`, y: (direction === 0) ? "-100%" : 0 }
    },
}

export default function CurrentFolder({ direction, setDirection }) {

    const { 
        folderSequence,
        currentID,
        currentIsLoading,
        openInnerFolder,
        openMainFolder
    } = useContext(FoldersContext);

    const currentFolder = folderSequence[folderSequence.length - 1];

    const hiddenFileInput = useRef(null);

    function handleClick(e) {
        hiddenFileInput.current.click();
    }

    function handleChange(e) {
        const fileUploaded = e.target.files[0];
        handleFile(fileUploaded);
    }

    function selectFolder(folder) {
        setDirection(1);
        openInnerFolder(folder.id);
    }

    // fetch initial folder
    useEffect(() => {
        openMainFolder(1);
    }, [])

    // useEffect(() => {
    //     const fetchCurrentFolder = async () => {
    //         try {
    //             fetch(`http://localhost:3000/api/folders/${currentID}`)
    //                 .then((res) => {
    //                     return res.json();
    //                 })
    //                 .then((res) => {
    //                     let folder = res.data;
    //                     if (folder.parent_id === null) {
    //                         openMainFolder(folder);
    //                     } else {
    //                         openInnerFolder(folder);
    //                     }
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     let folder = folderSequence.find((e) => e.id === currentID);

    //     if (folder) {
    //         openOuterFolder(folder);
    //     } else {
    //         fetchCurrentFolder();
    //     }

    // }, [currentID])

    return (
        <div className='flex flex-col flex-1 min-h-0 relative overflow-hidden'>
            <div className='flex gap-4 w-full bg-zinc-950 z-10'>
                <button
                    className='bg-zinc-900 text-white px-4 py-2 rounded-lg mb-3'>
                    Új mappa +
                </button>
                <div>
                    <input
                        ref={hiddenFileInput}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <AnimatePresence mode='popLayout' custom={direction} initial={false}>
                <motion.div
                    variants={variants}
                    custom={direction}
                    initial="initial"
                    animate="active"
                    exit="exit"
                    transition={{ ease: "easeInOut", duration: 0.35 }}
                    key={currentID}
                    className="flex flex-col flex-1 min-h-0 shrink">
                    <div className="border-b-1 border-zinc-900 pb-8 mb-8 overflow-hidden relative">
                        <div>
                            <motion.h3
                                layoutId='folders-title'
                                className="mb-6 font-medium w-fit">
                                Mappák
                            </motion.h3>
                            <div>
                                {currentFolder &&
                                    <>
                                        {currentFolder.subfolders &&
                                            <ul className="text-white text-2xl">
                                                {currentFolder.subfolders.map(folder =>
                                                    <li
                                                        key={folder.title}
                                                        className="cursor-pointer w-fit mb-1"
                                                        onClick={() => selectFolder(folder)}
                                                    >
                                                        {folder.title}
                                                    </li>
                                                )}
                                            </ul>
                                        }
                                        {!currentFolder.subfolders &&
                                            <p>Nincsenek belső mappák.</p>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div
                        id="images" className="flex flex-col flex-1 min-h-0">
                        <h3 className="mb-6 font-medium flex-none">Fényképek</h3>
                        {/* <p>{ currentIsLoading.toString() }</p> */}
                        <div className='flex flex-col flex-1 min-h-0'>
                            {currentFolder &&
                                <>
                                    <ImagesSkeleton />
                                    <Images
                                    images={currentFolder.images}
                                    handleClick={handleClick}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div >
    );
}
import { createPortal } from 'react-dom';
import { useContext } from 'react';
import FoldersContext from '../store/folders-context';
import { AnimatePresence, easeInOut, easeOut, motion } from 'framer-motion';

export default function Carousel({ index, setIndex }) {

    const {
        folderSequence
    } = useContext(FoldersContext);

    const currentFolder = folderSequence[folderSequence.length - 1];

    console.log(currentFolder);

    let currentImage = currentFolder.images.at(0);

    function onSetIndex(i) {
        setIndex(i);
        console.log(index);
    }

    return (
        <>
            {createPortal(
                <>
                    <AnimatePresence mode='wait'>
                        <motion.div className='absolute top-0 left-0 w-screen h-screen bg-zinc-950 z-20 opacity-70' onClick={() => onSetIndex(null)}
                            transition={{ duration: 2, ease: "easeIn" }}
                        >
                        </motion.div>
                    </AnimatePresence>
                    <motion.div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-4 z-50 items-center justify-center'
                    >
                        {currentFolder &&
                            <motion.img key={currentFolder.images[index].id}
                                className="flex max-h-[90vh] min-w-0 lg:max-w-[1200px] lg:max-h-[70vh] md:max-h-[80vh] xs:max-h-[90vh] rounded-none z-30" src={currentFolder.images[index].url} alt="Placeholder"

                                layoutId={`image-${currentFolder.images[index].id}`}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                        }
                    </motion.div>
                </>,
                document.body
            )}
        </>
    );
}
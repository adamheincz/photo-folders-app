import { useContext, useState } from "react";
import FoldersContext from "../store/folders-context";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import Carousel from "./Carousel";

const containerVariants = {
    start: {
        opacity: 0,
        transition: {
            staggerChildren: 0.1,
        }
    },
    end: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const variants = {
    start: { opacity: 0},
    end: { opacity: 1 }
};


export default function Images({ images, handleClick }) {

    const { currentIsLoading } = useContext(FoldersContext);

    const [inspectedImage, setInspectedImage] = useState(null);

    return (
        <>
            {inspectedImage !== null &&
                < Carousel index={inspectedImage} setIndex={setInspectedImage}/>
            }
            {!currentIsLoading && images &&
                <motion.ul
                    variants={containerVariants}
                    initial="start"
                    animate="end"
                    className="flex flex-wrap gap-2 shrink basis-auto min-h-0 pr-1"
                    /*overflow-y-scroll*/
                >
                    {/* <li>
                <button
                    className='material-icons bg-zinc-900 text-zinc-700 rounded-lg w-36 h-24'
                    type="button" onClick={handleClick}>
                    add_a_photo
                </button>
            </li> */}
                    <AnimatePresence>
                        {images.map((image, index) => {
                            return (
                                <motion.li
                                    key={image.id}
                                    variants={variants}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <motion.img className="xl:max-h-48 lg:max-h-40 md:max-h-32 cursor-pointer z-30" src={image.url} alt="Placeholder" onClick={() => setInspectedImage(index)} 

                                    layoutId={`image-${image.id}`}
                                    transition={{duration: 0.2, ease: "easeOut"}}
                                    />
                                </motion.li>
                            );

                        }
                        )}
                    </AnimatePresence>
                </motion.ul>
            }
            {(!images || images.length == 0) &&
                <p>Nincsenek fényképek.</p>
            }
        </>

    );
}
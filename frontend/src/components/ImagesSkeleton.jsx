import { AnimatePresence, delay, motion } from "framer-motion";
import { useContext } from "react";
import FoldersContext from '../store/folders-context';

const containerVariants = {
    start: {
        opacity: 0,
        transition: {
            staggerChildren: 0.07,
        }
    },
    end: {
        opacity: 1,
        transition: {
            delay: 0.35,
            staggerChildren: 0.07,
        }
    }
};

const variants = {
    start: {
        opacity: "100%"
    },
    end: {
        opacity: "50%"
    }
};

const transition = {
    duration: 0.5,
    repeatType: "reverse",
    repeat: Infinity,
    ease: "easeInOut"
}

export default function ImagesSkeleton() {

    const { currentIsLoading } = useContext(FoldersContext);

    const array = Array(8).fill(0);

    return (
        currentIsLoading && 
        <AnimatePresence>
            <motion.ul className="flex flex-wrap gap-6 shrink basis-auto min-h-0 overflow-y-scroll pr-1"
                variants={containerVariants}
                initial="start"
                animate="end"
                exit={{ opacity: 0 }}
            >
                {array.map((number, index) => {
                    return (
                        <motion.li
                            key={index}
                            variants={variants}
                            transition={transition}
                            className="xl:h-48 xl:w-72 lg:h-40 lg:w-60 md:h-32 md:w-48 bg-zinc-900 rounded-lg"
                        >
                        </motion.li>
                    );
                }
                )}
            </motion.ul>
        </AnimatePresence>

    );

}
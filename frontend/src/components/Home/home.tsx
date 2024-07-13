import { useRef, useState, useEffect } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import BigCard from "../Cards/big";
import SmallCard from "../Cards/small";
import { motion } from 'framer-motion';

type MovieType = {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    id: number;
};

type HomeProps = {
    playing: MovieType[];
    mostRated: MovieType[];
    popular: MovieType[];
    upcoming: MovieType[];
};

export default function Home({ playing, mostRated, popular, upcoming }: HomeProps) {
    const topPlaying = playing.slice(0, 10);

    const [isUserInteraction, setIsUserInteraction] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const playingRef = useRef<HTMLDivElement>(null);
    const mostRatedRef = useRef<HTMLDivElement>(null);
    const popularRef = useRef<HTMLDivElement>(null);
    const upcomingRef = useRef<HTMLDivElement>(null);

    const autoScrollRef = useRef<HTMLDivElement>(null);
    const bigCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScroll = (value: number, ref: React.RefObject<HTMLDivElement>) => {
        ref.current && ref.current.scrollBy({ left: value });
    };

    function handleBigCardScroll(index: number) {
        if (bigCardRefs.current[index]) {
            bigCardRefs.current[index].scrollIntoView({ block: "nearest", inline: "start" });
        }
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (!isUserInteraction) {
            const maxIndex = bigCardRefs.current.length;

            intervalId = setInterval(() => {
                if (currentIndex < maxIndex) {
                    handleScroll(666, autoScrollRef);
                    setCurrentIndex((prev) => prev + 1);
                }
            }, 4000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, isUserInteraction]);

    return (
        <section className="relative top-10 w-[666px] left-[234px] flex flex-col bg-black">

            <section className="relative">
                <div className="absolute z-30 right-5 top-[15%] flex flex-col">
                    {
                        topPlaying.map((movie, index) => {
                            
                            return (
                                <input 
                                type="radio" 
                                key={movie.id} 
                                className="mt-2"
                                name="movie"
                                onChange={() => handleBigCardScroll(index)}
                                onClick={() => { setIsUserInteraction(true); setCurrentIndex(index) }}
                                checked={currentIndex === index}
                                />
                            )
                        })      
                    }       
                </div>

                <motion.div 
                className="flex overflow-x-auto scrollable-scrollbar" ref={autoScrollRef}>
                    {topPlaying.map((movie, index) => (
                        <motion.div  
                        className="w-full shrink-0" 
                        ref={(el) => (bigCardRefs.current[index] = el)} 
                        key={index}
                        >
                            <BigCard
                            title={movie.title}
                            image={movie?.backdrop_path}
                            id={movie.id}
                        />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            >
            <section>
            <header>
                <h1 className="text-xl mt-7 text-white font-bold">PLAYING NOW</h1>
            </header>
            <div className="flex justify-between items-center h-[180px] relative">
                <motion.div
                className="absolute left-0 z-20"
                whileTap={{ scale: 1.1 }}
                >
                <IoMdArrowDropleft
                    onClick={() => handleScroll(-740, playingRef)}
                    className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                />
                </motion.div>
                <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={playingRef}>
                    {playing.map((movie) => (
                        <SmallCard
                            key={movie.id}
                            id={movie.id}
                            poster_path={movie.poster_path}
                            title={movie.title}
                        />
                    ))}
                </div>
                <motion.div className="absolute right-0" 
                whileTap={{ scale: 1.1 }}
                >
                <IoMdArrowDropright
                    onClick={() => handleScroll(740, playingRef)}
                    className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                />
                </motion.div>
            </div>
        </section>
        </motion.div>

           <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.3 }}
           >
           <section>
                <header>
                    <h1 className="text-xl mt-4 text-white font-bold">TOP RATED</h1>
                </header>
                <div className="flex justify-between items-center h-[180px] relative">
                <motion.div
                    className="absolute left-0 z-20"
                    whileTap={{ scale: 1.1 }}
                    >
                    <IoMdArrowDropleft
                        onClick={() => handleScroll(-600, mostRatedRef)}
                        className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                    />
                    </motion.div>
                    <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={mostRatedRef}>
                        {mostRated.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <motion.div className="absolute right-0" 
                    whileTap={{ scale: 1.1 }}
                    >
                    <IoMdArrowDropright
                        onClick={() => handleScroll(600, mostRatedRef)}
                        className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                    />
                    </motion.div>
                </div>
            </section>
           </motion.div>

           <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.3 }}
           >
           <section>
                <header>
                    <h1 className="text-xl mt-4 text-white font-bold">POPULAR</h1>
                </header>
                <div className="flex justify-between items-center h-[180px] relative">
                <motion.div
                    className="absolute left-0 z-20"
                    whileTap={{ scale: 1.1 }}
                    >
                    <IoMdArrowDropleft
                        onClick={() => handleScroll(-740, popularRef)}
                        className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                    />
                    </motion.div>
                    <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={popularRef}>
                        {popular.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <motion.div className="absolute right-0" 
                    whileTap={{ scale: 1.1 }}
                    >
                    <IoMdArrowDropright
                        onClick={() => handleScroll(740, popularRef)}
                        className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                    />
                    </motion.div>
                </div>
            </section>
           </motion.div>

              <motion.div
              initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                >
            <section>
                <header>
                    <h1 className="text-xl mt-4 text-white font-bold">UPCOMING</h1>
                </header>
                <div className="flex justify-between items-center h-[180px] relative">
                <motion.div
                    className="absolute left-0 z-20"
                    whileTap={{ scale: 1.1 }}
                    >
                    <IoMdArrowDropleft
                        onClick={() => handleScroll(-740, upcomingRef)}
                        className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                    />
                    </motion.div>
                    <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={upcomingRef}>
                        {upcoming.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <motion.div className="absolute right-0" 
                    whileTap={{ scale: 1.1 }}
                    >
                    <IoMdArrowDropright
                        onClick={() => handleScroll(740, upcomingRef)}
                        className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                    />
                    </motion.div>
                </div>
            </section>
            </motion.div>
        </section>

    );
}

import SmallCard from "../Cards/small";
import moviesSearch from "./movieSearch";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Toolbar from "../Toolbar/toolbar";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";

type Results = {
    id: number,
    poster_path: string,
    title: string,
    vote_average: number
}

type Movie = {
    results: Results[];
    page: number;
    total_results: number;
    total_pages: number;
}

type Callback = {
    data: Movie,
    loading: boolean,
    handlePageChange: () => void
}

export default function Search() {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"
    const { movie } = useParams<{ movie: string }>() as { movie: string };
    const { data, loading, handlePageChange } = moviesSearch(movie) as Callback;

    const infiniteScrollRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 0.4
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("Intersecting");
            }
        }, options);

        if (infiniteScrollRef.current) {
            infiniteScrollRef.current.slice(-1).forEach((element) => {
                if (element) {
                    observer.observe(element);
                }
            })
        }

        return () => {
            if (infiniteScrollRef.current) {
                infiniteScrollRef.current.forEach((element) => {
                    if (element) {
                        observer.unobserve(element);
                    }
                })
            }
        }
    }, [data.results])

    

    return (
        <>
         <Header />
         <Toolbar />
        <section className="relative top-10 left-[234px] text-white w-[666px]">
            <AnimatePresence>
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className=" flex relative top-36 mx-auto items-center w-[666px] justify-center">
                        <AiOutlineLoading3Quarters className="h-7 w-7 mr-1 animate-spin" />
                        <h1 className="ml-1 ">LOADING...</h1>
                    </motion.div>

                ) : (data && data.results?.length > 0 ? (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <div className="grid grid-cols-5">
                            {
                                data.results.map((movie, index) => {
                                    return (
                                        <div
                                            ref={(element) => infiniteScrollRef.current[index] = element}
                                            key={index}>
                                            <SmallCard
                                                id={movie.id}
                                                title={movie.title}
                                                poster_path={tmdbImageUrl + movie.poster_path}
                                                key={movie.id}
                                                vote_average={movie.vote_average}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </ motion.section>

                ) : (data.results.length === 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-[666px] relative top-3 flex flex-col">
                        <p className="py-2 text-md font-bold text-zinc-300 border-b border-zinc-900">No results found for: {movie}</p>
                        <Footer />
                    </motion.div>
                )
                ))
                }
            </AnimatePresence>
        </section>
        </>
    )
}

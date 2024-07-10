import Home from "./home";
import { useState, useEffect } from "react";

const key: string = import.meta.env.VITE_TMDB_KEY;

const playingUrl: string = import.meta.env.VITE_TMDB_NOW_PLAYING;
const mostRatedUrl: string = import.meta.env.VITE_TMDB_MOST_RATED;
const popularUrl: string = import.meta.env.VITE_TMDB_POPULAR;
const upcomingUrl: string = import.meta.env.VITE_TMDB_UPCOMING;

type MovieType = {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    id: number;
};

type GenresType = {
    id: number;
    name: string;
};

export default function MovieHome() {
    const [moviesPlaying, setMoviesPlaying] = useState<MovieType[]>([]);
    const [moviesTopRated, setMoviesTopRated] = useState<MovieType[]>([]);
    const [moviesPopular, setMoviesPopular] = useState<MovieType[]>([]);
    const [moviesUpcoming, setMoviesUpcoming] = useState<MovieType[]>([]);
    const [genres, setGenres] = useState<GenresType[]>([]);

    async function fetchData(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }

    async function fetchGenres(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    }

    useEffect(() => {
        async function SearchMovies() {
            try {
                const url = `${playingUrl}?api_key=${key}`;
                const movieList = await fetchData(url);

                const url2 = `${mostRatedUrl}?api_key=${key}`;
                const movieList2 = await fetchData(url2);

                const url3 = `${popularUrl}?api_key=${key}`;
                const movieList3 = await fetchData(url3);

                const url4 = `${upcomingUrl}?api_key=${key}`;
                const movieList4 = await fetchData(url4);

                const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`
                const genresList = await fetchGenres(genresUrl);

                setMoviesPlaying(movieList);
                setMoviesTopRated(movieList2);
                setMoviesPopular(movieList3);
                setMoviesUpcoming(movieList4);
                setGenres(genresList);
            }
            catch (error) {
                console.error(error)
            }
        }
        SearchMovies();
    }, []);

    return <Home 
    playing={moviesPlaying} 
    mostRated={moviesTopRated} 
    popular={moviesPopular}
    upcoming={moviesUpcoming}
    genres={genres}
    />;
}

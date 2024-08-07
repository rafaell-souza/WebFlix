import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type CardProps = {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
}

export default function SmallCard({ id, poster_path, title, vote_average }: CardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"

    const handleImageLoaded = () => {
        setImageLoaded(true);
    }
    const fixedTitle = title.replace(/ /g, '-')

    return (
        <Link to={`/details/${id}?movie=${fixedTitle}`}
            className="snap-center h-44 w-[128px] flex shrink-0 mr-[6px] justify-between items-end mt-2 text-white relative flex-col rounded"
        >
            <div className='bg-red-800 flex justify-center items-center h-6 text-xs text-yellow-200 w-9 relative z-20 rounded-es'>
                {vote_average === 0.0? 0 : vote_average?.toFixed(1)}
            </div>

            {
                !imageLoaded && (
                    <div className="w-full h-full flex items-center justify-center">
                        <AiOutlineLoading3Quarters className="text-white text-4xl animate-spin" />
                    </div>
                )}
            <img
                src={tmdbImageUrl + poster_path}
                alt="poster"
                loading='lazy'
                className={`w-full h-full absolute rounded object-center object-cover ${imageLoaded ? 'visible' : 'hidden'}`}
                onLoad={handleImageLoaded}
            />
            <p className='z-10 mb-1 text-[10px] font-bold mx-auto'>{title.length > 15 ? title.slice(0, 15).toUpperCase() + "..." : title.toUpperCase()}
            </p>
            <div className='absolute h-full w-full card-color'></div>
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.2 }}
                className='absolute h-full 
                w-full bg-white rounded'>
            </motion.div>
        </Link>
    )
}
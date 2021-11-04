import { useState, useEffect } from "react";
import axios from "axios";
import api from "../config/api";

export default function Home({ history, props }) {

    const [comic, setComic] = useState([]);

    useEffect(async () => {
        // Pass empty string as parameter to load current comic
        loadComic('')
    }, []);

    const loadComic = async (comicId) => {
        const { data } = await axios.get(
            api.getComic + comicId
        );
        setComic(data);
    }

    const loadPreviousComic = () => {
        let comicId = parseInt(comic.num) - 1;
        loadComic(comicId);
    }

    const loadNextComic = () => {
        let comicId = parseInt(comic.num) + 1;
        loadComic(comicId);
    }

    const loadRandomComic = () => {
        loadComic('random');
    }

    return (
        <>
            <button type="button" onClick={() => loadComic('')}>HOME</button>
            <button type="button" onClick={loadPreviousComic}>PREV</button>
            <div className="App">
                <p>{comic.num}</p>
            </div>
            <button type="button" onClick={loadNextComic}>NEXT</button>
            <button type="button" onClick={loadRandomComic}>RANDOM</button>
        </>
    );
}

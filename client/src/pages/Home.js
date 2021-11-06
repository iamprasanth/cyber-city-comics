import { useState, useEffect } from "react";
import axios from "axios";
import api from "../config/api";
import { useParams } from 'react-router-dom';

export default function Home({ history, props }) {

    const [comic, setComic] = useState([]);
    const params = useParams()

    useEffect(async () => {
        if (params.comicId) {
            loadComic(params.comicId);
        } else {
            // Pass empty string as parameter to load current comic
            loadComic('')
        }
    },
        [params.comicId]// Force complonent to reload when route parameter changes
    );

    const loadComic = async (comicId) => {
        try {
            const { data } = await axios.get(
                api.getComic + comicId
            );
            setComic(data);
        } catch (error) {
            setComic(null)
        }
    }

    const loadPreviousComic = () => {
        let comicId = parseInt(comic.num) - 1;
        history.push('/' + comicId)
    }

    const loadNextComic = () => {
        let comicId = parseInt(comic.num) + 1;
        history.push('/' + comicId)
    }

    const loadRandomComic = () => {
        if (params.comicId == 'random') {
            // Force load random comic if a random comic is currently shown
            loadComic('random')
        } else {
            history.push('/random')
        }
    }

    return (
        <>
            <div className="btn-wrap">
                <button className="btn" onClick={loadRandomComic}>Randomize</button>
            </div>
            {
                // Valid Comic
                comic &&
                <>
                    <div className="comic-wrap">
                        <div className="comic-content">
                            <h1 class="comic-title">{comic.title}</h1>
                            <span className="comic-nav prev" onClick={loadPreviousComic}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </span>
                            <div className="comic-img">
                                <img src={comic.img} alt={comic.alt} />
                            </div>
                            {
                                // Dont Display Next button for latest comic
                                comic.latest_comic_id != comic.num &&
                                <span className="comic-nav next" onClick={loadNextComic}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </span>
                            }
                        </div>
                        <div className="comic-details">
                            <div>
                                <h3>Publish Date</h3>
                                <p>{comic.comic_date}</p>
                            </div>
                            <div>
                                <h3>Page Number</h3>
                                <p>{comic.num}</p>
                            </div>
                            <div>
                                <h3>Browsed</h3>
                                <p>{comic.view_count}</p>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                // Invalid Comic Searched
                !comic &&
                <>
                    <h1 className="comic-title">No comic found</h1>
                    <div className="comic-wrap">
                        <div className="comic-content">
                            <div className="comic-img">
                                <img src={process.env.REACT_APP_PUBLIC_FOLDER + 'images/not-found.jpeg'} />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

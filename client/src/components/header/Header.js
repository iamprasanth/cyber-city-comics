import { useHistory, useLocation } from 'react-router-dom';
import './Header.css';

export default function Footer() {
    const history = useHistory();

    const searchComic = () => {
        let searchValue = document.getElementsByName("search")[0].value;
        history.push('/' + searchValue)
    }

    return (
        <>
            <header>
                <nav className="site-nav">
                    <a onClick={() => history.push('/')}>Home</a>
                    <form>
                        <input
                            type="search"
                            placeholder="Enter page number"
                            name="search"
                            className="header-search"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <button type="button" value="GO" className="btn header-search-btn" onClick={searchComic} >GO</button>
                    </form>
                </nav>
            </header>
        </>
    )
};

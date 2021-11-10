import { useHistory, useLocation } from 'react-router-dom';
import './Header.css';

export default function Footer() {
    const history = useHistory();

    // Get value from search input and redirect to the requested comic page
    const searchComic = () => {
        let searchValue = document.getElementsByName("search")[0].value;
        if (searchValue) {
            history.push('/' + searchValue)
        }
    }

    // Handle keypress activities in search input
    const keyPressHandler = (event) => {
        if (!/[0-9]/.test(event.key)) {
            // Prevent entering non numerical value
            event.preventDefault();
        }
        if (event.key === 'Enter') {
            // On enter key pressed
            searchComic()
        }
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
                            onKeyPress={keyPressHandler}
                            autoComplete="off"
                        />
                        <button type="button" value="GO" className="btn header-search-btn" onClick={searchComic} >GO</button>
                    </form>
                </nav>
            </header>
        </>
    )
};

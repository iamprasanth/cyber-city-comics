import { useHistory, useLocation } from 'react-router-dom';

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
                    <a href="/">Home</a>
                    <form>
                        <input
                            type="search"
                            placeholder="Enter page to search"
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

import Header from './header/Header';
import Footer from './footer/Footer';

export default function Layout(props) {
    return (
        <>
            <div className="main-wrapper">

                <Header />
                <div className="content">
                    {props.children}
                </div>
            </div>
            <Footer />
        </>
    )
};

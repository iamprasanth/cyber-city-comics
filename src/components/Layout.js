import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
    return (
        <>
            <Header />
            <div className="content">
                {props.children}
            </div>
            <Footer />
        </>
    )
};

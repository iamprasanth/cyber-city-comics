import Header from './Header';

const Layout = (props) => {
    return (
        <>
            <Header />
            <div className="main_body">
                {props.children}
            </div>
        </>
    )
};

export default Layout;

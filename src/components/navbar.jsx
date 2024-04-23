import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center mt-5 mx-10">
            <Link to="/">
                <h1 className="text-3xl text-white font-bold"><span className="text-rose-500">Poké</span>Dex</h1>
            </Link>
            <div className="flex space-x-4 mr-10 text-white">
                <Link to="/about" className="text-xl">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;

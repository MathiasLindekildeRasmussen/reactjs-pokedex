import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Link to="/">
            <h1 className="text-3xl font-bold flex justify-center mt-10"><span className="text-rose-500">Poké</span>Dex</h1>
        </Link>
    )
}

export default Navbar;
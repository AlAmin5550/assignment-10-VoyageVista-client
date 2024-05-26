import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Routes/AuthProvider";
import personIcon from "../assets/silhouette-male-icon.svg"
import toast from "react-hot-toast";


const Header = () => {
    const navigate = useNavigate();
    const { user, logOut, loading } = useContext(AuthContext);
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }
    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("Sign out successful");
                navigate("/");

            }).catch((err) => {
                console.log(err.message)

            });
    }

    const links =
        <>

            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allSpots">All Tourist Spots</NavLink></li>
            <li><NavLink to="/addSpots">Add Tourist Spot</NavLink></li>
            <li><NavLink to="/myList">My List</NavLink></li>
        </>


    return (
        <div>
            <div className="navbar bg-[#063970] text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}

                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">VoyageVista</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                        {

                            user ? "" : <div className="flex"><Link to="/login"><button className="btn btn-sm btn-ghost">Login</button></Link><Link to="/register"><button className="btn btn-sm btn-ghost">Sign up</button></Link></div>

                        }
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {
                                    user ? <img src={user.photoURL} alt="img not found" /> : <img src={personIcon} />
                                }
                            </div>
                        </div>
                        {
                            user ? <ul tabIndex={0} className="mt-3 z-[999] p-2  shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-[#063970]">
                                <li>
                                    <a className="justify-between">
                                        {user.displayName}

                                    </a>
                                </li>
                                <li><a onClick={handleSignOut}>Logout</a></li>
                            </ul> : ""
                        }

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;
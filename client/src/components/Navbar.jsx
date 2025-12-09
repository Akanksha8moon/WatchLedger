import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { LogIn, LogOut, Film, User, Search, X } from 'lucide-react';

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm)}`);
            setShowSearch(false);
            setSearchTerm('');
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-[2px] border-b border-cinematic-border/30 px-6 py-4 flex justify-between items-center h-20 transition-all duration-300">
            <div className="flex items-center gap-4">
                <Link to="/" className="group flex items-center gap-2">
                    <div className="bg-white text-black p-1 rounded-sm group-hover:scale-110 transition-transform">
                        <Film size={20} className="fill-current" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 group-hover:to-white transition-all hidden sm:block">
                        WatchLedger
                    </h1>
                </Link>
            </div>

            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className={`flex items-center transition-all duration-300 ${showSearch ? 'w-full md:w-64 bg-zinc-900/80 border border-cinematic-border rounded-full px-3 py-1' : 'w-auto'}`}>
                    {showSearch ? (
                        <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
                            <Search size={16} className="text-gray-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none focus:outline-none text-sm text-white px-2 w-full"
                                onBlur={() => !searchTerm && setShowSearch(false)}
                            />
                            <button type="button" onClick={() => setShowSearch(false)}>
                                <X size={16} className="text-gray-400 hover:text-white" />
                            </button>
                        </form>
                    ) : (
                        <button onClick={() => setShowSearch(true)} className="text-gray-400 hover:text-white transition-colors">
                            <Search size={20} />
                        </button>
                    )}
                </div>

                {isAuthenticated ? (
                    <>
                        <Link to="/library" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                            <User size={16} />
                            <span className="hidden md:inline">Library</span>
                        </Link>
                        <Link to="/likes" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                            <span className="text-like-red">♥</span>
                            <span className="hidden md:inline">Likes</span>
                        </Link>
                        <div className="h-4 w-[1px] bg-cinematic-border"></div>
                        <button
                            onClick={handleLogout}
                            className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-like-red transition-colors"
                        >
                            <span className="hidden md:block">Logout</span>
                            <LogOut size={18} />
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
                    >
                        <LogIn size={16} />
                        <span className="hidden sm:inline">Sign In</span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

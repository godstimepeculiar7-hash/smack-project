import { useEffect, useState } from 'react';
import './DashBoard.scss';
import { auth } from '../../backend/firebase.utils';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import {
    FaBars,
    FaTimes,
    FaShoppingCart,
    FaHome,
    FaShoppingBag,
    FaHeart,
    FaMapMarkerAlt,
    FaSignOutAlt,
    FaMotorcycle
} from 'react-icons/fa';

function Dashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, []);

    async function logoutUser() {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    function toggleMenu() {
        setIsMenuOpen((prev) => !prev);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    return (
        <div className='dashboard-parent'>

            {/* SIDEBAR */}

            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <button className='close-menu' type='button' onClick={closeMenu}>
                    <FaTimes />
                </button>

                <div className='profile-section'>
                    <img
                        src={
                            user?.photoURL ||
                            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        }
                        alt='profile'
                    />

                    <h2>
                        {user?.displayName || 'Food Lover'}
                    </h2>

                    <p>{user?.email}</p>
                </div>

                <div className='sidebar-links'>
                    <div className='sidebar-link active'>
                        <FaHome />
                        <span>Dashboard</span>
                    </div>

                    <div className='sidebar-link'>
                        <FaShoppingBag />
                        <span>My Orders</span>
                    </div>

                    <div className='sidebar-link'>
                        <FaHeart />
                        <span>Favorite Meals</span>
                    </div>

                    <div className='sidebar-link'>
                        <FaMapMarkerAlt />
                        <span>Addresses</span>
                    </div>

                    <div
                        className='sidebar-link logout'
                        onClick={logoutUser}
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </div>
                </div>
            </div>

            <div
                className={`sidebar-overlay ${isMenuOpen ? 'visible' : ''}`}
                onClick={closeMenu}
            />

            {/* CONTENT */}

            <div className='dashboard-content'>
                <div className='content-header'>
                    <button
                        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
                        type='button'
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <button
                        className='cart-btn'
                        type='button'
                        onClick={() => navigate('/cart')}
                        aria-label='Open cart'
                    >
                        <FaShoppingCart />
                    </button>
                </div>

                {/* HERO */}

                <div className='hero-section'>

                    <div>
                        <h1>
                            Welcome Back 👋
                        </h1>

                        <p>
                            Ready for another delicious meal today?
                        </p>

                        <button>
                            Order Now
                        </button>
                    </div>

                    <img
                        src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
                        alt='food'
                    />

                </div>

                {/* STATS */}

                <div className='stats-container'>

                    <div className='stat-card'>
                        <FaShoppingBag className='stat-icon' />
                        <h2>12</h2>
                        <p>Total Orders</p>
                    </div>

                    <div className='stat-card'>
                        <FaHeart className='stat-icon' />
                        <h2>8</h2>
                        <p>Favorite Meals</p>
                    </div>

                    <div className='stat-card'>
                        <FaMotorcycle className='stat-icon' />
                        <h2>2</h2>
                        <p>Active Deliveries</p>
                    </div>

                </div>

                {/* ACTIVE ORDERS */}

                <div className='orders-section'>

                    <div className='section-title'>
                        <h2>Active Orders</h2>
                    </div>

                    <div className='order-card'>

                        <div>
                            <h3>Cheese Burger Combo</h3>
                            <p>Preparing your meal...</p>
                        </div>

                        <span className='preparing'>
                            Preparing
                        </span>

                    </div>

                    <div className='order-card'>

                        <div>
                            <h3>Pepperoni Pizza</h3>
                            <p>Rider is on the way</p>
                        </div>

                        <span className='delivery'>
                            On Delivery
                        </span>

                    </div>

                </div>

                {/* FAVORITE MEALS */}

                <div className='favorites-section'>

                    <div className='section-title'>
                        <h2>Favorite Meals</h2>
                    </div>

                    <div className='favorite-grid'>

                        <div className='meal-card'>

                            <img
                                src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop'
                                alt='burger'
                            />

                            <h3>Classic Burger</h3>

                            <p>$12</p>

                        </div>

                        <div className='meal-card'>

                            <img
                                src='https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop'
                                alt='pizza'
                            />

                            <h3>Pepperoni Pizza</h3>

                            <p>$18</p>

                        </div>

                        <div className='meal-card'>

                            <img
                                src='https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200&auto=format&fit=crop'
                                alt='shawarma'
                            />

                            <h3>Chicken Shawarma</h3>

                            <p>$10</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard;
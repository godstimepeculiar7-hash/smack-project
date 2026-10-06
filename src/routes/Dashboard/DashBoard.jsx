import { createElement, useContext, useEffect, useId, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import riceImage from '../../assets/shopnow4.jpg';
import { Products as bestSellerProducts } from '../../component/Our Best Sellers Desktop/products';
import riceProducts from '../../My Products/Rice';
import swallowProducts from '../../My Products/Swallow';
import { CartContext } from '../../backend/Cart';
import {
    FiCheck,
    FiChevronLeft,
    FiChevronRight,
    FiClock,
    FiCreditCard,
    FiGrid,
    FiHelpCircle,
    FiLock,
    FiLogOut,
    FiMail,
    FiMapPin,
    FiMinus,
    FiMenu,
    FiPackage,
    FiPlus,
    FiSettings,
    FiShoppingCart,
    FiShield,
    FiTrash2,
    FiTruck,
    FiUser,
    FiX
} from 'react-icons/fi';
import './DashBoard.scss';

const navigationItems = [
    { label: 'Overview', icon: FiGrid, kind: 'view', view: 'overview' },
    { label: 'My Profile', icon: FiUser, kind: 'view', view: 'profile' },
    { label: 'My Orders', icon: FiPackage, kind: 'view', view: 'orders' },
    { label: 'Cart', icon: FiShoppingCart, kind: 'view', view: 'cart' },
    { label: 'Addresses', icon: FiMapPin, kind: 'view', view: 'addresses' },
    { label: 'Settings', icon: FiSettings, kind: 'view', view: 'settings' },
    { label: 'Help & Support', icon: FiHelpCircle, view: 'support' }
];

function getCustomerName(user) {
    return user?.fullName || user?.name || user?.displayName || '';
}

function getInitials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase() || 'S';
}

function DashboardNavigation({
    activeView,
    mobile = false,
    onNavigate,
    onSelectView,
    onLogout,
    isLoggingOut
}) {
    return (
        <nav className="customer-nav" aria-label="Account navigation">
            <p className="customer-nav-label">YOUR ACCOUNT</p>
            {navigationItems.map(({ label, icon: Icon, view }) => {
                const active = view === activeView;
                const className = `customer-nav-link${active ? ' is-active' : ''}`;
                const content = (
                    <>
                        {createElement(Icon, { 'aria-hidden': true })}
                        <span>{label}</span>
                    </>
                );

                return (
                    <button
                        key={label}
                        className={className}
                        type="button"
                        aria-current={active ? 'page' : undefined}
                        onClick={() => {
                            onSelectView(view);
                            onNavigate?.();
                        }}
                    >
                        {content}
                    </button>
                );
            })}
            {mobile && (
                <button
                    className="customer-nav-link customer-nav-logout"
                    type="button"
                    disabled={isLoggingOut}
                    onClick={onLogout}
                >
                    <FiLogOut aria-hidden="true" />
                    <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
                </button>
            )}
        </nav>
    );
}

function DashboardSidebar({
    initials,
    name,
    email,
    activeView,
    onSelectView,
    onNavigate,
    onLogout,
    isLoggingOut,
    logoutError,
    mobile = false,
    open,
    onClose,
    drawerId,
    drawerRef
}) {
    return (
        <>
            {mobile && (
                <button
                    className={`dashboard-backdrop${open ? ' is-visible' : ''}`}
                    type="button"
                    tabIndex={open ? 0 : -1}
                    aria-label="Close navigation menu"
                    aria-hidden={!open}
                    onClick={onClose}
                />
            )}
            <aside
                id={mobile ? drawerId : undefined}
                className={`dashboard-sidebar${mobile ? ' mobile-drawer' : ''}${open ? ' is-open' : ''}`}
                aria-label={mobile ? 'Mobile account navigation' : 'Customer dashboard sidebar'}
                aria-modal={mobile && open ? 'true' : undefined}
                aria-hidden={mobile ? !open : undefined}
                role={mobile && open ? 'dialog' : undefined}
                inert={mobile && !open}
                ref={mobile ? drawerRef : undefined}
            >
                {mobile ? (
                    <div className="drawer-heading">
                        <div className="smack-wordmark" aria-label="SMACK">
                            <span className="smack-mark">S</span>
                            <span>SMACK</span>
                        </div>
                        <button
                            className="icon-button drawer-close"
                            type="button"
                            aria-label="Close navigation menu"
                            onClick={onClose}
                        >
                            <FiX aria-hidden="true" />
                        </button>
                    </div>
                ) : (
                    <div className="sidebar-brand">
                        <div className="smack-wordmark" aria-label="SMACK">
                            <span className="smack-mark">S</span>
                            <span>SMACK</span>
                        </div>
                    </div>
                )}
                <div className="sidebar-customer">
                    <span className="customer-avatar">{initials}</span>
                    <span className="sidebar-customer-details">
                        <strong>{name}</strong>
                        <span>{email}</span>
                    </span>
                </div>
                <DashboardNavigation
                    activeView={activeView}
                    mobile={mobile}
                    onNavigate={onClose}
                    onSelectView={onSelectView}
                    onLogout={onLogout}
                    isLoggingOut={isLoggingOut}
                />
                {!mobile && (
                    <button
                        className="sidebar-signout"
                        type="button"
                        disabled={isLoggingOut}
                        onClick={onLogout}
                    >
                        <FiLogOut aria-hidden="true" />
                        <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
                    </button>
                )}
                {logoutError && (
                    <p className="sidebar-logout-error" role="alert">{logoutError}</p>
                )}
                <div className="sidebar-help">
                    <span className="sidebar-help-icon"><FiHelpCircle aria-hidden="true" /></span>
                    <p>Need a hand?</p>
                    <button type="button" onClick={() => {
                        onSelectView('support');
                        onNavigate?.();
                    }}>
                        Talk to our team <FiChevronRight aria-hidden="true" />
                    </button>
                </div>
            </aside>
        </>
    );
}

function MobileDashboardHeader({ menuButtonRef, drawerId, menuOpen, onMenuClick }) {
    return (
        <header className="mobile-dashboard-header">
            <button
                ref={menuButtonRef}
                className="icon-button menu-trigger"
                type="button"
                aria-label="Open navigation menu"
                aria-controls={drawerId}
                aria-expanded={menuOpen}
                onClick={onMenuClick}
            >
                <FiMenu aria-hidden="true" />
            </button>
            <div className="smack-wordmark" aria-label="SMACK">
                <span className="smack-mark">S</span>
                <span>SMACK</span>
            </div>
        </header>
    );
}

function ProfileCard({ user, name }) {
    const email = user?.email || 'No email address on file';
    const verificationValue = user?.isVerified
        ?? user?.emailVerified
        ?? user?.isEmailVerified
        ?? user?.verified
        ?? user?.verificationStatus;
    const isVerified = verificationValue === true
        || verificationValue === 'true'
        || verificationValue === 'verified';
    const verificationAvailable = verificationValue !== undefined && verificationValue !== null;

    return (
        <section className="dashboard-panel profile-panel" id="profile" aria-labelledby="profile-title">
            <div className="panel-heading">
                <div>
                    <p className="section-kicker">ACCOUNT DETAILS</p>
                    <h1 id="profile-title">Your profile</h1>
                </div>
                <span className="profile-card-avatar">{getInitials(name)}</span>
            </div>
            <div className="profile-detail">
                <span>Full name</span>
                <strong>{name || 'Name not provided'}</strong>
            </div>
            <div className="profile-detail">
                <span>Email address</span>
                <strong className="profile-email">{email}</strong>
            </div>
            <div className="profile-detail verification-detail">
                <span>Email verification</span>
                {verificationAvailable ? (
                    <strong className={`profile-verification${isVerified ? ' is-verified' : ''}`}>
                        {isVerified ? <FiCheck aria-hidden="true" /> : <FiClock aria-hidden="true" />}
                        {isVerified ? 'Verified' : 'Not verified'}
                    </strong>
                ) : (
                    <strong className="profile-verification is-unknown">Status unavailable</strong>
                )}
            </div>
        </section>
    );
}

const sampleOrders = [
    {
        id: 'SMK-2048',
        date: 'Recently placed',
        items: 'Jollof Rice and Chicken',
        total: '₦12,500',
        status: 'Processing',
        statusKey: 'processing',
        image: riceImage
    },
    {
        id: 'SMK-1982',
        date: 'Previous order',
        items: 'Breaded Chicken Katsu Curry',
        total: '₦8,900',
        status: 'Delivered',
        statusKey: 'delivered',
        image: bestSellerProducts[0].image
    },
    {
        id: 'SMK-1874',
        date: 'Previous order',
        items: 'Smack Korean Sweet Chilli Wrap',
        total: '₦6,500',
        status: 'Delivered',
        statusKey: 'delivered',
        image: bestSellerProducts[3].image
    }
];

function OrdersView() {
    return (
        <section className="orders-view" aria-labelledby="orders-title">
            <div className="orders-view-heading">
                <div>
                    <p className="section-kicker">YOUR SMACK ACCOUNT</p>
                    <h2 id="orders-title">My orders</h2>
                    <p>Keep track of the good things coming your way.</p>
                </div>
                <span className="orders-count">{sampleOrders.length} sample orders</span>
            </div>
            <p className="orders-demo-note">
                These example orders are for display only. Your live order history will appear here once connected.
            </p>
            <div className="customer-orders-list">
                {sampleOrders.map((order) => (
                    <article className="customer-order-card" key={order.id}>
                        <div className="customer-order-image">
                            <img src={order.image} alt="" loading="lazy" />
                        </div>
                        <div className="customer-order-details">
                            <div className="customer-order-title-row">
                                <h3>Order {order.id}</h3>
                                <span className={`customer-order-status status-${order.statusKey}`}>
                                    {order.statusKey === 'delivered'
                                        ? <FiCheck aria-hidden="true" />
                                        : <FiClock aria-hidden="true" />}
                                    {order.status}
                                </span>
                            </div>
                            <p className="customer-order-items">{order.items}</p>
                            <span className="customer-order-date">{order.date}</span>
                        </div>
                        <div className="customer-order-total">
                            <span>Order total</span>
                            <strong>{order.total}</strong>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

const supportTopics = [
    {
        icon: FiPackage,
        title: 'Orders & tracking',
        description: 'Find out where to check order progress and what to do if an order needs attention.'
    },
    {
        icon: FiShoppingCart,
        title: 'Cart & checkout',
        description: 'Review your basket and update quantities before continuing to checkout.'
    },
    {
        icon: FiTruck,
        title: 'Delivery information',
        description: 'Review the delivery options and estimated timing shown during checkout.'
    },
    {
        icon: FiCreditCard,
        title: 'Payments',
        description: 'Available payment methods and payment steps are shown during checkout.'
    }
];

const supportFaqs = [
    {
        question: 'Where can I check the status of my order?',
        answer: 'Open My Orders in your dashboard to view your order history. Live order tracking will appear there when order data is connected.'
    },
    {
        question: 'Can I change items in my cart?',
        answer: 'Yes. Open Cart in your dashboard to change item quantities or remove items before checkout.'
    },
    {
        question: 'Where can I see delivery times and charges?',
        answer: 'Delivery options, estimated timing and any applicable charges are presented during checkout.'
    },
    {
        question: 'How do I get help with an order?',
        answer: 'Email the SMACK team with your name, order reference if available, and a short description of how they can help.'
    }
];

function SupportView() {
    return (
        <section className="support-view" aria-labelledby="support-title">
            <div className="support-view-heading">
                <p className="section-kicker">WE’RE HERE TO HELP</p>
                <h2 id="support-title">Help &amp; support</h2>
                <p>Find quick answers or get in touch with the SMACK team.</p>
            </div>

            <div className="support-contact-card">
                <span className="support-contact-icon"><FiMail aria-hidden="true" /></span>
                <div className="support-contact-copy">
                    <span>NEED A HAND?</span>
                    <h3>Talk to our team</h3>
                    <p>Send us a message and include your order reference if your question is about an order.</p>
                    <a href="mailto:info@Smack.co.uk">
                        <FiMail aria-hidden="true" />
                        Email info@Smack.co.uk
                    </a>
                </div>
                <div className="support-hours">
                    <span>OPENING HOURS</span>
                    <strong>9am–5pm</strong>
                    <small>Monday to Friday</small>
                </div>
            </div>

            <div className="support-topics">
                <div className="support-section-heading">
                    <div>
                        <p className="section-kicker">CUSTOMER CARE</p>
                        <h3>How can we help?</h3>
                    </div>
                </div>
                <div className="support-topic-grid">
                    {supportTopics.map(({ icon: Icon, title, description }) => (
                        <article className="support-topic-card" key={title}>
                            <span>{createElement(Icon, { 'aria-hidden': true })}</span>
                            <h4>{title}</h4>
                            <p>{description}</p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="support-faq">
                <div className="support-section-heading">
                    <div>
                        <p className="section-kicker">QUICK ANSWERS</p>
                        <h3>Frequently asked questions</h3>
                    </div>
                </div>
                <div className="support-faq-list">
                    {supportFaqs.map(({ question, answer }) => (
                        <details className="support-faq-item" key={question}>
                            <summary>{question}</summary>
                            <p>{answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AddressesView({ onGetHelp }) {
    return (
        <section className="account-section-view addresses-view" aria-labelledby="addresses-title">
            <div className="account-section-heading">
                <p className="section-kicker">DELIVERY DETAILS</p>
                <h2 id="addresses-title">Your addresses</h2>
                <p>Manage the places where you’d like your SMACK orders delivered.</p>
            </div>

            <div className="address-empty-card">
                <span className="address-empty-icon"><FiMapPin aria-hidden="true" /></span>
                <span className="address-status">ADDRESS BOOK</span>
                <h3>No saved addresses yet</h3>
                <p>
                    Your delivery addresses will appear here once they’re added to your account.
                    Address details haven’t been connected yet.
                </p>
                <button type="button" className="address-help-button" onClick={onGetHelp}>
                    Need help? Contact support <FiChevronRight aria-hidden="true" />
                </button>
            </div>

            <div className="address-privacy-note">
                <FiShield aria-hidden="true" />
                <p>Your address details are personal and should only be added when you’re ready to connect address management.</p>
            </div>
        </section>
    );
}

function SettingsView({
    user,
    name,
    emailUpdates,
    setEmailUpdates,
    orderUpdates,
    setOrderUpdates,
    onViewProfile
}) {
    return (
        <section className="account-section-view settings-view" aria-labelledby="settings-title">
            <div className="account-section-heading">
                <p className="section-kicker">MAKE IT YOURS</p>
                <h2 id="settings-title">Settings</h2>
                <p>Review your account information and dashboard preferences.</p>
            </div>

            <div className="settings-layout">
                <section className="settings-card" aria-labelledby="settings-account-title">
                    <div className="settings-card-heading">
                        <span className="settings-card-icon"><FiUser aria-hidden="true" /></span>
                        <div>
                            <h3 id="settings-account-title">Account information</h3>
                            <p>Your current SMACK account details.</p>
                        </div>
                    </div>
                    <div className="settings-account-detail">
                        <span>Name</span>
                        <strong>{name || 'Name not provided'}</strong>
                    </div>
                    <div className="settings-account-detail">
                        <span>Email address</span>
                        <strong>{user?.email || 'No email address on file'}</strong>
                    </div>
                    <button type="button" className="settings-text-action" onClick={onViewProfile}>
                        View profile details <FiChevronRight aria-hidden="true" />
                    </button>
                </section>

                <section className="settings-card" aria-labelledby="settings-preferences-title">
                    <div className="settings-card-heading">
                        <span className="settings-card-icon"><FiSettings aria-hidden="true" /></span>
                        <div>
                            <h3 id="settings-preferences-title">Communication preferences</h3>
                            <p>Choose what you’d like to see while using this dashboard.</p>
                        </div>
                    </div>
                    <label className="settings-preference">
                        <span>
                            <strong>SMACK news &amp; offers</strong>
                            <small>Product news and occasional offers</small>
                        </span>
                        <input
                            type="checkbox"
                            checked={emailUpdates}
                            onChange={(event) => setEmailUpdates(event.target.checked)}
                            aria-label="SMACK news and offers preference"
                        />
                    </label>
                    <label className="settings-preference">
                        <span>
                            <strong>Order updates</strong>
                            <small>Helpful updates about your orders</small>
                        </span>
                        <input
                            type="checkbox"
                            checked={orderUpdates}
                            onChange={(event) => setOrderUpdates(event.target.checked)}
                            aria-label="Order updates preference"
                        />
                    </label>
                    <p className="settings-local-note">Preferences are for this visit only; account-wide saving is not connected yet.</p>
                </section>

                <section className="settings-card settings-security-card" aria-labelledby="settings-security-title">
                    <div className="settings-card-heading">
                        <span className="settings-card-icon"><FiLock aria-hidden="true" /></span>
                        <div>
                            <h3 id="settings-security-title">Security &amp; privacy</h3>
                            <p>Your account is protected by SMACK’s existing sign-in security.</p>
                        </div>
                    </div>
                    <div className="settings-security-note">
                        <FiShield aria-hidden="true" />
                        <span>Password and security changes can be managed here when those account tools are available.</span>
                    </div>
                </section>
            </div>
        </section>
    );
}

const cartProducts = [...riceProducts, ...swallowProducts, ...bestSellerProducts];

const heroFoodImages = [
    { image: riceImage, alt: 'A plate of chicken and rice' },
    ...bestSellerProducts.map(({ image, name }) => ({ image, alt: name }))
];

function DashboardHeroCarousel() {
    const [activeImage, setActiveImage] = useState(0);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            setActiveImage((current) => (current + 1) % heroFoodImages.length);
        }, 5500);

        return () => window.clearInterval(intervalId);
    }, [paused]);

    const showImage = (index) => {
        setActiveImage((index + heroFoodImages.length) % heroFoodImages.length);
    };

    return (
        <div
            className="dashboard-hero-image"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setPaused(false);
                }
            }}
        >
            {heroFoodImages.map((slide, index) => (
                <img
                    className={`hero-food-image${index === activeImage ? ' is-active' : ''}`}
                    key={slide.alt}
                    src={slide.image}
                    alt={slide.alt}
                    aria-hidden={index !== activeImage}
                    loading="eager"
                    decoding="async"
                />
            ))}
            <div className="hero-image-controls" aria-label="Featured food images">
                <button
                    className="hero-image-arrow"
                    type="button"
                    aria-label="Show previous food image"
                    onClick={() => showImage(activeImage - 1)}
                >
                    <FiChevronLeft aria-hidden="true" />
                </button>
                <div className="hero-image-dots">
                    {heroFoodImages.map((slide, index) => (
                        <button
                            className={`hero-image-dot${index === activeImage ? ' is-active' : ''}`}
                            key={slide.alt}
                            type="button"
                            aria-label={`Show food image ${index + 1} of ${heroFoodImages.length}`}
                            aria-pressed={index === activeImage}
                            onClick={() => showImage(index)}
                        />
                    ))}
                </div>
                <button
                    className="hero-image-arrow"
                    type="button"
                    aria-label="Show next food image"
                    onClick={() => showImage(activeImage + 1)}
                >
                    <FiChevronRight aria-hidden="true" />
                </button>
            </div>
            <span className="hero-image-caption">
                <span className="hero-caption-dot" aria-hidden="true" />
                GOOD FOOD. GOOD MOOD.
            </span>
        </div>
    );
}

function formatNaira(amount) {
    return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

function CartView({ onBrowseMenu }) {
    const {
        cart,
        totalQuantity,
        setCart,
        removeFromCart,
        totalCost,
        shippingCost,
        tax,
        orderTotal
    } = useContext(CartContext);

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart((currentCart) => currentCart.map((item) => (
            item.id === productId ? { ...item, quantity } : item
        )));
    };

    return (
        <section className="cart-view" aria-labelledby="cart-title">
            <div className="cart-view-heading">
                <div>
                    <p className="section-kicker">YOUR SMACK ACCOUNT</p>
                    <h2 id="cart-title">Your cart</h2>
                    <p>Review the dishes you’ve picked for your next meal.</p>
                </div>
                <span className="cart-count">
                    {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                </span>
            </div>

            {cart.length === 0 ? (
                <div className="cart-empty-state">
                    <span className="cart-empty-icon"><FiShoppingCart aria-hidden="true" /></span>
                    <h3>Your cart is ready for something delicious</h3>
                    <p>When you add dishes, they’ll be waiting for you here.</p>
                    <button type="button" className="cart-browse-button" onClick={onBrowseMenu}>
                        Browse dishes <FiChevronRight aria-hidden="true" />
                    </button>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="dashboard-cart-items">
                        {cart.map((cartItem) => {
                            const product = cartProducts.find(({ id }) => id === cartItem.id);

                            return (
                                <article className="dashboard-cart-item" key={cartItem.id}>
                                    <div className="dashboard-cart-image">
                                        {product?.image ? (
                                            <img src={product.image} alt="" loading="lazy" />
                                        ) : (
                                            <FiShoppingCart aria-hidden="true" />
                                        )}
                                    </div>
                                    <div className="dashboard-cart-item-details">
                                        <h3>{product?.name || 'Unavailable dish'}</h3>
                                        <p>{product ? formatNaira(product.priceCents) : 'This item is no longer available'}</p>
                                        <div className="cart-item-controls">
                                            <div className="cart-quantity-control" aria-label={`Quantity for ${product?.name || 'unavailable dish'}`}>
                                                <button
                                                    type="button"
                                                    aria-label={`Decrease quantity of ${product?.name || 'unavailable dish'}`}
                                                    onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                                                >
                                                    <FiMinus aria-hidden="true" />
                                                </button>
                                                <span aria-live="polite">{cartItem.quantity}</span>
                                                <button
                                                    type="button"
                                                    aria-label={`Increase quantity of ${product?.name || 'unavailable dish'}`}
                                                    disabled={!product}
                                                    onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                                >
                                                    <FiPlus aria-hidden="true" />
                                                </button>
                                            </div>
                                            <button
                                                className="cart-remove-button"
                                                type="button"
                                                onClick={() => removeFromCart(cartItem.id)}
                                            >
                                                <FiTrash2 aria-hidden="true" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    {product && (
                                        <strong className="dashboard-cart-line-total">
                                            {formatNaira(product.priceCents * cartItem.quantity)}
                                        </strong>
                                    )}
                                </article>
                            );
                        })}
                    </div>

                    <aside className="dashboard-cart-summary" aria-label="Cart summary">
                        <h3>Order summary</h3>
                        <div><span>Items ({totalQuantity})</span><strong>{formatNaira(totalCost())}</strong></div>
                        <div><span>Delivery</span><strong>{formatNaira(shippingCost())}</strong></div>
                        <div><span>Estimated tax</span><strong>{formatNaira(tax)}</strong></div>
                        <div className="cart-summary-total"><span>Estimated total</span><strong>{formatNaira(orderTotal)}</strong></div>
                        <p>Final delivery and payment details can be confirmed at checkout.</p>
                        <button type="button" className="cart-browse-button" onClick={onBrowseMenu}>
                            Continue browsing <FiChevronRight aria-hidden="true" />
                        </button>
                    </aside>
                </div>
            )}
        </section>
    );
}

const menuItems = [
    ...bestSellerProducts.map(({ id, name, image, priceCents }) => ({
        id: `favourite-${id}`,
        productId: id,
        name,
        image,
        priceCents,
        category: 'SMACK favourites',
        categoryKey: 'favourites'
    })),
    ...riceProducts.slice(0, 8).map(({ id, name, image, priceCents }) => ({
        id: `rice-${id}`,
        productId: id,
        name: name.trim(),
        image,
        priceCents,
        category: 'Rice dishes',
        categoryKey: 'rice'
    })),
    ...swallowProducts.slice(0, 8).map(({ id, name, image, priceCents }) => ({
        id: `swallow-${id}`,
        productId: id,
        name: name.trim(),
        image,
        priceCents,
        category: 'Swallow & soups',
        categoryKey: 'swallow'
    }))
];

function ExploreMenu({ onSelectProduct, onBrowseAll }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const categories = [
        { label: 'Everything', value: 'all' },
        { label: 'SMACK favourites', value: 'favourites' },
        { label: 'Rice dishes', value: 'rice' },
        { label: 'Swallow & soups', value: 'swallow' }
    ];
    const visibleItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter((item) => item.categoryKey === activeCategory);

    return (
        <section className="menu-discovery" aria-labelledby="menu-discovery-title">
            <div className="menu-discovery-heading">
                <div>
                    <p className="section-kicker">A LITTLE SOMETHING DELICIOUS</p>
                    <h2 id="menu-discovery-title">A taste of the menu</h2>
                    <p className="menu-discovery-subtitle">Find something you’ll love from the SMACK kitchen.</p>
                </div>
                <button className="menu-view-all" type="button" onClick={onBrowseAll}>
                    Explore all <FiChevronRight aria-hidden="true" />
                </button>
            </div>
            <div className="menu-filter-row" role="group" aria-label="Filter menu items">
                {categories.map(({ label, value }) => (
                    <button
                        className={`menu-filter${activeCategory === value ? ' is-active' : ''}`}
                        key={value}
                        type="button"
                        aria-pressed={activeCategory === value}
                        onClick={() => setActiveCategory(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <p className="menu-results-count" aria-live="polite">
                Showing {visibleItems.length} {visibleItems.length === 1 ? 'dish' : 'dishes'}
            </p>
            <div className="menu-product-grid">
                {visibleItems.map((product) => (
                    <button
                        className="menu-product-card"
                        key={product.id}
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        aria-label={`View ${product.name}`}
                    >
                        <span className="menu-product-image" aria-hidden="true">
                            <img src={product.image} alt="" loading="lazy" />
                        </span>
                        <span className="menu-product-shade" aria-hidden="true" />
                        <span className="menu-product-info">
                            <span className="menu-product-category">{product.category}</span>
                            <strong>{product.name}</strong>
                            <span className="menu-product-arrow" aria-hidden="true">
                                <FiChevronRight />
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}

function DashboardProductView({ product, onBack, onViewCart }) {
    const { addToCart } = useContext(CartContext);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        addToCart({ id: product.productId });
        setAddedToCart(true);
    };

    return (
        <section className="dashboard-product-view" aria-labelledby="dashboard-product-title">
            <button className="product-back-button" type="button" onClick={onBack}>
                <FiChevronLeft aria-hidden="true" />
                Back to menu
            </button>
            <article className="dashboard-product-detail">
                <div className="dashboard-product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="dashboard-product-detail-copy">
                    <p className="section-kicker">{product.category}</p>
                    <h2 id="dashboard-product-title">{product.name}</h2>
                    <p className="dashboard-product-price">{formatNaira(product.priceCents)}</p>
                    <p className="dashboard-product-description">
                        Made with care in the SMACK kitchen. Add this dish to your cart when you’re ready to order.
                    </p>
                    <button className="product-add-button" type="button" onClick={handleAddToCart}>
                        <FiShoppingCart aria-hidden="true" />
                        Add to cart
                    </button>
                    {addedToCart && (
                        <div className="product-added-confirmation" role="status">
                            <span>Added to your cart.</span>
                            <button type="button" onClick={onViewCart}>View cart</button>
                        </div>
                    )}
                </div>
            </article>
        </section>
    );
}

function Dashboard({ user }) {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('overview');
    const [menuOpen, setMenuOpen] = useState(false);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState('');
    const menuButtonRef = useRef(null);
    const drawerRef = useRef(null);
    const drawerId = useId();
    const name = getCustomerName(user);
    const initials = getInitials(name);
    const firstName = name ? name.split(/\s+/)[0] : '';
    const handleViewSelect = (view) => {
        setSelectedProduct(null);
        setActiveView((currentView) => (
            view === currentView && view !== 'overview' ? 'overview' : view
        ));
    };
    const browseMenu = () => {
        setSelectedProduct(null);
        setActiveView('menu');
    };
    const selectProduct = (product) => {
        setSelectedProduct(product);
        setActiveView('product');
    };
    const handleLogout = async () => {
        setIsLoggingOut(true);
        setLogoutError('');

        try {
            await axios.post(
                'http://localhost:5000/auth/logout',
                {},
                { withCredentials: true }
            );
            navigate('/login', { replace: true });
        } catch (error) {
            const responseMessage = error.response?.data?.message;
            setLogoutError(
                typeof responseMessage === 'string'
                    ? responseMessage
                    : 'We couldn’t sign you out. Please try again.'
            );
        } finally {
            setIsLoggingOut(false);
        }
    };

    useEffect(() => {
        if (activeView !== 'menu') return undefined;

        const frameId = window.requestAnimationFrame(() => {
            document.getElementById('menu-discovery-title')?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth',
                block: 'start'
            });
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [activeView]);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
                return;
            }

            if (event.key === 'Tab' && drawerRef.current) {
                const focusableElements = drawerRef.current.querySelectorAll(
                    'a[href], button:not(:disabled)'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement?.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        const previousOverflow = document.body.style.overflow;
        const menuButton = menuButtonRef.current;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
        drawerRef.current?.querySelector('button[aria-label="Close navigation menu"]')?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
            menuButton?.focus();
        };
    }, [menuOpen]);

    return (
        <div className="customer-dashboard">
            <DashboardSidebar
                initials={initials}
                name={name || 'Smack customer'}
                email={user?.email || 'Smack customer'}
                activeView={activeView}
                onSelectView={handleViewSelect}
                onNavigate={() => setMenuOpen(false)}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
                logoutError={logoutError}
            />
            <DashboardSidebar
                initials={initials}
                name={name || 'Smack customer'}
                email={user?.email || 'Smack customer'}
                activeView={activeView}
                onSelectView={handleViewSelect}
                onNavigate={() => setMenuOpen(false)}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
                logoutError={logoutError}
                mobile
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                drawerId={drawerId}
                drawerRef={drawerRef}
            />
            <main className="dashboard-main" inert={menuOpen}>
                <MobileDashboardHeader
                    menuButtonRef={menuButtonRef}
                    drawerId={drawerId}
                    menuOpen={menuOpen}
                    onMenuClick={() => setMenuOpen(true)}
                />
                <div className="dashboard-page-content" id="overview">
                    <section className="dashboard-hero">
                        <div className="dashboard-hero-copy">
                            <span className="hero-kicker">
                                <span className="hero-kicker-dot" aria-hidden="true" />
                                YOUR TABLE IS WAITING
                            </span>
                            <h1>Welcome back{firstName ? `, ${firstName}` : ''}.</h1>
                            <p>Make today a little more delicious. Your next SMACK favourite is just a few taps away.</p>
                            <button className="hero-menu-link" type="button" onClick={browseMenu}>
                                Browse the menu <FiChevronRight aria-hidden="true" />
                            </button>
                            <div className="hero-customer">
                                <span className="hero-customer-avatar">{initials}</span>
                                <span>{firstName ? `Made for you, ${firstName}` : 'Your SMACK account'}</span>
                            </div>
                        </div>
                        <DashboardHeroCarousel />
                    </section>
                    {activeView === 'profile' ? (
                        <div className="profile-view-layout">
                            <div className="profile-view-intro">
                                <p className="section-kicker">ACCOUNT DETAILS</p>
                                <h2>My profile</h2>
                                <p>Review your personal details and email verification status.</p>
                            </div>
                            <ProfileCard user={user} name={name} />
                        </div>
                    ) : activeView === 'orders' ? (
                        <OrdersView />
                    ) : activeView === 'cart' ? (
                        <CartView onBrowseMenu={browseMenu} />
                    ) : activeView === 'support' ? (
                        <SupportView />
                    ) : activeView === 'addresses' ? (
                        <AddressesView onGetHelp={() => setActiveView('support')} />
                    ) : activeView === 'settings' ? (
                        <SettingsView
                            user={user}
                            name={name}
                            emailUpdates={emailUpdates}
                            setEmailUpdates={setEmailUpdates}
                            orderUpdates={orderUpdates}
                            setOrderUpdates={setOrderUpdates}
                            onViewProfile={() => setActiveView('profile')}
                        />
                    ) : activeView === 'product' && selectedProduct ? (
                        <DashboardProductView
                            product={selectedProduct}
                            onBack={browseMenu}
                            onViewCart={() => setActiveView('cart')}
                        />
                    ) : (
                        <ExploreMenu
                            onSelectProduct={selectProduct}
                            onBrowseAll={browseMenu}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;

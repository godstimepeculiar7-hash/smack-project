import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { FiCheck, FiPlus, FiSearch, FiX } from 'react-icons/fi';
import './ProductSearch.scss';

function normalizeSearchProducts(data) {
    if (!Array.isArray(data)) {
        throw new Error('The menu service returned an unexpected response.');
    }

    return data.map((product) => {
        const id = product._id || product.id;
        const name = typeof product.name === 'string' ? product.name.trim() : '';
        const image = typeof product.image === 'string' ? product.image.trim() : '';
        const priceCents = Number(product.priceCents);

        if (!id || !name || !image || !Number.isFinite(priceCents)) {
            throw new Error('A menu product is missing required information.');
        }

        return {
            id: String(id),
            name,
            image,
            priceCents,
            searchName: name.toLocaleLowerCase()
        };
    });
}

function getSearchError(error) {
    const serverMessage = error.response?.data?.message;
    if (typeof serverMessage === 'string') return serverMessage;
    if (axios.isAxiosError(error)) {
        return error.response
            ? 'We couldn’t load the menu. Please try again.'
            : 'We couldn’t connect to the menu. Check your connection and try again.';
    }
    return error instanceof Error ? error.message : 'We couldn’t load the menu. Please try again.';
}

function ProductSearch({ open, onClose, onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reloadCount, setReloadCount] = useState(0);
    const [loadError, setLoadError] = useState('');
    const [addingProductId, setAddingProductId] = useState('');
    const [addedProducts, setAddedProducts] = useState({});
    const [addError, setAddError] = useState('');
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const controller = new AbortController();
        const previousOverflow = document.body.style.overflow;
        const previousFocus = document.activeElement;
        document.body.style.overflow = 'hidden';
        setQuery('');
        setLoadError('');
        setAddError('');
        setAddedProducts({});
        setIsLoading(true);
        searchInputRef.current?.focus();

        const loadProducts = async () => {
            try {
                const response = await axios.get(
                    'https://smackbackend.onrender.com/products',
                    { signal: controller.signal }
                );
                setProducts(normalizeSearchProducts(response.data));
            } catch (error) {
                if (axios.isCancel(error)) return;
                setLoadError(getSearchError(error));
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        };

        loadProducts();
        return () => {
            controller.abort();
            document.body.style.overflow = previousOverflow;
            if (previousFocus instanceof HTMLElement) previousFocus.focus();
        };
    }, [open, reloadCount]);

    const matchingProducts = useMemo(() => {
        const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
        if (terms.length === 0) return [];

        return products
            .filter(({ searchName }) => terms.every((term) => searchName.includes(term)))
            .sort((left, right) => {
                const leftRank = left.searchName === terms.join(' ') ? 0 : left.searchName.startsWith(terms[0]) ? 1 : 2;
                const rightRank = right.searchName === terms.join(' ') ? 0 : right.searchName.startsWith(terms[0]) ? 1 : 2;
                return leftRank - rightRank || left.name.localeCompare(right.name);
            });
    }, [products, query]);

    const handleAddToCart = async (productId) => {
        setAddingProductId(productId);
        setAddError('');
        try {
            const countRefreshed = await onAddToCart(productId);
            if (countRefreshed === false) return;

            setAddedProducts((current) => ({ ...current, [productId]: true }));
        } catch (error) {
            setAddError(error instanceof Error ? error.message : 'We couldn’t add this dish. Please try again.');
        } finally {
            setAddingProductId('');
        }
    };

    if (!open) return null;

    return (
        <div className="product-search-backdrop" onMouseDown={onClose}>
            <section
                className="product-search-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-search-title"
                onMouseDown={(event) => event.stopPropagation()}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') onClose();
                    if (event.key === 'Tab') {
                        const focusable = event.currentTarget.querySelectorAll(
                            'input:not(:disabled), button:not(:disabled)'
                        );
                        const first = focusable[0];
                        const last = focusable[focusable.length - 1];

                        if (event.shiftKey && document.activeElement === first) {
                            event.preventDefault();
                            last?.focus();
                        } else if (!event.shiftKey && document.activeElement === last) {
                            event.preventDefault();
                            first?.focus();
                        }
                    }
                }}
            >
                <div className="product-search-heading">
                    <div>
                        <p className="product-search-kicker">FROM THE SMACK KITCHEN</p>
                        <h2 id="product-search-title">Find your next favourite</h2>
                    </div>
                    <button
                        className="product-search-close"
                        type="button"
                        aria-label="Close product search"
                        onClick={onClose}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </div>
                <form className="product-search-form" role="search" onSubmit={(event) => event.preventDefault()}>
                    <FiSearch aria-hidden="true" />
                    <input
                        ref={searchInputRef}
                        type="search"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setAddError('');
                        }}
                        placeholder="Search jollof rice, egusi soup..."
                        aria-label="Search SMACK menu"
                        aria-controls="product-search-results"
                    />
                    {query && (
                        <button
                            className="product-search-clear"
                            type="button"
                            onClick={() => {
                                setQuery('');
                                searchInputRef.current?.focus();
                            }}
                        >
                            Clear
                        </button>
                    )}
                </form>
                <div className="product-search-results" id="product-search-results" aria-live="polite">
                    {isLoading ? (
                        <p className="product-search-message" role="status">Loading dishes from the menu...</p>
                    ) : loadError ? (
                        <div className="product-search-error" role="alert">
                            <p>{loadError}</p>
                            <button type="button" onClick={() => setReloadCount((count) => count + 1)}>
                                Try again
                            </button>
                        </div>
                    ) : !query.trim() ? (
                        <p className="product-search-message">Search our dishes by name or ingredients.</p>
                    ) : matchingProducts.length === 0 ? (
                        <div className="product-search-empty">
                            <span>No dishes found for “{query.trim()}”</span>
                            <p>Try another dish name, such as “rice”, “soup” or “chicken”.</p>
                        </div>
                    ) : (
                        <>
                            <p className="product-search-count">
                                {matchingProducts.length} {matchingProducts.length === 1 ? 'dish' : 'dishes'} found
                            </p>
                            <ul className="product-search-list">
                                {matchingProducts.map((product) => {
                                    const isAdded = addedProducts[product.id];
                                    const isAdding = addingProductId === product.id;
                                    return (
                                        <li className="product-search-result" key={product.id}>
                                            <img src={product.image} alt="" loading="lazy" />
                                            <div className="product-search-result-copy">
                                                <strong>{product.name}</strong>
                                                <span>₦{Math.round(product.priceCents).toLocaleString('en-NG')}</span>
                                            </div>
                                            <button
                                                className={`product-search-add${isAdded ? ' is-added' : ''}`}
                                                type="button"
                                                disabled={Boolean(addingProductId) || isAdded}
                                                onClick={() => handleAddToCart(product.id)}
                                                aria-label={isAdded ? `${product.name} added to cart` : `Add ${product.name} to cart`}
                                            >
                                                {isAdded ? <FiCheck aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                                                <span>{isAdding ? 'Adding...' : isAdded ? 'Added' : 'Add'}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            {addError && <p className="product-search-add-error" role="alert">{addError}</p>}
                        </>
                    )}
                </div>
                <p className="product-search-footnote">Menu items and prices are from the current SMACK menu.</p>
            </section>
        </div>
    );
}

export default ProductSearch;

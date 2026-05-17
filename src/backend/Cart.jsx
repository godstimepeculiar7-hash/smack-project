import { createContext, useState } from "react";
import riceProducts from '../My Products/Rice';
import swallow from '../My Products/Swallow';
import { Products } from '../component/Our Best Sellers Desktop/products';
import { deliveryOptions } from './deliveryOptions';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                const newCart = prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                console.log('Cart:', newCart);
                return newCart;
            }

            const newCart = [...prevCart, { id: product.id, quantity: 1, deliveryOptionId: '1' }];
            console.log('Cart:', newCart);
            return newCart;
        });
    };

    const updateDeliveryOption = (productId, deliveryOptionId) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === productId) {
                    return {
                        ...item,
                        deliveryOptionId: deliveryOptionId
                    };
                }
                return item;
            });
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
          return prevCart.filter((item) => item.id !== productId);
        })
    }


    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Total Quantity:', totalQuantity);

    const totalCost = () => {
        const allProducts = [...riceProducts, ...swallow, ...Products];
        const productPrice = cart.reduce((total, cartItem) => {
            const matchingProduct = allProducts.find((product) => {
                return product.id === cartItem.id
            });

            if(!matchingProduct) {
                return total;
            }

            return total + (matchingProduct.priceCents * cartItem.quantity);
        }, 0)
        
        return productPrice;
    }

    const shippingCost = () => {
        const shippingPrice = cart.reduce((total, cartItem) => {
            const selectedOption = deliveryOptions.find((option) => {
                return option.id === cartItem.deliveryOptionId
            })
            if(!selectedOption) {
                return total;
            }

            return total + selectedOption.priceCents;
        }, 0)

        return shippingPrice;
    }

    const totalBeforeTax = totalCost() + shippingCost();
    const tax = totalBeforeTax * 0.05;
    const orderTotal = totalBeforeTax + tax;

    return (<CartContext.Provider value={{ cart, setCart, addToCart, totalQuantity, updateDeliveryOption, removeFromCart, totalCost, shippingCost, totalBeforeTax, tax, orderTotal }}>{children}</CartContext.Provider>)
};
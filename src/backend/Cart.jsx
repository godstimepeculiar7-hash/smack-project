import { createContext, useState } from "react";

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

    return (<CartContext.Provider value={{ cart, setCart, addToCart, totalQuantity, updateDeliveryOption, removeFromCart }}>{children}</CartContext.Provider>)
};
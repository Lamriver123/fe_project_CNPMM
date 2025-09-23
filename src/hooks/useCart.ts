import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { cartApi } from '../api/cartApi.ts';
import type { CartResponse } from '../types/Cart';

export const useCart = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    let count: number = 0;

    const fetchCart = useCallback(async () => {
        if (!token) {
            setError('No authentication token');
            return;
        }

        try {
            if (count === 0) {
                count += 1;
                setLoading(true);
            }
            setError(null);
            const response = await cartApi.getCart();
            setCart(response);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const updateQuantity = async (productId: string, quantity: number) => {
        if (!token) {
            setError('No authentication token');
            return;
        }

        try {

            setError(null);
            const response = await cartApi.updateQuantity(productId, quantity);
            console.log('>>> Updated cart response:', response);
            fetchCart();
        } catch (err: any) {
            // setError(err.message || 'Failed to update quantity');
            // throw err;
            if (err.response) {
            // Lỗi từ BE trả về
                alert(err.response.data.message || 'Failed to update quantity');
             //   setError(err.response.data.message || 'Failed to update quantity');
            } else {
                // Lỗi network hoặc lỗi khác
                setError(err.message || 'Failed to update quantity');
            }
        }
    };

    const removeItem = async (productId: string) => {
        if (!token) {
            setError('No authentication token');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await cartApi.removeItem(productId);
            fetchCart();
            console.log('>>> Removed item response:', response);
        } catch (err: any) {
            setError(err.message || 'Failed to remove item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!token) {
            setError('No authentication token');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await cartApi.clearCart();
            console.log('>>> Cleared cart response:', response);
            fetchCart();
        } catch (err: any) {
            setError(err.message || 'Failed to clear cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId: string, quantity: number = 1) => {
        if (!token) {
            setError('No authentication token');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await cartApi.addToCart(productId, quantity);
            await fetchCart(); 
            setCart(response);
        } catch (err: any) {
            setError(err.message || 'Failed to add to cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch cart when component mounts and token is available
    useEffect(() => {
        if (token && !cart) {
            fetchCart();
        }
    }, [token, cart, fetchCart]);

    return {
        cart,
        loading,
        error,
        fetchCart,
        updateQuantity,
        removeItem,
        clearCart,
        addToCart,
        refetch: fetchCart
    };
};
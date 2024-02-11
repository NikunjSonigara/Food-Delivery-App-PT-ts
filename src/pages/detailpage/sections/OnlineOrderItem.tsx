import React, { FC, useEffect, useState } from 'react';
import { CartData, PostData } from '../../../data';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, updateQuantity } from '../../../redux/slices/CartSlice';

const OnlineOrderItem: FC<{ item: PostData }> = ({ item }) => {
    const cart: CartData[] = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    const [qun, setQun] = useState(1);

    const getItemFromCart = () => {
        const cartItem = cart.find(i => i.id === item.id);
        const q = cartItem?.quantity;
        setQun(q || 0);
    };

    const increment = () => {
        setQun(prev => {
            const newQuntity = prev + 1;
            dispatch(updateQuantity({ id: item.id, quantity: newQuntity }));
            return newQuntity;
        })
    };

    const decrement = () => {
        setQun(prev => {
            const newQuntity = prev - 1;
            if (newQuntity < 1) {
                removeFromCart();
            }
            else {
                dispatch(updateQuantity({ id: item.id, quantity: newQuntity }));
            }
            return newQuntity;
        })
    };

    const addToCart = () => {
        const { id, image, name, description, price } = item;
        const quantity = 1;
        dispatch(add({ id, image, name, description, price, quantity }));
    };

    const removeFromCart = () => {
        dispatch(remove(item.id));
    };

    useEffect(() => {
        getItemFromCart();
    }, [cart]); 

    return (
        <div className='flex gap-6' key={item.id}>
            <img src={item.image} className='rounded-2xl overflow-hidden h-[180px] w-[180px] object-cover' alt="" />
            <div className='flex flex-col gap-3'>
                <p className='text-xl font-normal'>{item.name}</p>
                <p className='text-sm'>{item.description}</p>
                <p className='text-xl font-normal'>₹{item.price}</p>
                {cart.some(i => i.id === item.id) ? (
                    <div className="shopping_card_page_content1_item_counter mt-4">
                        <div className="h-[40px] w-[40px] flex items-center justify-center rounded-sm cursor-pointer bg-[color:#F3F3F3] " onClick={decrement}>
                            <p className='text-xl'>-</p>
                        </div>
                        <div className="h-[40px] w-[40px] flex items-center justify-center rounded-sm">
                            <p className=' text-lg'>{qun}</p>
                        </div>
                        <div className='h-[40px] w-[40px] flex items-center justify-center rounded-sm cursor-pointer bg-[color:var(--shopping-cart-yellow-color)] ' onClick={increment}>
                            <p className='text-xl text-white'>+</p>
                        </div>
                    </div>
                ) : (
                    <button onClick={addToCart} className='w-[180px] border-[1px] bg-[color:var(--shopping-cart-yellow-color)] p-2 text-white font-medium rounded-sm mt-4'>Add to Cart</button>
                )}
            </div>
        </div>
    );
};

export default OnlineOrderItem;

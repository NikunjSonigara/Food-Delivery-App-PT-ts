import { FC, useState } from "react"
import "./CartItem.css"
import { CartData, PostData } from "../../data"
import { useDispatch } from "react-redux";
import { remove, updateQuantity } from "../../redux/slices/CartSlice";

const CartItem : FC<{item: CartData}> = ({item}) => {

    const dispatch = useDispatch();
    const [qun, setQun] = useState(item.quantity);

    const increment = () => {
        setQun((prev: number) => {
            const newQuntity = prev + 1;
            dispatch(updateQuantity({ id: item.id, quantity: newQuntity }));
            return newQuntity;
        })
    };

    const decrement = () => {
        setQun((prev: number) => {
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

    const removeFromCart = () => {
        dispatch(remove(item.id));
    };

    return (
        <div className="shopping_card_page_content1_item">
            <div className="shopping_card_page_content1_item_top">
                <img src={item.image} alt="" className=" h-48 w-full object-cover rounded-2xl" />
            </div>
            <div className="shopping_card_page_content1_item_bottom">
                <div className="shopping_card_page_content1_item_name_price">
                    <span className="shopping_card_page_content1_item_name">{item.name}</span>
                    <span className="shopping_card_page_content1_item_price">₹{item.price}</span>
                </div>
                <span className="shopping_card_page_content1_item_desc">{item.description}</span>
                <div className="shopping_card_page_content1_item_counter_box">
                    <div className="shopping_card_page_content1_item_counter">
                        <div className="shopping_card_page_content1_item_counter_minus cursor-pointer" onClick={decrement}>
                            <p>-</p>
                        </div>
                        <div className="shopping_card_page_content1_item_counter_text">
                            <p>{item.quantity}</p>
                        </div>
                        <div className="shopping_card_page_content1_item_counter_plus cursor-pointer" onClick={increment}>
                            <p>+</p>
                        </div>
                    </div>
                </div>
                <hr className="shopping_card_page_content1_item_hr" />
                <div className="shopping_card_page_content1_item_subtotal_div">
                    <span className="shopping_card_page_content1_item_subtotal_text">Subtotal</span>
                    <span className="shopping_card_page_content1_item_sub_text">₹{parseInt(item.price) * item.quantity}</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem


import { useSelector } from "react-redux"
import { CartData, CoupanCode, PostData } from "../../data"
import "./CartPage.css"
import { InputHTMLAttributes, useEffect, useState } from "react";
import CartItem from "../../components/CartItems/CartItem";
import { coupan_code } from "../../API/coupan_code";
import { Link } from "react-router-dom";

const CartPage = () => {

    const cart: CartData[] = useSelector((state: any) => state.cart);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [discount, setDiscount] = useState(0);
    const [finalAmmount, setFinalAmount] = useState(0);
    let coupanCode = "";

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        coupanCode = event.target.value;
        console.log(coupanCode);
    }

    const discountHandler = () => {
        let dis = 0;
        try {
            const coupanCodeData: CoupanCode = coupan_code;
            if (coupanCodeData[coupanCode]) {
                dis = coupanCodeData[coupanCode];
            }
        }
        catch (e) {
            console.log("Error avi gy Coupan code leva ma.");
        }
        setDiscount(dis);
    }

    useEffect(() => {
        let sum = cart.reduce((prev: number, curr: CartData) => prev + parseInt(curr.price) * curr.quantity, 0);
        setTotalAmount(sum);
        if (sum - discount < 0) {
            setFinalAmount(0);
        }
        else {
            setFinalAmount(sum - discount);
        }
    }, [cart, discount]);

    return (
        <div className="shopping_cart_page">
            <div className="shopping_card_page_content1">
                <span className="shopping_card_page_content1_title">
                    Your Cart
                </span>
                {
                    cart.length === 0 ?
                        (
                            <div className="flex flex-col items-center justify-center">
                                <img src="https://www.shutterstock.com/shutterstock/videos/1102880351/thumb/1.jpg?ip=x480" alt="" />
                                <Link to='/menu'>
                                    <button className="w-[180px] border-[1px] bg-[color:var(--shopping-cart-yellow-color)] p-2 text-white font-medium rounded-sm mt-4">Go For Food</button>
                                </Link>
                            </div>
                        ) : (
                            <div className="shopping_card_page_content1_flex">
                                <div className="shopping_card_page_content1_items_div">
                                    {
                                        cart.map((item: CartData) => (
                                            <CartItem key={item.id} item={item} />
                                        ))
                                    }
                                </div>
                                <div className="shopping_card_page_content1_sidebar">
                                    <div className="shopping_card_page_content1_sidebar_box">
                                        <span className="shopping_card_page_content1_sidebar_title">Total</span>
                                        <div className="shopping_card_page_content1_sidebar_box_total_amount">
                                            <span className="shopping_card_page_content1_sidebar_box_total">Total Amount</span>
                                            <span className="shopping_card_page_content1_sidebar_box_amount">₹{totalAmount}</span>
                                        </div>
                                        <div className="shopping_card_page_content1_sidebar_box_total_amount">
                                            <span className="shopping_card_page_content1_sidebar_box_total">Discount</span>
                                            <span className="shopping_card_page_content1_sidebar_box_amount">- ₹{discount}</span>
                                        </div>
                                        <hr className="shopping_card_page_content1_sidebar_hr" />
                                        <div className="shopping_card_page_content1_sidebar_box_total_amount">
                                            <span className="shopping_card_page_content1_sidebar_box_total">Amount to Paid</span>
                                            <span className="shopping_card_page_content1_sidebar_box_amount">₹{finalAmmount}</span>
                                        </div>
                                        <div className="shopping_card_page_content1_sidebar_box_coupan_code_box">
                                            <input type="text" className="shopping_card_page_content1_sidebar_box_coupan_code"
                                                placeholder="Apply coupan code" onChange={changeHandler} />
                                            <button className="shopping_card_page_content1_sidebar_box_coupan_code_button" onClick={discountHandler}>Apply</button>
                                        </div>
                                        <button className="shopping_card_page_content1_sidebar_box_order_now_button">Order Now</button>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default CartPage
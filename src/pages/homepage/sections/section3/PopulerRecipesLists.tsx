import { NavLink } from "react-router-dom"
import "./PopulerRecipesList.css"
import { useEffect, useState } from "react"
import { menu_popular_recieps_list } from "../../../../API/menu_popular_recipes_list";
import { HomePopulerListData } from "../../../../data";
import { GiShoppingBag } from "react-icons/gi";

const PopulerRecipesLists = () => {

    const [list, setList] = useState<string[] | null>(null);
    const [items, setItems] = useState<HomePopulerListData[] | null>(null);
    const [selected, setSelected] = useState<string>("");

    const getPopulerRecipesData = (data: string | null): void => {
        try {
            const res = menu_popular_recieps_list;
            setList(Object.keys(res));
            const firstDataName: string = Object.keys(res)[0];
            setItems(res[(data || firstDataName) as keyof typeof res]);
            setSelected(data || firstDataName);
        }
        catch (e) {
            console.log("Populer List levama error avi gy.");
        }
    }

    useEffect(() => {
        getPopulerRecipesData(null);
    }, []);

    return (
        <div className="popular_recipes">
            <div className="popular_recipes_header">
                <img id="popular_recipes_header_img" src="https://nikunjsonigara.github.io/Food-Delivery-App-PT/image/Group%205.png" alt="" />
                <span id="popular_recipes_header_name">Popular Recipes</span>
                <img id="popular_recipes_header_img" src="https://nikunjsonigara.github.io/Food-Delivery-App-PT/image/Vector.png" alt="" />
            </div>
            <div className="popular_recipes_list">
                {
                    list?.map((item: string, index: number) => (
                        <button className={`${item === selected ? "selected" : ""} popular_recipes_button`} key={index} onClick={() => getPopulerRecipesData(item)}>
                            {item}
                        </button>
                    ))
                }
            </div>
            <div className="popular_recipes_box_list">
                {
                    items?.map((item: HomePopulerListData) => (
                        <div key={item.id} className="popular_recipes_main_box">
                            <div className="popular_recipes_box">
                                <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                    src={item.image} alt="Pizza" /></div>
                                <div className="popular_recipes_subbox">
                                    <span id="popular_recipes_box_name">{item.name}</span>
                                    <span id="popular_recipes_box_time">{item.time}</span>
                                </div>
                                <span id="popular_recipes_box_address">{item.description}</span>
                                <span id="popular_recipes_box_price">{item.price}</span>
                                <div className={`${item.shopping ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`}>
                                    <GiShoppingBag className={`${item.shopping ? "text-white" : " text-black"}`} />
                                </div>
                                {item.popular &&
                                    <div className="popular_recipes_tag">
                                        <p>Popular</p>
                                    </div>
                                }
                                <div className="popular_recipes_box_center_border">
                                </div>
                                <div className="popular_recipes_circle_center_border"></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PopulerRecipesLists
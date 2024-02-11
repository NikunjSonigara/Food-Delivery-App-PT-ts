import React, { useEffect, useState } from 'react'
import OnlineOrder from './sections/OnlineOrder'
import { useLocation, useSearchParams } from 'react-router-dom'
import { TopBrandsData } from '../../data';
import { top_brands_data } from '../../API/top_brands_data';
import Spinner from '../../components/Spinner/Spinner';

const DetailPage = () => {

    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<TopBrandsData | null>(null);
    const [img1, setImg1] = useState<string>("");
    const [img2, setImg2] = useState<string>("");
    const [img3, setImg3] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const getTopBrandsData = () => {
        setLoading(true);
        try {
            const res: TopBrandsData[] = top_brands_data;
            const pageData: TopBrandsData[] = res.filter(item => item.name === searchParams.get('brand'));
            setData(pageData[0]);
            const foodItems = pageData[0].food[0].food_items;
            for (let i = 0; i < pageData[0].food.length; i++) {
                if (foodItems.length > 3) {
                    // let randomNumber1 = Math.floor(Math.random());
                    // let randomNumber2 = Math.floor(Math.random());
                    // let randomNumber3 = Math.floor(Math.random());
                    // while (randomNumber1 === randomNumber2){
                    //     randomNumber2 = Math.floor(Math.random());
                    // }
                    // while(randomNumber1 === randomNumber3 || randomNumber2 === randomNumber3){
                    //     randomNumber3 = Math.floor(Math.random());
                    // }
                    setImg1(foodItems[0].image);
                    setImg2(foodItems[1].image);
                    setImg3(foodItems[2].image);
                    break;
                }
            }
        }
        catch (e) {
            console.log("Error Avi gy DetailPage.tsx ma..");
        }
        setLoading(false);
    }

    useEffect(() => {
        getTopBrandsData();
    }, [searchParams, location.search]);

    return (
        <div className='w-full flex flex-col items-center'>
            {
                loading ? (
                    <div className='w-full h-full flex items-center justify-center'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='w-full flex flex-col items-center'>
                        <div className='grid grid-cols-4 grid-rows-2 h-[550px] gap-2 mt-20 w-full'>
                            <img className='col-start-1 col-end-3 row-start-1 row-end-3 w-full h-full object-cover' src={img1} alt="" />
                            <img className='row-start-1 row-end-2 col-start-3 col-end-5 w-full h-full object-cover' src={img2} alt="" />
                            <img className='row-start-2 row-end-3 col-start-3 col-end-5 w-full h-full object-cover' src={img3} alt="" />
                        </div>
                        <div className='flex flex-col max-w-[900px] min-w-[700px] mt-12'>
                            <div className='flex gap-4'>
                                <div>
                                    <img className='h-[208px]' src={data?.image} alt="" />
                                </div>
                                <div>
                                    <p className='text-4xl font-semibold m-3'>{data?.name}</p>
                                    <div className='flex justify-between m-3'>
                                        <p className='text-sm text-[color:var(--dark-gray-color)] font-light'>{data?.description}</p>
                                        <p className='text-sm text-[color:var(--dark-gray-color)] font-light'>Average Cost: <span className='text-black font-normal'>{data?.average_cost}</span></p>
                                    </div>
                                    <p className='text-sm text-[color:var(--dark-gray-color)] font-light m-3'>{data?.address}</p>
                                    <p className='text-sm text-[color:var(--dark-gray-color)] font-light m-3'><span className=' text-green-600'>Open Now</span> {data?.time}</p>
                                    <div className='flex gap-4 m-4 mt-8'>
                                        <button className='w-[180px] border-[1px] border-[color:var(--yellow-color)] hover:bg-[color:var(--shopping-cart-yellow-color)] p-2 hover:text-white font-medium rounded-sm transition duration-300 ease-in'>Order Online</button>
                                        <button className='w-[180px] border-[1px] border-[color:var(--yellow-color)] hover:bg-[color:var(--shopping-cart-yellow-color)] p-2 hover:text-white font-medium rounded-sm transition duration-300 ease-in'>Directions</button>
                                        <button className='w-[180px] border-[1px] border-[color:var(--yellow-color)] hover:bg-[color:var(--shopping-cart-yellow-color)] p-2 hover:text-white font-medium rounded-sm transition duration-300 ease-in'>Share</button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-10'>
                                <p className='text-2xl font-medium'>Menu</p>
                                <div className='flex mt-6 gap-4'>
                                    {
                                        data?.menu.map((item) => (
                                            <div className='' key={item.menu_id}>
                                                <div className='h-[325px] rounded-lg overflow-hidden'><img className='h-full' src={item.menu_image} alt="" /></div>
                                                <p className='text-lg mt-3 font-normal'>{item.menu_name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col mt-14'>
                                <p className='text-xl font-medium'>Order Online</p>
                                <OnlineOrder data={data} />
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default DetailPage
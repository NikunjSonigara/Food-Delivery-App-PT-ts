import React, { FC, useEffect, useState } from 'react'
import { CartData, PostData, TopBrandsData } from '../../../data'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../../redux/slices/CartSlice';
import OnlineOrderItem from './OnlineOrderItem';
import Spinner from '../../../components/Spinner/Spinner';

const OnlineOrder: FC<{ data: TopBrandsData | null }> = ({ data }) => {

    const [orderList, setOrderList] = useState<string[]>();
    const [orderListData, setOrderListData] = useState<PostData[] | null>(null);
    const [selected, setSelected] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const setAllData = (str?: string | null) => {
        setLoading(true);
        if (data?.food && data.food.length > 0) {
            const firstFood = data.food[0];
            const firstTitle = firstFood.title;
            const x = str || firstTitle;
            setSelected(x);
            const a = data?.food.filter((i) => i.title === x);
            setOrderList(data?.food.map((i) => i.title));
            if (a.length) {
                const b = a[0];
                setOrderListData(b.food_items || firstTitle);
            }
            else {
                console.log("error avi gy bhai onlineOrder.tsx ma");
            }
        }
        else {
            console.log("Online Order ma data nthi");
        }
        setLoading(false);
    }

    useEffect(() => {
        setAllData();
    }, [data])

    return (
        <div className='flex mt-6 mb-10'>
            <div className='flex flex-col w-[300px] items-start gap-3 mt-8'>
                {
                    orderList?.map((str, index) => (
                        <button key={index} onClick={() => setAllData(str)} className={`${selected === str ? 'bg-[color:var(--yellow-color)] text-white' : ''} p-3 w-full text-xl flex items-center justify-start hover:bg-[color:var(--yellow-color)] hover:text-white text-start`}>{str}</button>
                    ))
                }
            </div>
            <div className='h-auto m-[2px] w-[2px] bg-[color:var(--yellow-color)]'></div>
            <div className='flex flex-col ml-6 mt-3'>
                <p className='text-3xl font-medium'>{selected}</p>
                <div className='mt-8 flex flex-col gap-6 max-h-[700px] overflow-auto scrollnone'>
                    {
                        loading ? <Spinner/> :
                        orderListData?.map((item) => (
                            <OnlineOrderItem key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OnlineOrder
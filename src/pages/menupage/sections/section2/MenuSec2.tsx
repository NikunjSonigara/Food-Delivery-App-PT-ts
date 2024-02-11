import React, { useEffect, useState } from 'react'
import { MenuSec2Data } from '../../../../data';
import { menu_sec2 } from '../../../../API/menu_sec2';
import MenuSec2Item from '../../../../components/MenuSec2Itms/MenuSec2Item';

const MenuSec2 = () => {

    const [foodData, setFoodData] = useState<MenuSec2Data[] | null>(null);

    const getMenuSec2Data = () => {
        try{
            const data: MenuSec2Data[] = menu_sec2;
            setFoodData(data);
        }
        catch(e){
            console.log("Error avi gy TOP_BRANDS_DATA");
        }
    }

    useEffect(() => {
        getMenuSec2Data();
    }, []);

  return (
    <div className='pt-28 w-[90%]'>
        <span className="text-3xl">Top brands for you</span>
        <div className='grid grid-cols-3 grid-rows-2 gap-10 mt-8'>
            {
                foodData?.map((item:MenuSec2Data) => (<MenuSec2Item key={item.id} item={item} />))
            }
        </div>
    </div>
  )
}

export default MenuSec2
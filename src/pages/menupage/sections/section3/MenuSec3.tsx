import { useState, useEffect } from "react";
import { menu_sec3 } from "../../../../API/menu_sec3";
import { MenuSec3Data } from "../../../../data";
import MenuSec3Item from "../../../../components/MenuSec3Item/MenuSec3Item";

const MenuSec3 = () => {

    const [data, setData] = useState<MenuSec3Data[] | null>(null);

    const getMenuSec3Data = () => {
        try{
            const data: MenuSec3Data[] = menu_sec3;
            setData(data);
        }
        catch(e){
            console.log("Error avi gy TOP_BRANDS_DATA");
        }
    }

    useEffect(() => {
        getMenuSec3Data();
    }, []);

  return (
    <div className='pt-28 w-[90%]'>
        <span className="text-3xl">Top brands for you</span>
        <div className='grid grid-cols-3 gap-10 mt-8'>
            {
                data?.map((item: MenuSec3Data) => (<MenuSec3Item key={item.id} item={item} />))
            }
        </div>
    </div>
  )
}

export default MenuSec3
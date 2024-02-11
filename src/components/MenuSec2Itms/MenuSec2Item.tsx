import { FC } from 'react'
import { MenuSec2Data } from '../../data'
import './MenuSec2Item.css'

const MenuSec2Item : FC<{item: MenuSec2Data}> = ({item}) => {
  return (
    <div className="menu_page_content2_box">
        <img src={item.image} alt="" className="menu_page_content2_box_img" />
        <span className="menu_page_content2_box_name">{item.name}</span>
        <span className="menu_page_content2_box_time">{item.time}</span>
    </div>
  )
}

export default MenuSec2Item
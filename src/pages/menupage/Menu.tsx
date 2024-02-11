import React from 'react'
import TopBrand from './sections/section1/TopBrand'
import MenuSec2 from './sections/section2/MenuSec2'
import MenuSec3 from './sections/section3/MenuSec3'

const Menu = () => {
  return (
    <div className='w-full flex flex-col items-center mb-20'>
        <TopBrand/>
        <MenuSec2/>
        <MenuSec3/>
    </div>
  )
}

export default Menu
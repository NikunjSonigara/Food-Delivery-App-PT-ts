import Herosection from './sections/herosection/Herosection'
import HomeSec7 from './sections/section7/HomeSec7'
import HomeSec6 from './sections/section6/HomeSec6'
import HomeSec5 from './sections/section5/HomeSec5'
import HomeSec4 from './sections/section4/HomeSec4'
import PopulerRecipesLists from './sections/section3/PopulerRecipesLists'
import HomeSec2 from './sections/section2/HomeSec2'
import HomeSec1 from './sections/section1/HomeSec1'

const Home = () => {
  return (
    <div>
        <Herosection/>
        <HomeSec1/>
        <HomeSec2/>
        <PopulerRecipesLists/>
        <HomeSec4/>
        <HomeSec5/>
        <HomeSec6/>
        <HomeSec7/>
    </div>
  )
}

export default Home
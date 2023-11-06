import { Outlet } from 'react-router-dom'
import SlideMenu from '../../components/client/SlideMenu'

const Menu = () => {
  return (
    <div>
        <SlideMenu/>
        <Outlet/>
    </div>
  )
}

export default Menu
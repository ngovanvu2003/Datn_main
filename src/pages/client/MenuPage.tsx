
import SlideMenu from '../../components/client/SlideMenu'
import { Outlet } from 'react-router-dom'
const MenuPages = () => {
  return (
    <div>
        <SlideMenu/>
        <Outlet/>
    </div>
  )
}

export default MenuPages
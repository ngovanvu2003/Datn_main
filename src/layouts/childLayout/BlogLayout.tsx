
import BreadcrumbBlog from '../../components/client/BreadcrumbBlog'
import { Outlet } from 'react-router-dom'

// type Props = {}

const BlogLayout = () => {
  return (
    <div>
        <BreadcrumbBlog/>
        <Outlet/>
    </div>
  )
}

export default BlogLayout
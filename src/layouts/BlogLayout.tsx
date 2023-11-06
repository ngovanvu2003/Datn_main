import React from 'react'
import BreadcrumbBlog from '../components/BreadcrumbBlog'
import { Outlet } from 'react-router-dom'

type Props = {}

const BlogLayout = (props: Props) => {
  return (
    <div>
        <BreadcrumbBlog/>
        <Outlet/>
    </div>
  )
}

export default BlogLayout
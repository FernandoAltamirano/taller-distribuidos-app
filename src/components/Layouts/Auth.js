import { Outlet } from "react-router-dom"
import './layout.css'
export const LayoutAuth = () => {
    return <div className="layout-auth">
        <img src="/bg.jpg" alt="" className="bg-auth" />
        <div className="layout-children">
            <Outlet />
        </div>
    </div>
}
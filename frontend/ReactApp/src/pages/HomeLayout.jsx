import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const HomeLayout=()=>{
    return<>
    <Sidebar>
    </Sidebar>
    <Outlet></Outlet>
    </>
}

export default HomeLayout
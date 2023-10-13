import Header from "../../components/Admin/Header"
import Footer from "../../components/Admin/Footer"
import { Outlet } from "react-router"
const  AdminLayout =() => {
    return (
        <>
            <Header/>
            <Navbar/>
            <Footer/>
        </>
    )
}
export default AdminLayout
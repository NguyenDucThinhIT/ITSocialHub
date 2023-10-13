import Footer from "../../components/Footer"
import { Outlet } from "react-router"
import Header from "../../components/Header"

const MainLayout =() => {
    return (
        <>
            <Header/>
            <div className="body py-5">
                <Outlet/>
            </div>
            <Footer/>
        </>
            
 
    )
}
export default MainLayout
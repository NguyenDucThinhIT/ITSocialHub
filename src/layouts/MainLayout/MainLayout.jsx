import Footer from "../../components/Footer"
import { Outlet } from "react-router"
import Header from "../../components/MainHeader/MainHeader"

const MainLayout =() => {
    return (
        <>
            <Header/>
            <div className="body pb-3">
                <Outlet/>
            </div>
            <Footer/>
        </>
            
 
    )
}
export default MainLayout
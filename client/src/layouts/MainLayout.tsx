import { Outlet } from "react-router";
import MainNavBar from "../components/navbar/MainNavBar";

function MainLayout(){
    return (
        <div>
            <MainNavBar />
            <Outlet />
        </div>
    );
}

export default MainLayout;
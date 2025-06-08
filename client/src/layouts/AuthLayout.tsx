import { Outlet } from "react-router";
import AuthNavBar from "../components/layout/AuthNavBar";

function AuthLayout(){
    return (
        <div>
            <AuthNavBar />
            <Outlet />
        </div>
    );
}

export default AuthLayout;
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useLocation, useNavigate } from "react-router";

export function useUser(){
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(UserContext);

    useEffect(() => {
        const currentRoute = location.pathname;

        if(
            !context.user.loggedIn &&
            (currentRoute !== '/login' && currentRoute !== '/register')
        ){
            navigate('/login');
        }
        if(
            context.user.loggedIn &&
            (currentRoute === '/login' || currentRoute === '/register')
        ){
            navigate('/inbox');
        }
    }, [context, navigate, location]);

    return context;
}
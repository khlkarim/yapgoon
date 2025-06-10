import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

export function useUser(){
    const navigate = useNavigate();
    const context = useContext(UserContext);

    useEffect(() => {
        if(context.user == null){
            navigate('/login');
        }
    }, [context, navigate]);

    return context;
}
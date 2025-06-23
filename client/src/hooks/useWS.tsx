import { useContext } from "react";
import { WsContext } from "../contexts/WsContext";

function useWS() {
    const context = useContext(WsContext);
    return context;
}

export default useWS;
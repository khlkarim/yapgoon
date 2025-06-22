import { useContext } from "react";
import { WsContext } from "../contexts/WsContext";

function useWS() {
    const context = useContext(WsContext);
    return context?.current;
}

export default useWS;
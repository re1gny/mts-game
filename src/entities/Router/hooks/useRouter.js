import {useContext} from "react";
import {RouterContext} from "../store/routerContext";

export function useRouter() {
    return useContext(RouterContext)
}
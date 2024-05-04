import {useContext} from "react";
import {SizeRatioContext} from "../store/sizeRatioContext";

export function useSizeRatio() {
    return useContext(SizeRatioContext)
}
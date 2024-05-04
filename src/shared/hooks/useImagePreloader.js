import {useEffect, useRef} from 'react'
import {preloadImage} from "../utils/preloadImage";

export function useImagePreloader(images) {
    const preloadedRef = useRef({})

    useEffect(() => {
        for (const image of images) {
            if (!preloadedRef.current[image]) {
                preloadImage(image).then(() => preloadedRef.current[image] = true)
            }
        }
    }, [images])
}
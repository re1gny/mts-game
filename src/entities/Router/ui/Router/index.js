import { AnimatePresence } from "framer-motion";
import {RouterContext} from "../../store/routerContext";
import {NEXT_PAGES, PAGE_NAMES} from "../../constants/pages";

export function Router({page, pagesComponents, onPageChange}) {
    const Component = pagesComponents?.[page] || (() => null);

    const next = () => {
        if (NEXT_PAGES[page]) {
            onPageChange(NEXT_PAGES[page]);
        }
    }

    const reset = () => {
        onPageChange(PAGE_NAMES.LEVEL_1_INTRO);
    }

    return (
        <RouterContext.Provider value={{page, next, reset}}>
            <AnimatePresence initial={false} mode="wait">
                <Component key={page} />
            </AnimatePresence>
        </RouterContext.Provider>
    )
}
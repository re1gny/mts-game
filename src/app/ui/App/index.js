import {Global} from "@emotion/react";
import {ScreenTemplate} from "../ScreenTemplate";
import {Router, PAGE_NAMES} from "../../../entities/Router";
import {useImagePreloader} from "../../../shared/hooks/useImagePreloader";
import {useState} from "react";
import {IMAGES_TO_PRELOAD_MAP} from "../../constants/imagesToPreload";
import MTSWideBold from "../../fonts/MTSWide-Bold.otf";
import MTSWideMedium from "../../fonts/MTSWide-Medium.otf";
import {GameContext} from "../../../entities/Game";
import {PAGES_MAP} from "../../constants/pages";

const GLOBAL_STYLES = {
    html: {
        height: '100%',
        overflow: 'hidden',
    },
    body: {
        height: '100%',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        backgroundColor: '#EBE9EF',
        overflow: 'hidden',
    },
    '#root': {
        height: '100%',
        overflow: 'hidden',
    },
    '*': {
        'box-sizing': 'border-box',
        'padding': 0,
        'margin': 0,
        fontFamily: `MTSWide, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    },
}

const FONT_STYLES = [
    {
        "@font-face": {
            fontFamily: 'MTSWide',
            src: `local('MTS Wide'), local('MTSWide'), url(${MTSWideBold}) format('opentype')`,
            fontWeight: 700,
            fontStyle: 'normal',
        }
    },
    {
        "@font-face": {
            fontFamily: 'MTSWide',
            src: `local('MTS Wide'), local('MTSWide'), url(${MTSWideMedium}) format('opentype')`,
            fontWeight: 500,
            fontStyle: 'normal',
        }
    },
];

export function App() {
    const urlParams = new URLSearchParams(window?.location?.search);
    const [page, setPage] = useState(urlParams.get('page') || PAGE_NAMES.START);
    const [loseCount, setLoseCount] = useState(0);

    useImagePreloader(IMAGES_TO_PRELOAD_MAP[page]);

    return (
        <GameContext.Provider value={{loseCount, setLoseCount}}>
            <ScreenTemplate>
                <Global styles={[GLOBAL_STYLES, ...FONT_STYLES]} />
                <Router page={page} pagesComponents={PAGES_MAP} onPageChange={setPage} />
            </ScreenTemplate>
        </GameContext.Provider>
    )
}
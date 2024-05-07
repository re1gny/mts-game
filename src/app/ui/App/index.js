import {Global} from "@emotion/react";
import {ScreenTemplate} from "../ScreenTemplate";
import {Router, PAGE_NAMES} from "../../../entities/Router";
import {StartPage} from "../../../pages/StartPage";
import {TrainingPage} from "../../../pages/TrainingPage";
import {LevelIntroPage} from "../../../pages/LevelIntroPage";
import {LevelLoadingPage} from "../../../pages/LevelLoadingPage";
import {LevelGamePage} from "../../../pages/LevelGamePage";
import {FinalPage} from "../../../pages/FinalPage";
import {useImagePreloader} from "../../../shared/hooks/useImagePreloader";
import {useState} from "react";
import {IMAGES_TO_PRELOAD_MAP} from "../../constants/imagesToPreload";
import MTSWideBold from "../../fonts/MTSWide-Bold.otf";
import MTSWideMedium from "../../fonts/MTSWide-Medium.otf";

const GLOBAL_STYLES = {
    html: {
        height: '100%',
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

export const PAGES_MAP = {
    [PAGE_NAMES.START]: () => <StartPage/>,
    [PAGE_NAMES.TRAINING]: () => <TrainingPage/>,
    [PAGE_NAMES.LEVEL_1_INTRO]: () => <LevelIntroPage level={1}/>,
    [PAGE_NAMES.LEVEL_1_LOADING]: () => <LevelLoadingPage level={1}/>,
    [PAGE_NAMES.LEVEL_1_GAME]: () => <LevelGamePage level={1}/>,
    [PAGE_NAMES.LEVEL_2_INTRO]: () => <LevelIntroPage level={2}/>,
    [PAGE_NAMES.LEVEL_2_LOADING]: () => <LevelLoadingPage level={2}/>,
    [PAGE_NAMES.LEVEL_2_GAME]: () => <LevelGamePage level={2}/>,
    [PAGE_NAMES.LEVEL_3_INTRO]: () => <LevelIntroPage level={3}/>,
    [PAGE_NAMES.LEVEL_3_LOADING]: () => <LevelLoadingPage level={3}/>,
    [PAGE_NAMES.LEVEL_3_GAME]: () => <LevelGamePage level={3}/>,
    [PAGE_NAMES.FINAL]: () => <FinalPage/>,
};

export function App() {
    const urlParams = new URLSearchParams(window?.location?.search);
    const [page, setPage] = useState(urlParams.get('page') || PAGE_NAMES.START);

    useImagePreloader(IMAGES_TO_PRELOAD_MAP[page]);

    return (
        <ScreenTemplate>
            <Global styles={[GLOBAL_STYLES, ...FONT_STYLES]} />
            <Router page={page} pagesComponents={PAGES_MAP} onPageChange={setPage} />
        </ScreenTemplate>
    )
}
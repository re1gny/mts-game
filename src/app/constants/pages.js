import {PAGE_NAMES} from "../../entities/Router";
import {StartPage} from "../../pages/StartPage";
import {TrainingPage} from "../../pages/TrainingPage";
import {LevelIntroPage} from "../../pages/LevelIntroPage";
import {LevelLoadingPage} from "../../pages/LevelLoadingPage";
import {LevelGamePage} from "../../pages/LevelGamePage";
import {FinalPage} from "../../pages/FinalPage";

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
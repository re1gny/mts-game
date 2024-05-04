import { ReactComponent as Character1center } from '../assets/character1center.svg'
import { ReactComponent as Character1left1 } from '../assets/character1left1.svg'
import { ReactComponent as Character1left2 } from '../assets/character1left2.svg'
import { ReactComponent as Character1left3 } from '../assets/character1left3.svg'
import { ReactComponent as Character1right1 } from '../assets/character1right1.svg'
import { ReactComponent as Character1right2 } from '../assets/character1right2.svg'
import { ReactComponent as Character1right3 } from '../assets/character1right3.svg'
import { ReactComponent as Character2center } from '../assets/character2center.svg'
import { ReactComponent as Character2left1 } from '../assets/character2left1.svg'
import { ReactComponent as Character2left2 } from '../assets/character2left2.svg'
import { ReactComponent as Character2left3 } from '../assets/character2left3.svg'
import { ReactComponent as Character2right1 } from '../assets/character2right1.svg'
import { ReactComponent as Character2right2 } from '../assets/character2right2.svg'
import { ReactComponent as Character2right3 } from '../assets/character2right3.svg'
import { ReactComponent as Character3center } from '../assets/character3center.svg'
import { ReactComponent as Character3left1 } from '../assets/character3left1.svg'
import { ReactComponent as Character3left2 } from '../assets/character3left2.svg'
import { ReactComponent as Character3left3 } from '../assets/character3left3.svg'
import { ReactComponent as Character3right1 } from '../assets/character3right1.svg'
import { ReactComponent as Character3right2 } from '../assets/character3right2.svg'
import { ReactComponent as Character3right3 } from '../assets/character3right3.svg'

export const STAY_INDEX = 3;
export const LEFT_START_INDEX = STAY_INDEX - 1;
export const RIGHT_START_INDEX = STAY_INDEX + 1;

export const LEFT_INDEXES_LOOP = {
    2: 1,
    1: 0,
    0: 2,
};

export const RIGHT_INDEXES_LOOP = {
    4: 5,
    5: 6,
    6: 4,
};

export const LEVEL_1_CHARACTERS = [
    Character1left3,
    Character1left2,
    Character1left1,
    Character1center,
    Character1right1,
    Character1right2,
    Character1right3,
];

export const LEVEL_2_CHARACTERS = [
    Character2left3,
    Character2left2,
    Character2left1,
    Character2center,
    Character2right1,
    Character2right2,
    Character2right3,
];

export const LEVEL_3_CHARACTERS = [
    Character3left3,
    Character3left2,
    Character3left1,
    Character3center,
    Character3right1,
    Character3right2,
    Character3right3,
];
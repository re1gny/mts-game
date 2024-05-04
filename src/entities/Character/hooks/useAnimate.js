import {useCallback, useEffect, useState} from "react";
import {
    LEFT_INDEXES_LOOP,
    LEFT_START_INDEX,
    LEVEL_1_CHARACTERS,
    LEVEL_2_CHARACTERS,
    LEVEL_3_CHARACTERS,
    RIGHT_INDEXES_LOOP,
    RIGHT_START_INDEX,
    STAY_INDEX
} from "../constants/characters";
import throttle from "lodash/throttle";

const LEVEL_TO_CHARACTERS = {
    1: LEVEL_1_CHARACTERS,
    2: LEVEL_2_CHARACTERS,
    3: LEVEL_3_CHARACTERS,
};

export function useAnimate(level, direction) {
    const [index, setIndex] = useState(STAY_INDEX);
    const source = LEVEL_TO_CHARACTERS[level][index];

    const animate = useCallback(
        throttle((direction) => {
            if (direction > 0) {
                setIndex(prev => prev in RIGHT_INDEXES_LOOP ? RIGHT_INDEXES_LOOP[prev] : RIGHT_START_INDEX);
                return;
            }

            if (direction < 0) {
                setIndex(prev => prev in LEFT_INDEXES_LOOP ? LEFT_INDEXES_LOOP[prev] : LEFT_START_INDEX);
                return;
            }

            setIndex(STAY_INDEX);
        }, 90),
        [],
    );

    useEffect(() => {
        animate(direction);

        const timer = setTimeout(() => animate(direction), 90);

        return () => clearTimeout(timer);
    }, [index, direction]);

    return source;
}
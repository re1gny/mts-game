import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import useResizeObserver from "use-resize-observer";
import {AnimatePresence, motion, useDragControls, useMotionValue, useAnimationFrame, useTransform} from "framer-motion";
import throttle from "lodash/throttle";
import random from "lodash/random";
import clamp from "lodash/clamp";
import styled from "@emotion/styled";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {Board, PauseButton, Live, Task, Control, MAX_LIVES, TASKS_BY_LEVEL, MAX_PROGRESS_BY_LEVEL, WIDTH, HEIGHT} from "../../../../entities/Game";
import {Character, LEVEL_TO_CHARACTER_SIZE} from "../../../../entities/Character";
import {PauseModal} from "../PauseModal";
import {LoseModal} from "../LoseModal";
import {ProgressBar} from "../../../../entities/Game";

export const LEVEL_TO_PROGRESS_OFFSET = {
    1: 20.5,
    2: 44.6,
    3: 39.5,
};

export const LEVEL_TO_PROGRESS_WIDTH = {
    1: 72,
    2: 61.7,
    3: 72,
};

export const CHARACTER_STEP = 2;
export const TASK_STEP_BY_LEVEL = {
    1: 1,
    2: 1,
    3: 2,
};

const Wrapper = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
`;

const LivesStyled = styled.div`
    position: absolute;
    top: calc(36.8px * ${({ratio}) => ratio});
    left: calc(27.5px * ${({ratio}) => ratio});
    display: flex;
`;

const LiveStyled = styled(Live)`
    & + & {
        margin-left: calc(6px * ${({ratio}) => ratio});
    }
`;

const PauseButtonStyled = styled(PauseButton)`
    position: absolute;
    top: calc(28.5px * ${({ratio}) => ratio});
    right: calc(27px * ${({ratio}) => ratio});
`;

const CharacterStyled = styled(Character)`
    position: absolute;
    top: 0;
    left: 0;
    height: calc(${({level}) => LEVEL_TO_CHARACTER_SIZE[level][1] + 20}px * ${({ratio}) => ratio});
`;

const ProgressBarStyled = styled(ProgressBar)`
    position: absolute;
    top: 0;
    left: calc(${({level}) => LEVEL_TO_PROGRESS_OFFSET[level]}px * ${({ratio}) => ratio});
    width: calc(${({level}) => LEVEL_TO_PROGRESS_WIDTH[level]}px * ${({ratio}) => ratio});
`;

const ControlStyled = styled(Control)`
    position: absolute;
    top: 0;
    left: 0;
`;

const BoardStyled = styled(Board)`
    width: 100%;
    height: 100%;
`;

export function Game({className, level, onNext, onReset}) {
    const sizeRatio = useSizeRatio();
    const wrapperRef = useRef();
    const [wrapperRect, setWrapperRect] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [progress, setProgress] = useState(0);
    const [livesLeft, setLivesLeft] = useState(MAX_LIVES);
    const [tasks, setTasks] = useState(TASKS_BY_LEVEL[level]);
    const [direction, setDirection] = useState([0, 0]);
    const tasksDirection = useMotionValue(TASKS_BY_LEVEL[level].reduce((acc, task) => ({
        ...acc,
        [task.id]: [
            random(-TASK_STEP_BY_LEVEL[level], TASK_STEP_BY_LEVEL[level], true),
            random(-TASK_STEP_BY_LEVEL[level], TASK_STEP_BY_LEVEL[level], true),
        ],
    }), {}));
    const collidedTaskRef = useRef(null);
    const controlExistsRef = useRef(false);
    const [controlEvent, setControlEvent] = useState(null);
    const [controlPosition, setControlPosition] = useState(null);
    const dragControls = useDragControls();
    const characterPosition = useMotionValue([
        (WIDTH/2 - LEVEL_TO_CHARACTER_SIZE[level][0]/2) * sizeRatio,
        (HEIGHT/2 - LEVEL_TO_CHARACTER_SIZE[level][1]/2) * sizeRatio,
    ]);
    const tasksPosition = useMotionValue(TASKS_BY_LEVEL[level].reduce((acc, task) => ({
        ...acc,
        [task.id]: [task.position[0] * sizeRatio, task.position[1] * sizeRatio],
    }), {}));
    const characterDelta = useTransform(
        characterPosition,
        prev => {
            const leftDelta = prev[0] - wrapperRect?.width/2 + LEVEL_TO_CHARACTER_SIZE[level][0]/2 * sizeRatio;
            const rightDelta = prev[0] + wrapperRect?.width/2 + (LEVEL_TO_CHARACTER_SIZE[level][0]/2 - WIDTH) * sizeRatio;
            const topDelta = prev[1] - wrapperRect?.height/2 + LEVEL_TO_CHARACTER_SIZE[level][1]/2 * sizeRatio;
            const bottomDelta = prev[1] + wrapperRect?.height/2 + (LEVEL_TO_CHARACTER_SIZE[level][1]/2 - HEIGHT) * sizeRatio;

            let x;
            let y;

            if (Math.abs(leftDelta) > Math.abs(rightDelta)) {
                x = clamp(
                    rightDelta,
                    0,
                    wrapperRect?.width/2 - LEVEL_TO_CHARACTER_SIZE[level][0]/2 * sizeRatio,
                );
            } else {
                x = clamp(
                    leftDelta,
                    LEVEL_TO_CHARACTER_SIZE[level][0]/2 * sizeRatio - wrapperRect?.width/2,
                    0,
                );
            }

            if (Math.abs(topDelta) > Math.abs(bottomDelta)) {
                y = clamp(
                    bottomDelta,
                    0,
                    wrapperRect?.height/2 - LEVEL_TO_CHARACTER_SIZE[level][1]/2 * sizeRatio,
                );
            } else {
                y = clamp(
                    topDelta,
                    LEVEL_TO_CHARACTER_SIZE[level][1]/2 * sizeRatio - wrapperRect?.height/2,
                    0,
                );
            }

            return [x, y];
        }
    );
    const boardPositionX = useTransform(
        [characterPosition, characterDelta],
        ([prevPosition, prevDelta]) => `${-prevPosition[0] + wrapperRect?.width/2 - LEVEL_TO_CHARACTER_SIZE[level][0]/2 * sizeRatio + prevDelta[0]}px`,
    );
    const boardPositionY = useTransform(
        [characterPosition, characterDelta],
        ([prevPosition, prevDelta]) => `${-prevPosition[1] + wrapperRect?.height/2 - LEVEL_TO_CHARACTER_SIZE[level][1]/2 * sizeRatio + prevDelta[1]}px`,
    );
    const characterPositionX = useTransform(
        characterDelta,
        prev => `${wrapperRect?.width/2 - LEVEL_TO_CHARACTER_SIZE[level][0]/2 * sizeRatio + prev[0]}px`,
    );
    const characterPositionY = useTransform(
        characterDelta,
        prev => `${wrapperRect?.height/2 - LEVEL_TO_CHARACTER_SIZE[level][1]/2 * sizeRatio + prev[1]}px`,
    );
    const maxProgress = MAX_PROGRESS_BY_LEVEL[level];

    const handleDrag = useCallback(
        throttle((event, info) => {
            if (!controlExistsRef.current || !info?.offset) {
                return;
            }

            const { x, y } = info.offset;

            const topRatio = clamp(y, -30, 30) / 30
            const leftRatio = clamp(x, -30, 30) / 30

            setDirection([leftRatio * CHARACTER_STEP * sizeRatio, topRatio * CHARACTER_STEP * sizeRatio]);
        }, 50),
        [sizeRatio],
    );

    const handleTapStart = (event) => {
        if (controlExistsRef.current) {
            return;
        }

        controlExistsRef.current = true;
        setControlEvent(event);
        setControlPosition([event.clientX - wrapperRect.left, event.clientY - wrapperRect.top]);
    };

    const handleTapEnd = () => {
        if (!controlExistsRef.current) {
            return;
        }

        controlExistsRef.current = false;
        handleDrag.cancel();
        setControlEvent(null);
        setControlPosition(null);
        setDirection([0, 0]);
    };

    const updateWrapperRect = () => {
        const rect = wrapperRef.current?.getBoundingClientRect?.();
        setWrapperRect(rect)
    };

    useLayoutEffect(() => {
        updateWrapperRect()
    }, [])

    useResizeObserver({ onResize: updateWrapperRect, ref: wrapperRef })

    useEffect(() => {
        if (controlEvent) {
            dragControls.start(controlEvent);
        }
    }, [controlEvent]);

    useEffect(() => {
        if (collidedTaskRef.current && collidedTaskRef.current.allowed) {
            setProgress(prev => prev + 1);
            collidedTaskRef.current = null;
        } else if (collidedTaskRef.current) {
            setLivesLeft(prev => prev - 1);
            collidedTaskRef.current = null;
        }
    }, [tasks]);

    useEffect(() => {
        if (progress === maxProgress) {
            onNext?.();
        }
    }, [progress]);

    useEffect(() => {
        if (livesLeft === 0) {
            setIsLost(true);
        }
    }, [livesLeft]);

    useAnimationFrame(() => {
        if (isPaused || isLost) {
            return;
        }

        const prevTasksDirection = tasksDirection.get();
        const prevTasksPosition = tasksPosition.get();
        const [prevX, prevY] = characterPosition.get();

        const nextX = clamp(
            prevX + direction[0],
            0,
            (WIDTH - LEVEL_TO_CHARACTER_SIZE[level][0]) * sizeRatio,
        );

        const nextY = clamp(
            prevY + direction[1],
            0,
            (HEIGHT - LEVEL_TO_CHARACTER_SIZE[level][1] - 20) * sizeRatio,
        );

        const nextTasksDirection = tasks.reduce((acc, task) => {
            const prevPosition = prevTasksPosition[task.id];
            const prevDirection = prevTasksDirection[task.id];

            if (prevPosition[0] <= 0 || prevPosition[0] + task.size * sizeRatio >= WIDTH * sizeRatio) {
                return {
                    ...prevTasksDirection,
                    ...acc,
                    [task.id]: [-prevDirection[0], prevDirection[1]],
                };
            }

            if (prevPosition[1] <= 0 || prevPosition[1] + task.size * sizeRatio >= HEIGHT * sizeRatio) {
                return {
                    ...prevTasksDirection,
                    ...acc,
                    [task.id]: [prevDirection[0], -prevDirection[1]],
                };
            }

            return {
                ...acc,
                [task.id]: prevDirection,
            };
        }, {});

        const nextTasksPosition = tasks.reduce((acc, task) => {
            return {
                ...prevTasksPosition,
                ...acc,
                [task.id]: [
                    prevTasksPosition[task.id][0] + nextTasksDirection[task.id][0],
                    prevTasksPosition[task.id][1] + nextTasksDirection[task.id][1],
                ],
            };
        }, {});

        characterPosition.set([nextX, nextY]);
        tasksPosition.set(nextTasksPosition);
        tasksDirection.set(nextTasksDirection);

        if (!collidedTaskRef.current) {
            const collidedTask = tasks.find(({size, id}) => {
                const taskData = {
                    x: nextTasksPosition[id][0] + size/2 * sizeRatio,
                    y: nextTasksPosition[id][1] + size/2 * sizeRatio,
                    r: size/2 * sizeRatio,
                };
                const characterData = {
                    x: nextX + LEVEL_TO_CHARACTER_SIZE[level][0]/2 * sizeRatio,
                    y: nextY + (LEVEL_TO_CHARACTER_SIZE[level][1]/2 + 20) * sizeRatio,
                    rx: LEVEL_TO_CHARACTER_SIZE[level][0]/2 * sizeRatio,
                    ry: LEVEL_TO_CHARACTER_SIZE[level][1]/2 * sizeRatio,
                };

                return Math.hypot(taskData.x - characterData.x, taskData.y - characterData.y) <= taskData.r + Math.max(characterData.rx, characterData.ry);
            });

            if (collidedTask) {
                collidedTaskRef.current = collidedTask;
                setTasks(prev => prev.filter(task => task.id !== collidedTask.id))
            }
        }
    });

    return (
        <Wrapper
            ref={wrapperRef}
            className={className}
            ratio={sizeRatio}
            onPointerDown={handleTapStart}
            onPointerUp={handleTapEnd}
            onPointerCancel={handleTapEnd}
        >
            <BoardStyled
                level={level}
                imageProps={{style: {x: boardPositionX, y: boardPositionY}}}
            >
                <AnimatePresence>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            tasksPosition={tasksPosition}
                        />
                    ))}
                </AnimatePresence>
            </BoardStyled>
            <CharacterStyled
                level={level}
                direction={direction[0] || direction[1]}
                ratio={sizeRatio}
                style={{x: characterPositionX, y: characterPositionY}}
            >
                <ProgressBarStyled level={level} value={progress} max={maxProgress} ratio={sizeRatio}/>
            </CharacterStyled>
            <AnimatePresence>
                {!!controlPosition && (
                    <ControlStyled
                        ratio={sizeRatio}
                        stickProps={{
                            dragControls,
                            onDrag: handleDrag,
                        }}
                        initial={{
                            x: `calc(${controlPosition[0]}px - 50%)`,
                            y: `calc(${controlPosition[1]}px - 50%)`,
                            opacity: 0,
                        }}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.1}}
                    />
                )}
            </AnimatePresence>
            <LivesStyled ratio={sizeRatio}>
                <AnimatePresence initial={false}>
                    {Array(livesLeft).fill(null).map((_, index) => (
                        <LiveStyled key={index} ratio={sizeRatio}/>
                    ))}
                </AnimatePresence>
            </LivesStyled>
            <PauseButtonStyled
                ratio={sizeRatio}
                onClick={() => setIsPaused(true)}
            />
            <PauseModal
                level={level}
                opened={isPaused}
                onResume={() => setIsPaused(false)}
            />
            <LoseModal opened={isLost} onReset={onReset}/>
        </Wrapper>
    );
}
import styled from '@emotion/styled';
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {motion} from "framer-motion";
import {forwardRef} from "react";
import level1Board from '../../assets/level1board.png';
import level2Board from '../../assets/level2board.png';
import level3Board from '../../assets/level3board.png';

const LEVEL_TO_BOARD = {
    1: level1Board,
    2: level2Board,
    3: level3Board,
};

export const WIDTH = 1500;
export const HEIGHT = 1334;

const WrapperStyled = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
`;

const ImageStyled = styled(motion.div)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(${WIDTH}px * ${({ratio}) => ratio});
    height: calc(${HEIGHT}px * ${({ratio}) => ratio});
    background-color: #EBE9EF;
    background-image: url(${({level}) => LEVEL_TO_BOARD[level]});
    background-repeat: no-repeat;
    background-size: 100%;
`;

const BoardComponent = ({level, imageProps, children, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();

    return (
        <WrapperStyled ref={ref} ratio={sizeRatio} {...rest}>
            <ImageStyled level={level} ratio={sizeRatio} {...imageProps}>
                {children}
            </ImageStyled>
        </WrapperStyled>
    );
}

export const Board = motion(forwardRef(BoardComponent));
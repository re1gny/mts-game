import {forwardRef} from "react";
import styled from "@emotion/styled";
import {motion} from "framer-motion"
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {useAnimate} from "../../hooks/useAnimate";
import {Image} from "../../../../shared/ui/Image";

export const LEVEL_TO_CHARACTER_SIZE = {
    1: [117, 121],
    2: [117, 121],
    3: [117, 121],
};

const WrapperStyled = styled(motion.div)`
    position: relative;
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
    width: calc(${({level}) => LEVEL_TO_CHARACTER_SIZE[level][0]}px * ${({ratio}) => ratio});
    height: calc(${({level}) => LEVEL_TO_CHARACTER_SIZE[level][1]}px * ${({ratio}) => ratio});
`;

const ImageStyled = styled(Image)`
    max-width: 100%;
    max-height: 100%;
`;

function CharacterComponent({direction, level, children, ...rest}, ref) {
    const sizeRatio = useSizeRatio();
    const source = useAnimate(level, direction);

    return (
        <WrapperStyled ref={ref} level={level} ratio={sizeRatio} {...rest}>
            <ImageStyled src={source} ratio={sizeRatio} />
            {children}
        </WrapperStyled>
    );
}

export const Character = motion(forwardRef(CharacterComponent), { forwardMotionProps: true });

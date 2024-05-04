import {forwardRef, useRef} from "react";
import styled from '@emotion/styled';
import {motion} from "framer-motion";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {mergeRefs} from "../../../../shared/utils/mergeRefs";

const WrapperStyled = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(60px * ${({ratio}) => ratio});
    height: calc(60px * ${({ratio}) => ratio});
    background-color: #EBE9EF;
    border: calc(1px * ${({ratio}) => ratio}) solid #000000;
    border-radius: 50%;
`;

const InnerStyled = styled(motion.div)`
    width: calc(32px * ${({ratio}) => ratio});
    height: calc(32px * ${({ratio}) => ratio});
    border: calc(1px * ${({ratio}) => ratio}) solid #000000;
    border-radius: 50%;
    background-color: #CFCAD9;
`;

const ControlComponent = ({stickProps, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();
    const wrapperRef = useRef();

    return (
        <WrapperStyled ref={mergeRefs(ref, wrapperRef)} ratio={sizeRatio} {...rest}>
            <InnerStyled
                drag
                dragConstraints={wrapperRef}
                dragSnapToOrigin
                dragElastic={0.1}
                dragTransition={{bounceStiffness: 500}}
                ratio={sizeRatio}
                {...stickProps}
            />
        </WrapperStyled>
    );
}

export const Control = motion(forwardRef(ControlComponent), { forwardMotionProps: true });

import {motion} from "framer-motion";
import styled from "@emotion/styled";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {forwardRef} from "react";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(8px * ${({ratio}) => ratio});
    border: calc(0.8px * ${({ratio}) => ratio}) solid #000000;
    padding: calc(0.9px * ${({ratio}) => ratio});
    border-radius: calc(80px * ${({ratio}) => ratio});
`;

const Inner = styled.div`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
`;

const Indicator = styled(motion.div)`
    height: 100%;
    background-color: #E30611;
    transition: width 0.2s;
`;

function ProgressBarComponent({value, max, ...rest}, ref) {
    const sizeRatio = useSizeRatio();

    return (
        <Wrapper ref={ref} ratio={sizeRatio} {...rest}>
            <Inner ratio={sizeRatio}>
                <Indicator
                    style={{ width: `${value/max * 100}%` }}
                    ratio={sizeRatio}
                />
            </Inner>
        </Wrapper>
    );
}

export const ProgressBar = motion(forwardRef(ProgressBarComponent));
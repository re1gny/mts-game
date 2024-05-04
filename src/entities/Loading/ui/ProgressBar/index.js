import {motion} from "framer-motion";
import styled from "@emotion/styled";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    border: calc(1px * ${({ratio}) => ratio}) solid #000000;
    padding: calc(3px * ${({ratio}) => ratio}) calc(4px * ${({ratio}) => ratio});
    height: calc(21px * ${({ratio}) => ratio});
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
`;

export function ProgressBar({value, controls, ...rest}) {
    const sizeRatio = useSizeRatio();

    return (
        <Wrapper ratio={sizeRatio} {...rest}>
            <Inner ratio={sizeRatio}>
                <Indicator
                    style={{ width: value }}
                    animate={controls}
                    ratio={sizeRatio}
                />
            </Inner>
        </Wrapper>
    );
}
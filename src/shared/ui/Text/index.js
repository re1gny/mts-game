import styled from "@emotion/styled";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const SIZE_TO_FONT_SIZE = {
    xs: 14,
    s: 16,
    m: 18,
    l: 24,
}

const SIZE_TO_LINE_HEIGHT = {
    xs: 18.9,
    s: 21.6,
    m: 24.3,
    l: 32.4,
}

const TextStyled = styled.p`
    font-size: calc(${({size}) => SIZE_TO_FONT_SIZE[size]}px * ${({ratio}) => ratio});
    line-height: calc(${({size}) => SIZE_TO_LINE_HEIGHT[size]}px * ${({ratio}) => ratio});
    white-space: pre-wrap;
    font-weight: 500;
    color: #000000;
`;

export const Text = ({ size = 'm', ...rest }) => {
    const sizeRatio = useSizeRatio();

    return <TextStyled size={size} ratio={sizeRatio} {...rest} />
}
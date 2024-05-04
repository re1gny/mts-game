import styled from "@emotion/styled";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const SIZE_TO_BORDER_RADIUS = {
    s: 8,
    m: 15,
    l: 28,
}

const PanelStyled = styled.div`
    width: 100%;
    border: calc(1px * ${({ratio}) => ratio}) solid #000000;
    border-radius: calc(${({size}) => SIZE_TO_BORDER_RADIUS[size]}px * ${({ratio}) => ratio});
    background-color: #FFFFFF;
`;

export const Panel = ({ size = 'm', ...rest }) => {
    const sizeRatio = useSizeRatio();

    return <PanelStyled size={size} ratio={sizeRatio} {...rest} />
}
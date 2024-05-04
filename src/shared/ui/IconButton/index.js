import styled from '@emotion/styled';
import {useSizeRatio} from "../../hooks/useSizeRatio";

const IconStyled = styled.svg`
    width: calc(24px * ${({ratio}) => ratio});
    height: calc(26px * ${({ratio}) => ratio});
`;

const ButtonStyled = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    color: #FFFFFF;
    width: calc(44px * ${({ratio}) => ratio});
    height: calc(44px * ${({ratio}) => ratio});
    background-color: ${({disabled}) => disabled ? '#E07A7F' : '#E30611'};
    padding: calc(9px * ${({ratio}) => ratio}) calc(10px * ${({ratio}) => ratio});
    border-radius: calc(8px * ${({ratio}) => ratio});
    cursor: pointer;
    transition: background-color 100ms;
`;

const ICON_TO_SVG = {
    'next': (props) => (
        <IconStyled {...props} viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.3739 20.3127L17.3739 15.412L0.677246 15.4065L0.677246 10.5058L17.3739 10.5058L17.3739 5.60516L12.4401 5.60516L12.4401 0.70449L17.3739 0.70449L17.3739 5.60516L22.3077 5.60515L22.3077 10.5058L27.2415 10.5058L27.2415 15.4065L22.3077 15.4065L22.3077 20.3127L17.3739 20.3127ZM12.4401 25.2133L12.4401 20.3127L17.3739 20.3127L17.3739 25.2133L12.4401 25.2133Z"
                fill="currentColor"
            />
        </IconStyled>
    )
}

export const IconButton = ({icon, disabled, ...rest}) => {
    const ratio = useSizeRatio();
    const Icon = ICON_TO_SVG[icon] || (() => null);

    return (
        <ButtonStyled ratio={ratio} disabled={disabled} {...rest}>
            <Icon />
        </ButtonStyled>
    );
}

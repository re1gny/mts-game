import styled from '@emotion/styled';
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";

const IconStyled = styled.svg`
    width: calc(6px * ${({ratio}) => ratio});
    height: calc(25px * ${({ratio}) => ratio});
`;

const ButtonStyled = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    color: #E30611;
    width: calc(42px * ${({ratio}) => ratio});
    height: calc(42px * ${({ratio}) => ratio});
    background-color: #FFDADA;
    border-radius: 50%;
    cursor: pointer;
`;

export const PauseButton = (props) => {
    const ratio = useSizeRatio();

    return (
        <ButtonStyled ratio={ratio} {...props}>
            <IconStyled ratio={ratio} viewBox="0 0 6 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.406494 2.8511C0.406494 1.45413 1.31615 0.706909 2.94054 0.706909C4.59742 0.706909 5.50708 1.45413 5.50708 2.8511C5.50708 4.28057 4.59742 5.02779 2.94054 5.02779C1.31615 5.02779 0.406494 4.28057 0.406494 2.8511ZM0.796348 7.98418H5.11723V24.2931H0.796348V7.98418Z"
                    fill="currentColor"
                />
            </IconStyled>
        </ButtonStyled>
    );
}

import styled from '@emotion/styled';
import {useSizeRatio} from "../../hooks/useSizeRatio";

const ButtonStyled = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: calc(1px * ${({ratio}) => ratio}) solid #E30611;
    color: #FFFFFF;
    background-color: #E30611;
    height: calc(44px * ${({ratio}) => ratio});
    padding: calc(10px * ${({ratio}) => ratio});
    border-radius: calc(16px * ${({ratio}) => ratio});
    font-size: calc(12px * ${({ratio}) => ratio});
    line-height: calc(16px * ${({ratio}) => ratio});
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
`;

export const Button = ({ children, onClick, ...props }) => {
    const ratio = useSizeRatio();

    function handleClick() {
        onClick?.()
    }

    return (
        <ButtonStyled ratio={ratio} onClick={handleClick} {...props}>
            {children}
        </ButtonStyled>
    );
}

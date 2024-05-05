import styled from '@emotion/styled';
import {useSizeRatio} from "../../hooks/useSizeRatio";

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
    padding: 0;
    border-radius: calc(8px * ${({ratio}) => ratio});
    cursor: pointer;
    transition: background-color 100ms;
`;

export const IconButton = ({children, disabled, ...rest}) => {
    const ratio = useSizeRatio();

    return (
        <ButtonStyled ratio={ratio} disabled={disabled} {...rest}>
            {children}
        </ButtonStyled>
    );
}

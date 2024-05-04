import {useCallback} from "react";
import styled from "@emotion/styled/macro";
import {useSizeRatio} from "../../hooks/useSizeRatio";

const Wrapper = styled.label`
    position: relative;
    font-size: calc(10px * ${({ratio}) => ratio});
    padding-left: calc(30px * ${({ratio}) => ratio});
    cursor: pointer;
    user-select: none;
`

const Mark = styled.span`
    position: absolute;
    top: 1px;
    left: 0;
    width: calc(16px * ${({ratio}) => ratio});
    height: calc(16px * ${({ratio}) => ratio});
    border-radius: calc(4px * ${({ratio}) => ratio});
    border: calc(1px * ${({ratio}) => ratio}) solid #000000;
    background-color: #FFFFFF;
`

const Check = styled.svg`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.6);
    width: calc(10.14px * ${({ratio}) => ratio});
    height: calc(10.14px * ${({ratio}) => ratio});
    border-radius: 50%;
    background-color: #E30611;
    opacity: 0;
    transition: opacity 100ms, transform 100ms;
`

const Input = styled.input`
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    cursor: pointer;

    &:checked {
        & ~ ${Mark} {
            ${Check} {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    }
`

export function Checkbox(props) {
    const {className, value, children, onChange} = props
    const sizeRatio = useSizeRatio()

    const handleChange = useCallback((event) => {
        onChange?.(event.target.checked)
    }, [onChange])

    return (
        <Wrapper ratio={sizeRatio} className={className}>{children}
            <Input ratio={sizeRatio} type="checkbox" checked={value} onChange={handleChange} />
            <Mark ratio={sizeRatio} >
                <Check ratio={sizeRatio} />
            </Mark>
        </Wrapper>
    )
}

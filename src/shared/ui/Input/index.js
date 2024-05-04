import {useCallback} from "react";
import styled from "@emotion/styled";
import {useSizeRatio} from "../../hooks/useSizeRatio";

const Field = styled.input`
    position: relative;
    display: flex;
    width: 100%;
    height: calc(44px * ${({ratio}) => ratio});
    padding: calc(11px * ${({ratio}) => ratio}) calc(16px * ${({ratio}) => ratio});
    border: calc(1px * ${({ratio}) => ratio}) solid #000000;
    border-radius: calc(8px * ${({ratio}) => ratio});
    outline: none;
    background-color: #FFFFFF;
    color: #000000;
    font-size: calc(16px * ${({ratio}) => ratio});
    line-height: calc(21.6px * ${({ratio}) => ratio});
    font-weight: 500;
    
    &::placeholder {
        color: #EBE9EF;
    }
`

export function Input(props) {
    const {className, value, onChange, ...rest} = props
    const sizeRatio = useSizeRatio()

    const handleChange = useCallback((event) => {
        onChange?.(event.target.value)
    }, [onChange])

    return (
        <Field className={className} ratio={sizeRatio} value={value} type="text" onChange={handleChange} {...rest} />
    )
}

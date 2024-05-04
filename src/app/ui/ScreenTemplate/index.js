import {useRef} from 'react'
import styled from '@emotion/styled'
import {SizeRatioProvider} from "../../../shared/ui/SizeRatioProvider";

const TARGET_WIDTH = 375
const TARGET_HEIGHT = 677
const MIN_MOCKUP_WIDTH = 450

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    @media (min-width: ${MIN_MOCKUP_WIDTH}px) {
        padding: 20px;
    }
`

const WrapperInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const Content = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transform: translate(0, 0);

    @media (min-width: ${MIN_MOCKUP_WIDTH}px) {
        max-width: ${({sizeRatio}) => `calc(${TARGET_WIDTH}px * ${sizeRatio})`};
        max-height: ${({sizeRatio}) => `calc(${TARGET_HEIGHT}px * ${sizeRatio})`};
        border-radius: 10px;
        box-sizing: content-box;
        border: 2px solid #000000;
    }
`

export function ScreenTemplate(props) {
    const {children} = props
    const wrapperRef = useRef()
    const wrapperInnerRef = useRef()

    return (
        <SizeRatioProvider target={wrapperInnerRef} targetWidth={TARGET_WIDTH} targetHeight={TARGET_HEIGHT}>
            {(sizeRatio) => (
                <Wrapper ref={wrapperRef}>
                    <WrapperInner ref={wrapperInnerRef}>
                        <Content sizeRatio={sizeRatio}>
                            {children}
                        </Content>
                    </WrapperInner>
                </Wrapper>
            )}
        </SizeRatioProvider>
    )
}
import {ClassNames} from "@emotion/react";
import styled from "@emotion/styled";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import {motion} from "framer-motion";
import {forwardRef} from "react";

const ImageStyled = styled(motion.img)`
    object-fit: contain;
    pointer-events: none;
    touch-action: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const ImageComponent = ({src, className, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();

    if (typeof src === 'object') {
        const Icon = src;

        return (
            <ClassNames>
                {({cx, css}) => (
                    <Icon
                        ref={ref}
                        className={cx(className, css`
                            pointer-events: none;
                            touch-action: none;
                            user-select: none;
                            -webkit-user-drag: none;
                        `)}
                        ratio={sizeRatio}
                        {...rest}
                    />
                )}
            </ClassNames>
        );
    }

    return <ImageStyled ref={ref} className={className} src={src} ratio={sizeRatio} {...rest} />
}

export const Image = motion(forwardRef(ImageComponent));
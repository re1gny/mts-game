import styled from '@emotion/styled';
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import { ReactComponent as LiveSvg } from '../../assets/live.svg';
import {Image} from "../../../../shared/ui/Image";

const ImageStyled = styled(Image)`
    width: calc(30px * ${({ratio}) => ratio});
    height: calc(27px * ${({ratio}) => ratio});
`;

export const Live = (props) => {
    const sizeRatio = useSizeRatio();

    return (
        <ImageStyled
            src={LiveSvg}
            ratio={sizeRatio}
            exit={{scale: 0.8, opacity: 0}}
            transition={{duration: 0.1, type: 'tween'}}
            {...props}
        />
    );
}

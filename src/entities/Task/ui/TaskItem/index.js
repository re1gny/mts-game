import styled from "@emotion/styled";
import {Image} from "../../../../shared/ui/Image";
import {Text} from "../../../../shared/ui/Text";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const Logo = styled(Image)`
    flex-shrink: 0;
    width: calc(60px * ${({ratio}) => ratio});
    height: calc(60px * ${({ratio}) => ratio});
`;

const Name = styled(Text)`
    flex-grow: 1;
    margin-left: calc(24px * ${({ratio}) => ratio});
`;

export function TaskItem({image, name, ...rest}) {
    const sizeRatio = useSizeRatio();

    return (
        <Wrapper ratio={sizeRatio} {...rest}>
            <Logo src={image} ratio={sizeRatio} />
            <Name size="xs" ratio={sizeRatio}>{name}</Name>
        </Wrapper>
    );
}
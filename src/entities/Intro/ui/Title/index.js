import styled from "@emotion/styled";
import {Text} from "../../../../shared/ui/Text";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";

const TextStyled = styled(Text)`
    text-align: center;
`;

const TextAccentInner = styled.span`
    color: #E30611;
`;

export function Title({children, ...rest}) {
    const sizeRatio = useSizeRatio();

    return (
        <TextStyled size="m" ratio={sizeRatio} {...rest}>
            Ты&nbsp;—&nbsp;<TextAccentInner ratio={sizeRatio}>{children}</TextAccentInner>!
        </TextStyled>
    );
}
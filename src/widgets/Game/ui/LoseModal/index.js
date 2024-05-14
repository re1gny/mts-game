import styled from "@emotion/styled";
import {Modal} from "../../../../shared/ui/Modal";
import {Panel} from "../../../../shared/ui/Panel";
import {Text} from "../../../../shared/ui/Text";
import {Button} from "../../../../shared/ui/Button";
import {Image} from "../../../../shared/ui/Image";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import { ReactComponent as Lose } from '../../assets/lose.svg';
import {useEffect} from "react";
import {reachMetrikaGoal} from "../../../../shared/utils/reachMetrikaGoal";

const Wrapper = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PanelStyled = styled(Panel)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: calc(20px * ${({ratio}) => ratio});
`;

const TextStyled = styled(Text)`
    text-align: center;
`;

const ImageStyled = styled(Image)`
    width: calc(171px * ${({ratio}) => ratio});
    height: calc(185px * ${({ratio}) => ratio});
    margin-top: calc(20px * ${({ratio}) => ratio});
`;

const ButtonStyled = styled(Button)`
    width: 100%;
    margin-top: calc(12px * ${({ratio}) => ratio});
`;

export function LoseModal({className, opened, onReset}) {
    const sizeRatio = useSizeRatio();

    const handleReset = () => {
        onReset?.();
        reachMetrikaGoal('again');
    }

    useEffect(() => {
        if (opened) {
            reachMetrikaGoal('lose');
        }
    }, [opened]);

    return (
        <Wrapper className={className} opened={opened} ratio={sizeRatio}>
            <PanelStyled ratio={sizeRatio}>
                <TextStyled size="s" ratio={sizeRatio}>
                    Тебе попалось слишком
                    <br/>
                    много больших задач...
                    <br/>
                    Попробуй пройти
                    <br/>
                    уровень снова
                </TextStyled>
                <ImageStyled src={Lose} ratio={sizeRatio} />
            </PanelStyled>
            <ButtonStyled ratio={sizeRatio} onClick={handleReset}>
                Играть снова
            </ButtonStyled>
        </Wrapper>
    );
}
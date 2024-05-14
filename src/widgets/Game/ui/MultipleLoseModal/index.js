import styled from "@emotion/styled";
import {Modal} from "../../../../shared/ui/Modal";
import {Panel} from "../../../../shared/ui/Panel";
import {Text} from "../../../../shared/ui/Text";
import {Button} from "../../../../shared/ui/Button";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
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
    padding: calc(20px * ${({ratio}) => ratio}) calc(18px * ${({ratio}) => ratio});
`;

const TextStyled = styled(Text)`
    text-align: center;
`;

const ButtonStyled = styled(Button)`
    width: 100%;
    margin-top: calc(20px * ${({ratio}) => ratio});
`;

const RestInfoStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: calc(32px * ${({ratio}) => ratio});
`;

export function MultipleLoseModal({className, opened, onReset}) {
    const sizeRatio = useSizeRatio();

    const handleInternship = () => {
        reachMetrikaGoal('internship_lose');
        window.open('https://rabota.mtsbank.ru/st', '_blank');
    };

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
                    Удача была совсем близко,
                    <br/>
                    попробуешь ещё?
                    <br/>
                    Если дойдешь до конца,
                    <br/>
                    сможешь выиграть приз!
                </TextStyled>
                <ButtonStyled ratio={sizeRatio} onClick={handleReset}>
                    Играть снова
                </ButtonStyled>
            </PanelStyled>
            <RestInfoStyled ratio={sizeRatio}>
                <TextStyled size="s" ratio={sizeRatio}>
                    А узнать больше про работу
                    <br/>
                    в МТС Финтех можно тут:
                </TextStyled>
                <ButtonStyled ratio={sizeRatio} onClick={handleInternship}>
                    О стажировке
                </ButtonStyled>
            </RestInfoStyled>
        </Wrapper>
    );
}
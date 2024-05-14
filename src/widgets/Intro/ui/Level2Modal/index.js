import styled from "@emotion/styled";
import {Modal} from "../../../../shared/ui/Modal";
import {Panel} from "../../../../shared/ui/Panel";
import {Text} from "../../../../shared/ui/Text";
import {Image} from "../../../../shared/ui/Image";
import {Button} from "../../../../shared/ui/Button";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {LEVEL_2_TASKS, TaskItem} from "../../../../entities/Task";
import {LEVEL_2_GRADE} from "../../../../entities/Character";
import {Title} from "../../../../entities/Intro";
import { ReactComponent as Level2sign1 } from "../../assets/level2sign1.svg";
import { ReactComponent as Level2sign2 } from "../../assets/level2sign2.svg";
import { ReactComponent as Level2character } from "../../assets/level2character.svg";
import {useEffect} from "react";
import {reachMetrikaGoal} from "../../../../shared/utils/reachMetrikaGoal";

const Wrapper = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: calc(22px * ${({ratio}) => ratio});
`;

const TitleStyled = styled(Title)`
    position: relative;
    width: 100%;
    padding: 0 calc(54.5px * ${({ratio}) => ratio});
    z-index: 2;
`;

const ContentStyled = styled.div`
    position: relative;
    margin-top: calc(124px * ${({ratio}) => ratio});
    z-index: 1;
`;

const ImagesContainerStyled = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(288px * ${({ratio}) => ratio});
`;

const Level2Sign1ImageStyled = styled(Image)`
    position: absolute;
    top: calc(-22.6px * ${({ratio}) => ratio});
    left: calc(24.7px * ${({ratio}) => ratio});
    width: calc(146px * ${({ratio}) => ratio});
    height: calc(118px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const Level2Sign2ImageStyled = styled(Image)`
    position: absolute;
    top: calc(0px * ${({ratio}) => ratio});
    left: calc(143.6px * ${({ratio}) => ratio});
    width: calc(96px * ${({ratio}) => ratio});
    height: calc(91px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const Level2CharacterImageStyled = styled(Image)`
    position: absolute;
    top: calc(2.5px * ${({ratio}) => ratio});
    left: calc(70.3px * ${({ratio}) => ratio});
    width: calc(119px * ${({ratio}) => ratio});
    height: calc(119px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const PanelStyled = styled(Panel)`
    width: 100%;
    padding: calc(22px * ${({ratio}) => ratio}) calc(35px * ${({ratio}) => ratio}) calc(25px * ${({ratio}) => ratio});
`;

const TextStyled = styled(Text)`
    text-align: center;
`;

const TasksListStyled = styled.div`
    width: 100%;
    margin-top: calc(18px * ${({ratio}) => ratio});
`;

const TaskItemStyled = styled(TaskItem)`
    width: 100%;
    
    & + & {
        margin-top: calc(8px * ${({ratio}) => ratio});
    }
`;

const ButtonStyled = styled(Button)`
    width: 100%;
    margin-top: calc(12px * ${({ratio}) => ratio});
`;

export function Level2Modal({className, opened, initial, onNext}) {
    const sizeRatio = useSizeRatio();

    const handleNext = () => {
        onNext?.();
        reachMetrikaGoal('lvl2_start');
    }

    useEffect(() => {
        if (opened) {
            reachMetrikaGoal('lvl1_finish');
        }
    }, [opened]);

    return (
        <Wrapper className={className} opened={opened} initial={initial} ratio={sizeRatio}>
            <TitleStyled ratio={sizeRatio}>
                {LEVEL_2_GRADE.toLowerCase()}
            </TitleStyled>
            <ContentStyled ratio={sizeRatio}>
                <ImagesContainerStyled ratio={sizeRatio}>
                    <Level2Sign1ImageStyled src={Level2sign1} ratio={sizeRatio} />
                    <Level2Sign2ImageStyled src={Level2sign2} ratio={sizeRatio} />
                    <Level2CharacterImageStyled src={Level2character} ratio={sizeRatio} />
                </ImagesContainerStyled>
                <PanelStyled ratio={sizeRatio}>
                    <TextStyled size="xs" ratio={sizeRatio}>
                        Ого, крутой прогресс!
                        <br/>
                        Теперь ты клиентский
                        <br/>
                        менеджер, а&nbsp;вот твои
                        <br/>
                        новые&nbsp;задачи:
                    </TextStyled>
                    <TasksListStyled ratio={sizeRatio}>
                        {LEVEL_2_TASKS.map(({ image, name }, index) => (
                            <TaskItemStyled key={index} name={name} image={image} ratio={sizeRatio} />
                        ))}
                    </TasksListStyled>
                </PanelStyled>
                <ButtonStyled ratio={sizeRatio} onClick={handleNext}>
                    Уровень #2
                </ButtonStyled>
            </ContentStyled>
        </Wrapper>
    );
}
import styled from "@emotion/styled";
import {Modal} from "../../../../shared/ui/Modal";
import {Panel} from "../../../../shared/ui/Panel";
import {Text} from "../../../../shared/ui/Text";
import {Image} from "../../../../shared/ui/Image";
import {Button} from "../../../../shared/ui/Button";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {Title} from "../../../../entities/Intro";
import {LEVEL_1_TASKS, TaskItem} from "../../../../entities/Task";
import {LEVEL_1_GRADE} from "../../../../entities/Character";
import { ReactComponent as Level1sign1 } from "../../assets/level1sign1.svg";
import { ReactComponent as Level1sign2 } from "../../assets/level1sign2.svg";
import { ReactComponent as Level1character } from "../../assets/level1character.svg";
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
    padding: 0 calc(76.5 * ${({ratio}) => ratio});
    width: 100%;
    z-index: 2;
`;

const ContentStyled = styled.div`
    position: relative;
    margin-top: calc(148px * ${({ratio}) => ratio});
    z-index: 1;
`;

const ImagesContainerStyled = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(288px * ${({ratio}) => ratio});
`;

const Level1Sign1ImageStyled = styled(Image)`
    position: absolute;
    top: calc(1px * ${({ratio}) => ratio});
    right: calc(161.7px * ${({ratio}) => ratio});
    width: calc(102px * ${({ratio}) => ratio});
    height: calc(89px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const Level1Sign2ImageStyled = styled(Image)`
    position: absolute;
    top: calc(-8.9px * ${({ratio}) => ratio});
    right: calc(9.9px * ${({ratio}) => ratio});
    width: calc(158px * ${({ratio}) => ratio});
    height: calc(155px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const Level1CharacterImageStyled = styled(Image)`
    position: absolute;
    top: calc(4px * ${({ratio}) => ratio});
    right: calc(77.7px * ${({ratio}) => ratio});
    width: calc(127px * ${({ratio}) => ratio});
    height: calc(131px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const PanelStyled = styled(Panel)`
    width: 100%;
    padding: calc(36px * ${({ratio}) => ratio}) calc(25px * ${({ratio}) => ratio}) calc(38px * ${({ratio}) => ratio});
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

export function Level1Modal({className, opened, initial, onNext}) {
    const sizeRatio = useSizeRatio();

    const handleNext = () => {
        reachMetrikaGoal('lvl1_start');
        onNext?.();
    }

    return (
        <Wrapper className={className} opened={opened} initial={initial} ratio={sizeRatio}>
            <TitleStyled ratio={sizeRatio}>
                {LEVEL_1_GRADE.toLowerCase()}
            </TitleStyled>
            <ContentStyled ratio={sizeRatio}>
                <ImagesContainerStyled ratio={sizeRatio}>
                    <Level1Sign2ImageStyled src={Level1sign2} ratio={sizeRatio} />
                    <Level1Sign1ImageStyled src={Level1sign1} ratio={sizeRatio} />
                    <Level1CharacterImageStyled src={Level1character} ratio={sizeRatio} />
                </ImagesContainerStyled>
                <PanelStyled ratio={sizeRatio}>
                    <TextStyled size="xs" ratio={sizeRatio}>
                        Добро пожаловать!
                        <br/>
                        Твои первые задачи:
                    </TextStyled>
                    <TasksListStyled ratio={sizeRatio}>
                        {LEVEL_1_TASKS.map(({ image, name }, index) => (
                            <TaskItemStyled key={index} name={name} image={image} ratio={sizeRatio} />
                        ))}
                    </TasksListStyled>
                </PanelStyled>
                <ButtonStyled ratio={sizeRatio} onClick={handleNext}>
                    Уровень #1
                </ButtonStyled>
            </ContentStyled>
        </Wrapper>
    );
}
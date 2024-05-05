import styled from "@emotion/styled";
import {Modal} from "../../../../shared/ui/Modal";
import {Panel} from "../../../../shared/ui/Panel";
import {Text} from "../../../../shared/ui/Text";
import {Image} from "../../../../shared/ui/Image";
import {Button} from "../../../../shared/ui/Button";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {LEVEL_3_TASKS, TaskItem} from "../../../../entities/Task";
import {LEVEL_3_GRADE} from "../../../../entities/Character";
import {Title} from "../../../../entities/Intro";
import { ReactComponent as Level3sign } from "../../assets/level3sign.svg";
import { ReactComponent as Level3character } from "../../assets/level3character.svg";

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
    padding: 0 calc(42.5px * ${({ratio}) => ratio});
    z-index: 2;
`;

const ContentStyled = styled.div`
    position: relative;
    margin-top: calc(122px * ${({ratio}) => ratio});
    z-index: 1;
`;

const ImagesContainerStyled = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(288px * ${({ratio}) => ratio});
`;

const Level3SignImageStyled = styled(Image)`
    position: absolute;
    top: calc(34.9px * ${({ratio}) => ratio});
    right: calc(56.6px * ${({ratio}) => ratio});
    width: calc(181px * ${({ratio}) => ratio});
    height: calc(207px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const Level3CharacterImageStyled = styled(Image)`
    position: absolute;
    top: calc(7.7px * ${({ratio}) => ratio});
    right: calc(73.9px * ${({ratio}) => ratio});
    width: calc(142px * ${({ratio}) => ratio});
    height: calc(130px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 2;
`;

const PanelStyled = styled(Panel)`
    width: 100%;
    padding: calc(20px * ${({ratio}) => ratio});
`;

const TextStyled = styled(Text)`
    text-align: center;
`;

const TasksListStyled = styled.div`
    width: 100%;
    margin-top: calc(14px * ${({ratio}) => ratio});
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

export function Level3Modal({className, opened, initial, onNext}) {
    const sizeRatio = useSizeRatio();

    return (
        <Wrapper className={className} opened={opened} initial={initial} ratio={sizeRatio}>
            <TitleStyled ratio={sizeRatio}>
                {LEVEL_3_GRADE.toLowerCase()}
            </TitleStyled>
            <ContentStyled ratio={sizeRatio}>
                <ImagesContainerStyled ratio={sizeRatio}>
                    <Level3SignImageStyled src={Level3sign} ratio={sizeRatio} />
                    <Level3CharacterImageStyled src={Level3character} ratio={sizeRatio} />
                </ImagesContainerStyled>
                <PanelStyled ratio={sizeRatio}>
                    <TextStyled size="xs" ratio={sizeRatio}>
                        Вот это упорство!
                        <br/>
                        Пришло время стать руководителем отделения банка и&nbsp;взять на&nbsp;себя самые ответственные задачи.
                    </TextStyled>
                    <TasksListStyled ratio={sizeRatio}>
                        {LEVEL_3_TASKS.map(({ image, name }, index) => (
                            <TaskItemStyled key={index} name={name} image={image} ratio={sizeRatio} />
                        ))}
                    </TasksListStyled>
                </PanelStyled>
                <ButtonStyled ratio={sizeRatio} onClick={onNext}>
                    Уровень #3
                </ButtonStyled>
            </ContentStyled>
        </Wrapper>
    );
}
import styled from "@emotion/styled";
import {Modal} from "../../../../shared/ui/Modal";
import {Panel} from "../../../../shared/ui/Panel";
import {Text} from "../../../../shared/ui/Text";
import {Button} from "../../../../shared/ui/Button";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {LEVEL_1_TASKS, LEVEL_2_TASKS, LEVEL_3_TASKS, TaskItem} from "../../../../entities/Task";

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
    padding: calc(20px * ${({ratio}) => ratio}) calc(22px * ${({ratio}) => ratio});
`;

const TagStyled = styled(Panel)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(4px * ${({ratio}) => ratio}) calc(8px * ${({ratio}) => ratio});
    width: auto;
    background-color: #EBE9EF;
`;

const TasksTitleStyled = styled(Text)`
    text-align: center;
    margin-top: calc(14px * ${({ratio}) => ratio});
`;

const TasksListStyled = styled.div`
    width: 100%;
    margin-top: calc(14px * ${({ratio}) => ratio});
`;

const TaskItemStyled = styled(TaskItem)`
    width: 100%;
    
    & + & {
        margin-top: calc(16px * ${({ratio}) => ratio});
    }
`;

const RulesTextStyled = styled(Text)`
    text-align: center;
    margin-top: calc(20px * ${({ratio}) => ratio});
    padding: 0 calc(20px * ${({ratio}) => ratio});
`;

const ButtonStyled = styled(Button)`
    width: 100%;
    margin-top: calc(20px * ${({ratio}) => ratio});
`;

const LEVEL_TO_TASKS = {
    1: LEVEL_1_TASKS,
    2: LEVEL_2_TASKS,
    3: LEVEL_3_TASKS,
};

export function PauseModal({className, level, opened, onResume}) {
    const sizeRatio = useSizeRatio();

    return (
        <Wrapper className={className} opened={opened} ratio={sizeRatio}>
            <PanelStyled ratio={sizeRatio}>
                <TagStyled size="s" ratio={sizeRatio}>
                    <Text size="s">Уровень #{level}</Text>
                </TagStyled>
                <TasksTitleStyled size="xs" ratio={sizeRatio}>
                    Тебе нужно ловить эти&nbsp;задачи:
                </TasksTitleStyled>
                <TasksListStyled ratio={sizeRatio}>
                    {LEVEL_TO_TASKS[level].map(({ image, name }, index) => (
                        <TaskItemStyled key={index} name={name} image={image} ratio={sizeRatio} />
                    ))}
                </TasksListStyled>
            </PanelStyled>
            <RulesTextStyled size="s" ratio={sizeRatio}>
                У&nbsp;тебя есть 3&nbsp;жизни&nbsp;— избегай задач больше тебя по&nbsp;размеру.
            </RulesTextStyled>
            <ButtonStyled ratio={sizeRatio} onClick={onResume}>
                Продолжить
            </ButtonStyled>
        </Wrapper>
    );
}
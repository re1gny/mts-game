import {useEffect, useState} from "react";
import {useMotionValue, useAnimationControls} from "framer-motion";
import styled from "@emotion/styled";
import {Panel} from "../../../../shared/ui/Panel";
import {Text} from "../../../../shared/ui/Text";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {Character, LEVEL_1_GRADE, LEVEL_2_GRADE, LEVEL_3_GRADE} from "../../../../entities/Character";
import {ProgressBar} from "../../../../entities/Loading";

const LEVEL_TO_GRADE = {
    1: LEVEL_1_GRADE,
    2: LEVEL_2_GRADE,
    3: LEVEL_3_GRADE,
}

const LEVEL_TO_CHARACTER_SIZE = {
    1: [75, 82],
    2: [77, 80],
    3: [86, 88],
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: calc(213px * ${({ratio}) => ratio}) calc(38.5px * ${({ratio}) => ratio}) calc(212px * ${({ratio}) => ratio});
`;

const InfoContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LevelTag = styled(Panel)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    padding: calc(4px * ${({ratio}) => ratio}) calc(16px * ${({ratio}) => ratio});
    text-transform: uppercase;
`;

const Title = styled(Text)`
    text-align: center;
    margin-top: calc(12px * ${({ratio}) => ratio});
`;

const ProgressContainerStyled = styled.div`
    position: relative;
    width: calc(239px * ${({ratio}) => ratio});
    margin-top: calc(138px * ${({ratio}) => ratio});
`;

const CharacterStyled = styled(Character)`
    position: absolute;
    top: 1px;
    left: 0;
    width: calc(${({level}) => LEVEL_TO_CHARACTER_SIZE[level][0]}px * ${({ratio}) => ratio});
    height: calc(${({level}) => LEVEL_TO_CHARACTER_SIZE[level][1]}px * ${({ratio}) => ratio});
`;

const ProgressStyled = styled(ProgressBar)`
    width: 100%;
`;

export function LevelLoading({level, onNext}) {
    const sizeRatio = useSizeRatio();
    const [isFinished, setIsFinished] = useState(false);
    const progress = useMotionValue('0%');
    const animationControls = useAnimationControls();
    const characterX = useMotionValue('-50%');
    const characterY = useMotionValue('-100%');

    useEffect(() => {
        animationControls
            .start(
                { width: '100%' },
                { duration: 2, ease: 'linear' },
            )
            .then(() => setIsFinished(true))
            .then(onNext);
    }, []);

    return (
        <Wrapper ratio={sizeRatio}>
            <InfoContainerStyled ratio={sizeRatio}>
                <LevelTag ratio={sizeRatio} size="s">
                    <Text size="l">LVL {level}</Text>
                </LevelTag>
                <Title ratio={sizeRatio} size="l">
                    {LEVEL_TO_GRADE[level]}
                </Title>
            </InfoContainerStyled>
            <ProgressContainerStyled ratio={sizeRatio}>
                <CharacterStyled
                    ratio={sizeRatio}
                    level={level}
                    direction={isFinished ? 0 : 1}
                    style={{left: progress, x: characterX, y: characterY}}
                />
                <ProgressStyled ratio={sizeRatio} value={progress} controls={animationControls} />
            </ProgressContainerStyled>
        </Wrapper>
    );
}
import {motion, useMotionValue} from "framer-motion";
import styled from "@emotion/styled";
import {Logo} from "../../../../shared/ui/Logo";
import {Panel} from "../../../../shared/ui/Panel";
import {Button} from "../../../../shared/ui/Button";
import {Text} from "../../../../shared/ui/Text";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {useRouter} from "../../../../entities/Router";
import {Control, ProgressBar} from "../../../../entities/Game";
import {Character, LEVEL_TO_CHARACTER_SIZE} from "../../../../entities/Character";
import {Image} from "../../../../shared/ui/Image";
import { ReactComponent as Background } from '../../assets/background.svg';
import { ReactComponent as Sign1 } from '../../assets/sign1.svg';
import { ReactComponent as Cursor } from '../../assets/cursor.svg';
import {useCallback, useEffect, useState} from "react";
import throttle from "lodash/throttle";
import {CHARACTER_STEP} from "../../../../widgets/Game";

const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding: calc(67.5px * ${({ratio}) => ratio}) calc(20px * ${({ratio}) => ratio}) calc(17px * ${({ratio}) => ratio});
`;

const LogoStyled = styled(Logo)`
    position: absolute;
    top: -1px;
    left: 0;
    z-index: 4;
`;

const BackgroundImageStyled = styled(Image)`
    position: absolute;
    left: calc(-86px * ${({ratio}) => ratio});
    bottom: calc(-2.6px * ${({ratio}) => ratio});
    width: calc(608px * ${({ratio}) => ratio});
    height: calc(351px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign1ImageStyled = styled(Image)`
    position: absolute;
    top: calc(18px * ${({ratio}) => ratio});
    right: calc(-62.5px * ${({ratio}) => ratio});
    width: calc(257px * ${({ratio}) => ratio});
    height: calc(208px * ${({ratio}) => ratio});
    z-index: 1;
`;

const PanelStyled = styled(Panel)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(25.6px * ${({ratio}) => ratio}) calc(18.5px * ${({ratio}) => ratio}) calc(37px * ${({ratio}) => ratio});
    z-index: 3;
`;

const TextStyled = styled(Text)`
    text-align: center;
`;

const ButtonStyled = styled(Button)`
    position: relative;
    flex-shrink: 0;
    width: 100%;
    margin-top: calc(11.5px * ${({ratio}) => ratio});
    z-index: 3;
`;

const ControlWrapperStyled = styled.div`
    position: relative;
    margin-top: calc(61.6px * ${({ratio}) => ratio});
`;

const ControlStyled = styled(Control)`
    
`;

const CursorStyled = styled(Image)`
    position: absolute;
    top: 50%;
    left: calc(50% - (8px * ${({ratio}) => ratio}));
    width: calc(40px * ${({ratio}) => ratio});
    height: calc(54px * ${({ratio}) => ratio});
`;

const CharacterWrapperStyled = styled.div`
    position: relative;
    margin-top: calc(80.9px * ${({ratio}) => ratio});
    width: 100%;
    height: calc(${({level}) => LEVEL_TO_CHARACTER_SIZE[level][1]}px * ${({ratio}) => ratio});
`;

const CharacterStyled = styled(Character)`
    position: absolute;
    bottom: 0;
`;

const ProgressBarStyled = styled(ProgressBar)`
    position: absolute;
    top: calc(-12px * ${({ratio}) => ratio});
    left: calc(42.2px * ${({ratio}) => ratio});;
    transform: translateY(-100%);
    width: calc(61.7px * ${({ratio}) => ratio});
`;

const DELTA = 24;

export function TrainingPage() {
    const sizeRatio = useSizeRatio();
    const {next} = useRouter();
    const [direction, setDirection] = useState(0);
    const stickX = useMotionValue('0');

    const handleMove = useCallback(
        throttle(() => {
            const x = parseFloat(stickX.get());

            const sign = x > 0 ? 1 : x < 0 ? -1 : 0;

            setDirection(sign * CHARACTER_STEP);
        }, 50),
        []
    );

    useEffect(() => {
        return stickX.on('change', () => handleMove())
    }, []);

    return (
        <Wrapper
            ratio={sizeRatio}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <LogoStyled ratio={sizeRatio} />
            <BackgroundImageStyled src={Background} ratio={sizeRatio} />
            <Sign1ImageStyled src={Sign1} ratio={sizeRatio} />
            <PanelStyled ratio={sizeRatio}>
                <TextStyled ratio={sizeRatio} size="m">
                    Управляй персонажем
                    <br/>
                    с помощью джойстика
                    <br/>
                    в любой точке экрана.
                    <br/>
                    Лови задачи твоего
                    <br/>
                    размера и избегай тех,
                    <br/>
                    что больше тебя!
                </TextStyled>
                <ControlWrapperStyled ratio={sizeRatio}>
                    <ControlStyled
                        stickProps={{
                            dragListener: false,
                            drag: "x",
                            style: {x: stickX},
                            animate: {x: [`${-DELTA * sizeRatio}px`, `${DELTA * sizeRatio}px`]},
                            transition: {
                                duration: 0.6,
                                repeat: Infinity,
                                repeatDelay: 0.6,
                                repeatType: 'mirror',
                            },
                        }}
                        ratio={sizeRatio}
                    />
                    <CursorStyled
                        src={Cursor}
                        ratio={sizeRatio}
                        style={{x: stickX}}
                        transition={{duration: 0.6}}
                    />
                </ControlWrapperStyled>
                <CharacterWrapperStyled
                    level={3}
                    ratio={sizeRatio}
                >
                    <CharacterStyled
                        level={3}
                        direction={direction}
                        ratio={sizeRatio}
                        animate={{
                            x: direction > 0 ? '-100%' : direction < 0 ? '0' : '-50%',
                            left: direction > 0 ? '100%' : direction < 0 ? '0' : '50%',
                        }}
                        transition={{type: 'tween', duration: 1.2, ease: 'linear'}}
                    >
                        <ProgressBarStyled value={33} max={100} ratio={sizeRatio} />
                    </CharacterStyled>
                </CharacterWrapperStyled>
            </PanelStyled>
            <ButtonStyled ratio={sizeRatio} onClick={next}>
                Понятно
            </ButtonStyled>
        </Wrapper>
    )
}
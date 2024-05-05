import {useState} from "react";
import styled from "@emotion/styled";
import {AnimatePresence, motion} from "framer-motion";
import {Logo} from "../../../../shared/ui/Logo";
import {Button} from "../../../../shared/ui/Button";
import {Text} from "../../../../shared/ui/Text";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {Panel} from "../../../../shared/ui/Panel";
import {Checkbox} from "../../../../shared/ui/Checkbox";
import {Input} from "../../../../shared/ui/Input";
import {IconButton} from "../../../../shared/ui/IconButton";
import {Image} from "../../../../shared/ui/Image";
import { ReactComponent as Background } from '../../assets/background.svg';
import { ReactComponent as Sign1 } from '../../assets/sign1.svg';
import { ReactComponent as Sign2 } from '../../assets/sign2.svg';
import { ReactComponent as Sign3 } from '../../assets/sign3.svg';
import { ReactComponent as Sign4 } from '../../assets/sign4.svg';
import { ReactComponent as Character1 } from '../../assets/character1.svg';
import { ReactComponent as Character2 } from '../../assets/character2.svg';
import { ReactComponent as Character3 } from '../../assets/character3.svg';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrowRight.svg';

const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: calc(84px * ${({ratio}) => ratio}) calc(27.5px * ${({ratio}) => ratio}) calc(28px * ${({ratio}) => ratio});
`;

const TopWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    z-index: 2;
`;

const BackgroundImageStyled = styled(Image)`
    position: absolute;
    left: calc(-86px * ${({ratio}) => ratio});
    bottom: calc(-2.6px * ${({ratio}) => ratio});
    width: calc(609px * ${({ratio}) => ratio});
    height: calc(351px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign1ImageStyled = styled(Image)`
    position: absolute;
    top: calc(-58.3px * ${({ratio}) => ratio});
    right: calc(13.8px * ${({ratio}) => ratio});
    width: calc(158px * ${({ratio}) => ratio});
    height: calc(155px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign2ImageStyled = styled(Image)`
    position: absolute;
    top: calc(14.6px * ${({ratio}) => ratio});
    right: calc(57.7px * ${({ratio}) => ratio});
    width: calc(46px * ${({ratio}) => ratio});
    height: calc(49px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign3ImageStyled = styled(Image)`
    position: absolute;
    top: calc(114.1px * ${({ratio}) => ratio});
    left: calc(-61.4px * ${({ratio}) => ratio});
    width: calc(200px * ${({ratio}) => ratio});
    height: calc(162px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign4ImageStyled = styled(Image)`
    position: absolute;
    top: calc(238.9px * ${({ratio}) => ratio});
    right: calc(-38.3px * ${({ratio}) => ratio});
    width: calc(168px * ${({ratio}) => ratio});
    height: calc(159px * ${({ratio}) => ratio});
    z-index: 1;
`;

const CharacterImagesContainerStyled = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(320px * ${({ratio}) => ratio});
`;

const Character1ImageStyled = styled(Image)`
    position: absolute;
    top: calc(8.5px * ${({ratio}) => ratio});
    left: calc(0.5px * ${({ratio}) => ratio});
    width: calc(128px * ${({ratio}) => ratio});
    height: calc(155px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 3;
`;

const Character2ImageStyled = styled(Image)`
    position: absolute;
    top: calc(15.8px * ${({ratio}) => ratio});
    left: calc(96.3px * ${({ratio}) => ratio});
    width: calc(150px * ${({ratio}) => ratio});
    height: calc(181px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 3;
`;

const Character3ImageStyled = styled(Image)`
    position: absolute;
    top: calc(6.2px * ${({ratio}) => ratio});
    left: calc(209.4px * ${({ratio}) => ratio});
    width: calc(111px * ${({ratio}) => ratio});
    height: calc(142px * ${({ratio}) => ratio});
    transform: translateY(-100%);
    z-index: 3;
`;

const LogoStyled = styled(Logo)`
    position: absolute;
    top: -1px;
    left: 0;
    z-index: 4;
`;

const TextStyled = styled(Text)`
    text-align: center;
`;

const SentWrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: calc(58px * ${({ratio}) => ratio});
`;

const LeftSentIcon = styled(Image)`
    width: calc(28.8px * ${({ratio}) => ratio});
    height: calc(25.5px * ${({ratio}) => ratio});
`;

const SentText = styled(Text)`
    margin-left: calc(17px * ${({ratio}) => ratio});
`;

const RightSentIcon = styled(Image)`
    width: calc(28.8px * ${({ratio}) => ratio});
    height: calc(25.5px * ${({ratio}) => ratio});
    margin-left: calc(17px * ${({ratio}) => ratio});
`;

const FormWrapper = styled(motion.form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: calc(24px * ${({ratio}) => ratio});
`;

const FormControl = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    
    & + & {
        margin-top: calc(20px * ${({ratio}) => ratio});
    }
`;

const InputStyled = styled(Input)`
    flex-grow: 1;
`;

const IconButtonStyled = styled(IconButton)`
    flex-shrink: 0;
    margin-left: calc(4px * ${({ratio}) => ratio});
`;

const ArrowRightStyled = styled(ArrowRight)`
    width: calc(28px * ${({ratio}) => ratio});
    height: calc(26px * ${({ratio}) => ratio});
`;

const CheckboxStyled = styled(Checkbox)`
    width: 100%;
`;

const BottomWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: calc(180px * ${({ratio}) => ratio});
    z-index: 2;
`;

const PanelStyled = styled(Panel)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(28px * ${({ratio}) => ratio}) calc(22px * ${({ratio}) => ratio});
`;

const ButtonStyled = styled(Button)`
    width: 100%;
    margin-top: calc(12px * ${({ratio}) => ratio});
`;

export function FinalPage() {
    const sizeRatio = useSizeRatio();
    const [email, setEmail] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const isSendingEmailDisabled = !email.length || !/\S+@\S+\.\S+/.test(email) || !isAgreed;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSendingEmailDisabled) {
            return;
        }

        setIsSent(true);
    }

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
            <Sign2ImageStyled src={Sign2} ratio={sizeRatio} />
            <Sign3ImageStyled src={Sign3} ratio={sizeRatio} />
            <Sign4ImageStyled src={Sign4} ratio={sizeRatio} />
            <TopWrapper ratio={sizeRatio}>
                <TextStyled ratio={sizeRatio} size="s">
                    Ура, все задачи выполнены!
                    <br/>
                    Оставляй почту и участвуй
                    <br/>
                    в розыгрыше!
                </TextStyled>
                <AnimatePresence mode="wait">
                    {isSent ? (
                        <SentWrapper
                            key='sent'
                            ratio={sizeRatio}
                            initial={{opacity: 0}}
                            animate={{opacity: 0.5}}
                        >
                            <LeftSentIcon src={Heart} ratio={sizeRatio} />
                            <SentText size="s" ratio={sizeRatio}>
                                Почта отправлена
                            </SentText>
                            <RightSentIcon src={Heart} ratio={sizeRatio} />
                        </SentWrapper>
                    ) : (
                        <FormWrapper
                            key='not-sent'
                            initial={{opacity: 1}}
                            exit={{opacity: 0}}
                            ratio={sizeRatio}
                            onSubmit={handleSubmit}
                        >
                            <FormControl ratio={sizeRatio}>
                                <InputStyled
                                    ratio={sizeRatio}
                                    placeholder="example@email.com"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                />
                                <IconButtonStyled
                                    ratio={sizeRatio}
                                    type="submit"
                                    disabled={isSendingEmailDisabled}
                                >
                                    <ArrowRightStyled ratio={sizeRatio} />
                                </IconButtonStyled>
                            </FormControl>
                            <FormControl ratio={sizeRatio}>
                                <CheckboxStyled value={isAgreed} ratio={sizeRatio} onChange={setIsAgreed}>
                                    Я&nbsp;согласен(а) на&nbsp;обработку персональных данных и&nbsp;получение информационных сообщений
                                </CheckboxStyled>
                            </FormControl>
                        </FormWrapper>
                    )}
                </AnimatePresence>
            </TopWrapper>
            <BottomWrapper ratio={sizeRatio}>
                <CharacterImagesContainerStyled ratio={sizeRatio}>
                    <Character3ImageStyled src={Character3} ratio={sizeRatio} />
                    <Character2ImageStyled src={Character2} ratio={sizeRatio} />
                    <Character1ImageStyled src={Character1} ratio={sizeRatio} />
                </CharacterImagesContainerStyled>
                <PanelStyled ratio={sizeRatio}>
                    <TextStyled ratio={sizeRatio} size="s">
                        Чтобы повторить карьерный путь не&nbsp;в&nbsp;игре, а&nbsp;в&nbsp;жизни, оставляй заявку на&nbsp;стажировку в&nbsp;МТС&nbsp;Финтех!
                    </TextStyled>
                </PanelStyled>
                <ButtonStyled ratio={sizeRatio}>
                    К стажировке!
                </ButtonStyled>
            </BottomWrapper>
        </Wrapper>
    )
}
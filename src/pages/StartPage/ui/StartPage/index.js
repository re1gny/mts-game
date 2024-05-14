import styled from "@emotion/styled";
import {motion} from "framer-motion";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {useRouter} from "../../../../entities/Router";
import {Button} from "../../../../shared/ui/Button";
import {Logo} from "../../../../shared/ui/Logo";
import {Image} from "../../../../shared/ui/Image";
import {Text} from "../../../../shared/ui/Text";
import { ReactComponent as Background } from '../../assets/background.svg';
import { ReactComponent as Character1 } from '../../assets/character1.svg';
import { ReactComponent as Character2 } from '../../assets/character2.svg';
import { ReactComponent as Sign1 } from '../../assets/sign1.svg';
import { ReactComponent as Sign2 } from '../../assets/sign2.svg';
import { ReactComponent as Sign3 } from '../../assets/sign3.svg';
import { ReactComponent as Sign4 } from '../../assets/sign4.svg';
import { ReactComponent as Sign5 } from '../../assets/sign5.svg';

const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: calc(159px * ${({ratio}) => ratio}) calc(20px * ${({ratio}) => ratio}) calc(17px * ${({ratio}) => ratio});
`;

const LogoStyled = styled(Logo)`
    position: absolute;
    top: -1px;
    left: 0;
    z-index: 5;
`;

const BackgroundImageStyled = styled(Image)`
    position: absolute;
    left: calc(-86px * ${({ratio}) => ratio});
    bottom: calc(-2.6px * ${({ratio}) => ratio});
    width: calc(608px * ${({ratio}) => ratio});
    height: calc(351px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Character1ImageStyled = styled(Image)`
    position: absolute;
    right: calc(-18.9px * ${({ratio}) => ratio});
    bottom: calc(51px * ${({ratio}) => ratio});
    width: calc(229px * ${({ratio}) => ratio});
    height: calc(235px * ${({ratio}) => ratio});
    z-index: 4;
`;

const Character2ImageStyled = styled(Image)`
    position: absolute;
    left: calc(4.5px * ${({ratio}) => ratio});
    bottom: calc(174px * ${({ratio}) => ratio});
    width: calc(158px * ${({ratio}) => ratio});
    height: calc(210px * ${({ratio}) => ratio});
    z-index: 2;
`;

const Sign1ImageStyled = styled(Image)`
    position: absolute;
    top: calc(58.4px * ${({ratio}) => ratio});
    left: calc(20.9px * ${({ratio}) => ratio});
    width: calc(58px * ${({ratio}) => ratio});
    height: calc(60px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign2ImageStyled = styled(Image)`
    position: absolute;
    right: calc(21.4px * ${({ratio}) => ratio});
    bottom: calc(294.2px * ${({ratio}) => ratio});
    width: calc(54px * ${({ratio}) => ratio});
    height: calc(57px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign3ImageStyled = styled(Image)`
    position: absolute;
    top: calc(194px * ${({ratio}) => ratio});
    left: calc(-66px * ${({ratio}) => ratio});
    width: calc(190px * ${({ratio}) => ratio});
    height: calc(202px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign4ImageStyled = styled(Image)`
    position: absolute;
    top: calc(18px * ${({ratio}) => ratio});
    right: calc(-62.5px * ${({ratio}) => ratio});
    width: calc(257px * ${({ratio}) => ratio});
    height: calc(208px * ${({ratio}) => ratio});
    z-index: 1;
`;

const Sign5ImageStyled = styled(Image)`
    position: absolute;
    left: calc(22px * ${({ratio}) => ratio});
    bottom: calc(79.5px * ${({ratio}) => ratio});
    width: calc(68px * ${({ratio}) => ratio});
    height: calc(63px * ${({ratio}) => ratio});
    z-index: 1;
`;


const TextWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 4;
`;

const TextStyled = styled(Text)`
    text-align: center;
    
    & + & {
        margin-top: calc(13px * ${({ratio}) => ratio});
    }
`;

const ButtonStyled = styled(Button)`
    position: relative;
    width: 100%;
    z-index: 3;
`;

export function StartPage() {
    const sizeRatio = useSizeRatio();
    const {next} = useRouter();

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
            <Character1ImageStyled src={Character1} ratio={sizeRatio} />
            <Character2ImageStyled src={Character2} ratio={sizeRatio} />
            <Sign1ImageStyled src={Sign1} ratio={sizeRatio} />
            <Sign2ImageStyled src={Sign2} ratio={sizeRatio} />
            <Sign3ImageStyled src={Sign3} ratio={sizeRatio} />
            <Sign4ImageStyled src={Sign4} ratio={sizeRatio} />
            <Sign5ImageStyled src={Sign5} ratio={sizeRatio} />
            <TextWrapper ratio={sizeRatio}>
                <TextStyled ratio={sizeRatio} size="m">
                    Ищешь классную работу,
                    <br/>
                    но&nbsp;у&nbsp;тебя&nbsp;нет&nbsp;опыта?
                    <br/>
                    Приходи в&nbsp;МТС&nbsp;Финтех!
                </TextStyled>
                <TextStyled ratio={sizeRatio} size="m">
                    Узнай больше в&nbsp;этой игре
                    <br/>
                    и&nbsp;получи призы!
                </TextStyled>
            </TextWrapper>
            <ButtonStyled ratio={sizeRatio} onClick={next}>
                Играть
            </ButtonStyled>
        </Wrapper>
    )
}
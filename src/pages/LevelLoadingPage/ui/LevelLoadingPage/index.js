import {motion} from "framer-motion";
import styled from "@emotion/styled";
import {Logo} from "../../../../shared/ui/Logo";
import {LevelLoading} from "../../../../widgets/Loading";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {useRouter} from "../../../../entities/Router";

const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const LogoStyled = styled(Logo)`
    position: absolute;
    top: -1px;
    left: 0;
    z-index: 2;
`;

const LevelLoadingStyled = styled(LevelLoading)`
    width: 100%;
    height: 100%;
    z-index: 1;
`;

export function LevelLoadingPage({level}) {
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
            <LevelLoadingStyled level={level} onNext={next} />
        </Wrapper>
    )
}
import styled from "@emotion/styled";
import {motion} from "framer-motion";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {Level1Modal, Level2Modal, Level3Modal} from "../../../../widgets/Intro";
import {useRouter} from "../../../../entities/Router";

const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const LEVEL_TO_MODAL = {
    1: Level1Modal,
    2: Level2Modal,
    3: Level3Modal,
}

export function LevelIntroPage({level}) {
    const sizeRatio = useSizeRatio();
    const {next} = useRouter();
    const Modal = LEVEL_TO_MODAL[level] || (() => null);

    return (
        <Wrapper
            ratio={sizeRatio}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Modal opened initial={false} onNext={next} />
        </Wrapper>
    );
}
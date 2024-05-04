import styled from "@emotion/styled";
import {motion} from "framer-motion";
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {useRouter} from "../../../../entities/Router";
import {Game} from "../../../../widgets/Game";

const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export function LevelGamePage({level}) {
    const {next, reset} = useRouter();
    const sizeRatio = useSizeRatio();

    return (
        <Wrapper
            ratio={sizeRatio}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Game level={level} onNext={next} onReset={reset} />
        </Wrapper>
    );
}
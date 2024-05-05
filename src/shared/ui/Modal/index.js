import {AnimatePresence, motion} from "framer-motion";
import styled from "@emotion/styled";
import { useSizeRatio } from "../../hooks/useSizeRatio";


const ModalWrapper = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: calc(28.5px * ${({ratio}) => ratio}) calc(27.5px * ${({ratio}) => ratio});
    background-color: #E6EBFE;
    z-index: 1000;
`;

const ModalBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const ModalContent = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    padding: calc(16px * ${({ratio}) => ratio});
    border-radius: calc(20px * ${({ratio}) => ratio});
    background-color: #EBE9EF;
    overflow: auto;
    z-index: 2;
`;

export const Modal = ({ initial = true, opened, children, ...rest }) => {
    const sizeRatio = useSizeRatio();

    return (
        <AnimatePresence initial={initial}>
            {!!opened && (
                <ModalWrapper
                    ratio={sizeRatio}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{type: 'spring', duration: 0.3}}
                >
                    <ModalBackdrop ratio={sizeRatio} />
                    <ModalContent
                        ratio={sizeRatio}
                        initial={{scale: 0.85}}
                        animate={{scale: 1}}
                        transition={{type: 'spring', duration: 0.3}}
                        {...rest}
                    >
                        {children}
                    </ModalContent>
                </ModalWrapper>
            )}
        </AnimatePresence>
    );
    
}
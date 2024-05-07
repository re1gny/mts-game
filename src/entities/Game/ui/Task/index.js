import styled from '@emotion/styled';
import {useSizeRatio} from "../../../../shared/hooks/useSizeRatio";
import {Image} from "../../../../shared/ui/Image";
import {motion, useTransform} from "framer-motion";
import {forwardRef} from "react";

const ImageStyled = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(${({size}) => size}px * ${({ratio}) => ratio});
    height: calc(${({size}) => size}px * ${({ratio}) => ratio});
`;

const TaskComponent = ({task, tasksPosition, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();
    const x = useTransform(tasksPosition, prev => `${prev[task?.id]?.[0]}px`);
    const y = useTransform(tasksPosition, prev => `${prev[task?.id]?.[1]}px`);

    if (!task) {
        return null;
    }

    return (
        <ImageStyled
            {...rest}
            ref={ref}
            src={task.image}
            size={task.size}
            ratio={sizeRatio}
            style={{x, y}}
            exit={{scale: 0.8, opacity: 0}}
            transition={{type: "spring", velocity: 4}}
        />
    );
};

export const Task = motion(forwardRef(TaskComponent), {forwardMotionProps: true});
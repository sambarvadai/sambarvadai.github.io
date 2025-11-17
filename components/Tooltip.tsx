import React, { FC, RefObject } from 'react';

type TooltipProps = {
    elementRef: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
};
const Tooltip: FC<TooltipProps> = ({ children, elementRef }) => {
    return <div>{children}</div>;

};
export default Tooltip;
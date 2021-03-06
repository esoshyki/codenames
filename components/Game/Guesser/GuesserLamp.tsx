import styled from "styled-components";
import { Sides } from "@/types/game";

export enum LampPos {
    left = "left",
    right = "right",
    top = "top",
    bottom = "bottom"
}

const GuesserLampWrapper = styled.div`
    position: absolute;
    height: 36px;
    width: 18px;
    background-size: cover;
`;

interface GuesserLampProps {
    position: LampPos;
    start: Sides,
}

const GuesserLamp = ({ position, start }: GuesserLampProps) => {

    const getBackgroundImage = () => {
        switch (start) {
            case Sides.red:
                return `url(/images/Red_lamp.png)`;
            case Sides.blue:
                return `url(/images/Blue_lamp.png)`;
            default:
                return ""
        }
    };

    const getPosition = (): {
        left: number | string;
        top: number | string;
    } => {
        switch (position) {
            case LampPos.right:
                return {
                    left: 187,
                    top: "calc(50% - 18px)"
                };

            case LampPos.bottom:
                return {
                    left: "calc(50% - 9px)",
                    top: 178
                };

            case LampPos.top:
                return {
                    left: "calc(50% - 9px)",
                    top: 2
                };

            default:
                return {
                    left: 10,
                    top: "calc(50% - 18px)"
                };
        }
    };

    const getTransfrom = () => {
        switch (position) {
            case LampPos.top:
                return "rotate(90deg)";
            case LampPos.right:
                return "rotate(180deg)";
            case LampPos.bottom:
                return "rotate(270deg)";
            default:
                return "none";
        }
    };

    return (
        <GuesserLampWrapper
            style={{
                backgroundImage: getBackgroundImage(),
                left: getPosition().left,
                top: getPosition().top,
                transform: getTransfrom()
            }}
        />
    );
};

export default GuesserLamp;

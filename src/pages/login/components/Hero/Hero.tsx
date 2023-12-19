import { FC, useEffect, useState } from "react";
import { assets } from "../../../../utils/assetsManager";

const xOffset = 590;

export const Hero: FC = () => {
    const [coordinates, setCoordinates] = useState(() => ({
        x: 0,
        y: 0,
        rotateDegree: 0,
    }));
    const handleParallax = (e: MouseEvent) => {
        if (e.clientX <= xOffset) { return; }
        const x = (e.clientX - xOffset) - (window.innerWidth - xOffset) / 2;
        const newCoordinates = {
            x,
            y: e.clientY - window.innerHeight / 2,
            rotateDegree: x / ((window.innerWidth - xOffset) / 2) * 20,
        };
        setCoordinates(newCoordinates);
        const parallaxElements = document.querySelectorAll(".parallax");
        parallaxElements.forEach((element) => {
            const speedX = (element as HTMLElement).dataset.speedx as string;
            const speedY = (element as HTMLElement).dataset.speedy as string;
            const speedZ = (element as HTMLElement).dataset.speedz as string;
            const rotation = (element as HTMLElement).dataset.rotation as string;
            const zValue = e.clientX - parseFloat(getComputedStyle((element as HTMLElement)).left);
            const isLeft = (element as HTMLElement).dataset.isleft as string;
            (element as HTMLElement).style.transform =
                `translateX(calc(-50% + ${-newCoordinates.x * (+speedX)
                }px)) translateY(calc(-50% + ${newCoordinates.y * (+speedY)
                }px)) perspective(2300px) translateZ(${+speedZ * (+isLeft) * 1 * zValue}px) rotateY(${newCoordinates.rotateDegree * (+rotation)}deg)`;
        });
    };
    useEffect(() => {
        window.addEventListener("mousemove", handleParallax);
        return () => window.removeEventListener("mousemove", handleParallax);
    }, []);
    return (
        <div className="hero hero-login">
            <img
                src={assets.hero.bg}
                alt="computer"
                className="bg"
            />
            <img
                data-speedx="0.02"
                data-speedy="0.026"
                data-speedz="0.04"
                data-isleft="-1"
                data-rotation="0.02"
                src={assets.hero.calendar}
                alt="calendar"
                className="parallax calendar"
            />
            <img
                data-speedx="0.018"
                data-speedy="0.026"
                data-speedz="0.04"
                data-isleft="1"
                data-rotation="0.02"
                src={assets.hero.charts}
                alt="calendar"
                className="parallax charts"
            />
        </div>
    );
};

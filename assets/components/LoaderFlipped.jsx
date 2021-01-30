import React from "react";
import { Flipped } from "react-flip-toolkit";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { shuffle } from "../functions/functions";



const LoaderFlipped = ({ setKey, onDelayedAppear, onExit }) => {
    const keyH = shuffle([150, 200, 300, 400])[0]
    //@ts-ignore
    return <SkeletonTheme color="#e9e6e6">
        <p>
            <Flipped
                stagger
                onAppear={onDelayedAppear}
                onExit={onExit}
                flipId={`imagekey-${setKey}`}>
                {/* @ts-ignore */}
                <Skeleton height={keyH} />
            </Flipped>
        </p>
    </SkeletonTheme>;
}

export default LoaderFlipped
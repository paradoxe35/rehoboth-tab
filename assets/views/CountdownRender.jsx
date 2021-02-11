import React, { useCallback, useState } from "react"
import Countdown from 'react-countdown';


export const useCountdownDone = (initialReadyValue) => {
    const [isReady, setIsReady] = useState(initialReadyValue || false)
    const handleComplete = useCallback(() => setIsReady(true), [setIsReady])

    return {
        isReady,
        handleComplete
    }
}


const CountdownRow = ({ amount, title }) => {
    return <>
        <div className="col-3 text-center mb-4 mb-sm-0">
            <h6 className="h4 mb-2"><b>{amount}</b>&nbsp;</h6>
            <span className="text-muted">{title}</span>
        </div>
    </>
}


const rendererCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (!completed) {
        return <>
            <div className="row justify-content-between align-items-center">
                <CountdownRow amount={days} title={"Jours"} />
                <CountdownRow amount={hours} title={"Heures"} />
                <CountdownRow amount={minutes} title={"Minutes"} />
                <CountdownRow amount={seconds} title={"Secondes"} />
            </div>
        </>;
    }
};


const CountdownRender = ({ isReady, handleComplete, date }) => {
    return !isReady ?
        // @ts-ignore
        <Countdown
            onComplete={handleComplete}
            renderer={rendererCountdown}
            date={date}
        /> : null
}

export default CountdownRender
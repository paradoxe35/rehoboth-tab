import React, { useEffect } from 'react'
import AddressText from '/@/components/AddressText';
import Card from '/@/components/Card'
import ScrollIntoViewLink from '/@/components/ScrollIntoViewLink';
import { timeWithNoSeconds } from '/@/functions/functions';
import { loadScript } from '/@/functions/loadedScripts';


const AddToCalendar = ({ event, startdatetime, enddatetime }) => {
    useEffect(() => {
        // @ts-ignore
        loadScript('https://addevent.com/libs/atc/1.6.1/atc.min.js', () => addeventatc.generate())
    }, [])

    return <div title="Add to Calendar" className="addeventatc">
        Ajouter au calendrier
        <span className="invisible start">{startdatetime}</span>
        <span className="invisible end">{enddatetime}</span>
        <span className="invisible title">{event.name}</span>
        <span className="invisible status">CONFIRMED</span>
        <span className="invisible description">{event.description}</span>
        <span className="invisible location"><AddressText address={event.address} /></span>
    </div>
}

const MetaDetailsEvent = ({ event }) => {
    console.log(event);

    const startdatetime = `${event.start_date} ${timeWithNoSeconds(event.start_time)}`
    const enddatetime = `${event.end_date} ${timeWithNoSeconds(event.end_time)}`

    return <div className="sticky-top sticky-sidebar" style={{ top: "35px" }}>
        <Card>
            <h6>Date et l'heure</h6>
            <div className="text-muted text-xs">
                <p className="mb-1">
                    {startdatetime} – <br />
                    {enddatetime}
                </p>
                <AddToCalendar event={event} startdatetime={startdatetime} enddatetime={enddatetime} />
            </div>

            <h6 className="mt-4">Emplacement</h6>
            <p className="text-muted mb-1 text-xs">
                <AddressText br={true} address={event.address} />
                {event.address.map && (
                    <ScrollIntoViewLink elTarget="#view-map">
                        <span>Voir la carte</span>
                    </ScrollIntoViewLink>
                )}
            </p>
        </Card>

        <Card cardClass="mt-3">
            
        </Card>
    </div>
}

export default MetaDetailsEvent
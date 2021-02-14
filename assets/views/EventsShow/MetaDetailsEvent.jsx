import React, { useEffect } from 'react'
import FetchProfile from '../FetchProfile';
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
        {event?.organizer?.name && <span className="invisible organizer">{event?.organizer?.name}</span>}
        {event?.organizer?.email && <span className="invisible organizer_email">{event?.organizer?.email}</span>}
        <span className="invisible description">{event.description}</span>
        <span className="invisible location"><AddressText address={event.address} /></span>
    </div>
}

const datetime = (date, time) => `${date} ${timeWithNoSeconds(time)}`

const MetaDetailsEvent = ({ event }) => {

    const startdatetime = datetime(event.start_date, event.start_time)
    const enddatetime = datetime(event.end_date, event.end_time)

    const schedules = event.schedules
    const organizers = event.organizers

    return <div className="sticky-top sticky-sidebar" style={{ top: "35px" }}>
        <Card>
            <h6>Date et l'heure</h6>
            <div className="text-muted text-xs">
                <p className="mb-2">
                    {startdatetime} – {enddatetime}
                </p>
                <AddToCalendar event={event} startdatetime={event.start_datetime} enddatetime={event.end_datetime} />
            </div>

            <h6 className="mt-4">Emplacement</h6>
            <p className="text-muted mb-2 text-xs">
                <AddressText br={true} address={event.address} />
                {event.address.map && (
                    <ScrollIntoViewLink elTarget="#view-map">
                        <span>Voir la carte</span>
                    </ScrollIntoViewLink>
                )}
            </p>
        </Card>

        <Card cardClass="mt-3">
            {!!schedules.length && (
                <>
                    <h6>Programmes</h6>
                    <div className="text-muted text-xs">
                        {schedules.map(sh => {
                            return <>
                                <span><b>{sh.title}</b></span>
                                <p className="mb-2">
                                    {datetime(sh.start_date, sh.start_time)} –  {datetime(sh.end_date, sh.end_time)}
                                </p>
                            </>
                        })}
                    </div>
                </>
            )}

            {!!organizers.length && (
                <>
                    <h6 className={!schedules.length ? '' : 'mt-4'}>Organisateurs</h6>
                    <div className="text-xs">
                        {organizers.map(o => {
                            return <p>
                                <FetchProfile name={o.name} />
                            </p>
                        })}
                    </div>
                </>
            )}
        </Card>
    </div>
}

export default MetaDetailsEvent
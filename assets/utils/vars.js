export const modalItemsUpdatedEvent = "modalItemsUpdated";

export const openModalEvent = "openModal";

export const routeFromChildEvent = "routeFromChild";

// @ts-ignore
export const GOOGLE_API_KEY =
    process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_GOOGLE_API_KEY
        : process.env.MIX_GOOGLE_API_KEY;

export const embedGoogleMap = (lat, lng, apiKey = GOOGLE_API_KEY) =>
    `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d821.3952589102082!2d28.871806153415914!3d-2.504710454811249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMzAnMjAuMiJTIDI4wrA1MSczMy44IkU!5e1!3m2!1sen!2srw!4v1729751754692!5m2!1sen!2srw`;

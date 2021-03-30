export const modalItemsUpdatedEvent = "modalItemsUpdated"

export const openModalEvent = "openModal"

export const routeFromChildEvent = "routeFromChild"

// @ts-ignore
export const GOOGLE_API_KEY = process.env.NODE_ENV === "development" ? import.meta.env.VITE_GOOGLE_API_KEY : process.env.MIX_GOOGLE_API_KEY

export const embedGoogleMap = (lat, lng, apiKey = GOOGLE_API_KEY) => `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat}, ${lng}&zoom=18&language=fr`
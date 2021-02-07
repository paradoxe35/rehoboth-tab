import axios, { Api } from './axios'
import { Notifier } from '/@/utils/notifier'
import { HtmlAlert } from '/@/utils/dom'


export const setI18nLanguage = (lang) => {
    axios.defaults.headers.common['CLIENT-LANG'] = lang
    document.querySelector('html').setAttribute('lang', lang)
}

setI18nLanguage(document.querySelector('html').getAttribute('lang'))


export const getLocaleTz = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export const setTz = ($tz = null) => {
    try {
        const tz = $tz || getLocaleTz();
        axios.defaults.headers.common['CLIENT-TZ'] = tz
    } catch (error) {
        console.error(error)
    }
}
setTz()


/**
 * @param { { response?:import('axios').AxiosResponse } } error 
 * @param { boolean } mustNotifierErrors 
 * @param { number } reloadStatus 
 */
export const errorResponse = (error, mustNotifierErrors = false, reloadStatus = 0) => {
    if (error.response) {
        !!reloadStatus && error.response.status === reloadStatus && window.location.reload()
        mustNotifierErrors && Notifier.error(HtmlAlert.message(error.response.data), 7000);
    }
    return Promise.reject(error.response ? error.response.data : error)
}

/**
 * @param {string} method 
 * @param {string} url 
 * @param { FormData | Object } datas 
 * @param { boolean } [mustNotifierErrors=true] 
 * @param { number } [reloadStatus=0]
 * @returns { Promise<import('axios').AxiosResponse<any>> }
 */
export const ApiRequest = async (method = 'get', url, datas = {}, mustNotifierErrors = true, reloadStatus = 0) => {
    try {
        return await Api[method.toLowerCase()](url, datas)
    } catch (error) {
        // @ts-ignore
        return errorResponse(error, mustNotifierErrors, reloadStatus)
    }
}



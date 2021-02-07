import axios from 'axios'


/**
 * @param {string} method 
 * @param {string | import('ziggy-js').Router} url 
 * @param { FormData | Object } datas 
 * @returns { Promise<import('axios').AxiosResponse<any>> }
 */
export const ApiRequestAxios = async (url, method = 'get', datas = {}) => {
    try {
        return await Api[method.toLowerCase()](url, datas)
    } catch (error) {
        // @ts-ignore
        return Promise.reject(error.response ? error.response.data : error)
    }
}

const params = {
    timeout: 300 * 1000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
}

export const Axios = axios.create(params);
export const AxiosAdmin = axios.create(params);

export class Api {

    static get Axs() {
        return Axios
    }

    static async get(url, config = {}) {
        try {
            const res = this.Axs.get(url, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * 
     * @param {*} url 
     * @param {*} datas 
     * @param {import('axios').AxiosRequestConfig} config 
     */
    static async post(url, datas = {}, config = {}) {
        try {
            const res = this.Axs.post(url, datas, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static async delete(url, config = {}) {
        try {
            const res = this.Axs.delete(url, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static toObject(datas) {
        let $datas = {};
        if (datas instanceof FormData) {
            datas.forEach((value, key) => ($datas[key] = value))
        } else {
            $datas = { ...datas }
        }
        return $datas;
    }

    static async put(url, datas = {}, config = {}) {
        const $datas = this.toObject(datas)
        try {
            const res = this.Axs.put(url, $datas, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static async patch(url, datas = {}, config = {}) {
        const $datas = this.toObject(datas)
        try {
            const res = this.Axs.patch(url, $datas, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }
        return text.replace(/[&<>"']/g, (m) => {
            return map[m]
        })
    }

}

export class ApiAdmin extends Api {
    static get Axs() {
        return AxiosAdmin
    }
}


export default axios
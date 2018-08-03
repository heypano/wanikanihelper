import service from '../util/service';

/**
 * Service to get the list of radicals learned by user with apiKey on wanikani
 * @param {string} apiKey
 * @returns {Promise<Response>}
 */
export function getRadicals(apiKey){
    return service.get(`https://www.wanikani.com/api/user/${apiKey}/radicals/`);
}

export default {
    getRadicals: getRadicals
}

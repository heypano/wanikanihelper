/**
 * Return items that have user specific information defined and
 * The user has gotten the meaning correct at least once
 * @param item
 * @returns {boolean}
 */
// TODO make mapping between filters and their names in extra layer
function meaningCorrectAtLeastOnce(item){
    return !!(item.user_specific && item.user_specific.meaning_correct > 0);
}

/**
 * Has the user unlocked this item
 * @param item
 * @returns {boolean}
 */
function userHasUnlocked(item) {
    return !!item.user_specific;
}

/**
 * Default method for include style filters
 * @param item
 * @returns {boolean}
 */
function includeThis(item){
    return true;
}

/**
 * Method to exclude enlightened items
 * @param item
 * @returns {boolean}
 */
function excludeEnlightened(item){
    const hasUnlocked = userHasUnlocked(item);
    if(!hasUnlocked){
        // An item is not enlightened if it is not unlocked
        return true;
    } else {
        return item.user_specific.srs !== "enlighten";
    }
}

/**
 * Method to exclude guru items
 * @param item
 * @returns {boolean}
 */
function excludeGuru(item){
    const hasUnlocked = userHasUnlocked(item);
    if(!hasUnlocked){
        // An item is not guru if it is not unlocked
        return true;
    } else {
        return item.user_specific.srs !== "guru";
    }
}

/**
 * Method to exclude apprentice items
 * @param item
 * @returns {boolean}
 */
function excludeApprentice(item){
    const hasUnlocked = userHasUnlocked(item);
    if(!hasUnlocked){
        // An item is not apprentice if it is not unlocked
        return true;
    } else {
        return item.user_specific.srs !== "apprentice";
    }
}

/**
 * Method to exclude master items
 * @param item
 * @returns {boolean}
 */
function excludeMaster(item){
    const hasUnlocked = userHasUnlocked(item);
    if(!hasUnlocked){
        // An item is not master if it is not unlocked
        return true;
    } else {
        return item.user_specific.srs !== "master";
    }
}

/**
 * Method to exclude burned items
 * @param item
 * @returns {boolean}
 */
function excludeBurned(item){
    const hasUnlocked = userHasUnlocked(item);
    if(!hasUnlocked){
        // An item is not burned if it is not unlocked
        return true;
    } else {
        // Only include not burned items
        return !item.user_specific.burned;
    }
}

function defaultFiltersConfig () {
    return {
        "Apprentice": {
            filterName: "Apprentice",
            filterMethodOff: excludeApprentice,
            filterMethodOn: includeThis,
            value: true,
            cssClass: "apprentice",
            category: "Item Status",
            type: "FilterCheckbox"
        },
        "Guru": {
            filterName: "Guru",
            filterMethodOff: excludeGuru,
            filterMethodOn: includeThis,
            value: true,
            cssClass: "guru",
            category: "Item Status",
            type: "FilterCheckbox"
        },
        "Master": {
            filterName: "Master",
            filterMethodOff: excludeMaster,
            filterMethodOn: includeThis,
            value: true,
            cssClass: "master",
            category: "Item Status",
            type: "FilterCheckbox"
        },
        "Enlightened": {
            filterName: "Enlightened",
            filterMethodOff: excludeEnlightened,
            filterMethodOn: includeThis,
            value: true,
            cssClass: "enlightened",
            category: "Item Status",
            type: "FilterCheckbox"
        },
        "Burned": {
            filterName: "Burned",
            filterMethodOff: excludeBurned,
            filterMethodOn: includeThis,
            value: true,
            cssClass: "burned",
            category: "Item Status",
            type: "FilterCheckbox"
        }
    }
}

/**
 * Return a method that checks an item against a bunch of filters
 * @param filters - The configuration for the filters - similar to defaultFiltersConfig
 * @returns {function(*=): boolean}
 */
function getCombinedFilterFunction(filters){
    const filterMethod = function (item) {
        let shouldKeep = userHasUnlocked(item); // Keep everything the user has unlocked

        const filterKeys = Object.keys(filters);
        // Run the item through each filter
        // Break out when we find false
        for(let i = 0; i < filterKeys.length; i++){
            if(!shouldKeep){
                break;
            }
            const key = filterKeys[i];
            const filterData = filters[key];
            const {value, filterMethodOff, filterMethodOn} = filterData;
            const methodToUse = value ? filterMethodOn : filterMethodOff;
            shouldKeep = methodToUse(item);
        }
        return shouldKeep;
    };
    return filterMethod;
}

export {
    meaningCorrectAtLeastOnce as meaningCorrectAtLeastOnce,
    includeThis as includeThis,
    userHasUnlocked as userHasUnlocked,
    excludeEnlightened as excludeEnlightened,
    excludeGuru as excludeGuru,
    excludeApprentice as excludeApprentice,
    excludeMaster as excludeMaster,
    excludeBurned as excludeBurned,
    defaultFiltersConfig as defaultFiltersConfig,
    getCombinedFilterFunction as getCombinedFilterFunction
};

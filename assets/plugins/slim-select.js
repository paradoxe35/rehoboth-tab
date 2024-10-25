import SlimSelect from "slim-select";
import "slim-select/styles";

/**
 * @param { HTMLElement|Element } element
 * @param { * } option
 */
export const slim = (element, option = {}) => {
    return new SlimSelect({
        select: element,
        settings: {
            searchPlaceholder: "Recherche",
        },
        ...option,
    });
};

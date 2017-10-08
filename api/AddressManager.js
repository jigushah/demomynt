import _ from 'lodash';

export default class AddressManager {
    static parse = (details) => {
        if (details) {
            const components = {};
            _.forEach(details.address_components, (k1, v1) => {
                _.forEach(k1.types, (k2, v2) => {
                    components[k2] = k1.short_name;
                });
            });
            components.full = details.formatted_address;
            components.lat = details.geometry.location.lat;
            components.long = details.geometry.location.lng;
            return components;
        }
        return {};
    };
}

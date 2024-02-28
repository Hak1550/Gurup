import React from 'react';
import PropTypes from 'prop-types';

export const createPubSub = () => {
    const channels = {};

    const subscribe = (channel, handler) => {
        if (!channels[channel]) {
            channels[channel] = [];
        }
        channels[channel].push(handler);
    };

    const unsubscribe = (channel, handler) => {
        if (!channels[channel]) return;

        const index = channels[channel].lastIndexOf(handler);
        if (index !== -1) {
            channels[channel].splice(index, 1);
        }
    };

    const publish = (channel, ...args) => {
        return channels[channel] ? channels[channel].some(handler => typeof handler(...args) === "boolean") : false;
    };

    return { subscribe, unsubscribe, publish };
};

export const pubsub = createPubSub();
export const DefaultPubSubContext = React.createContext(null);

export const PubSubProvider = (props) => {
    return (
        <DefaultPubSubContext.Provider value={props.pubsub || pubsub}>
            {props.children}
        </DefaultPubSubContext.Provider>
    );
};

PubSubProvider.propTypes = {
    pubsub: PropTypes.shape({
        subscribe: PropTypes.func,
        unsubscribe: PropTypes.func,
        publish: PropTypes.func,
    }),
};

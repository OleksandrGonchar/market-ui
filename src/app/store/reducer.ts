import { actions } from './action';

const InitialsState = {
    collections: []
};

export default function reducer(state = InitialsState, action): any {
    switch(action.type) {
        case actions.updateCollection :
            return {
                ...state,
                collections: action.collections
            }
        default:
            return state;
    }
};
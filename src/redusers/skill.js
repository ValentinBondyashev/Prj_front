let defaultState = {
    skills: [],
    id: []
};

export function skill(state = defaultState, action) {
    switch (action.type) {
        case 'SUCCES_GET_SKILLS':
            return {...state, skills: action.payload};
        case 'SUCCES_PUT_SKILLS':
            return {...state };
        case 'GET_ID_SKILLS':
            return {...state, id: action.payload};
        default:
            return state;
    }
}


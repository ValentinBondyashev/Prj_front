let defaultState = {
    skills: []
};

export function skill(state = defaultState, action) {
    switch (action.type) {
        case 'SUCCES_GET_SKILLS':
            return {...state, skills: action.payload};
        case 'SUCCES_PUT_SKILLS':
            return {...state };
        default:
            return state;
    }
}


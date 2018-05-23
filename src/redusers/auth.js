let defaultState = {
    token: '',
    status: ''
};

export function auth(state = defaultState, action) {
    switch (action.type) {
        case 'CHECK_AUTH':
            return {...state, token: action.payload.token};
        case 'LOGIN_SUCCESS':
            return {...state, token: action.payload.token, status: 'success'};
        case 'LOGIN_ERROR': 
            return {...state, status: 'error'}
        default:
            return state;
    }
}


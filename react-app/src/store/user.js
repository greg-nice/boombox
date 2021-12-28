// ACTIONS

const LOAD_USER = 'user/LOAD_USER';
const REMOVE_USER = 'user/REMOVE_USER';

// ACTION CREATORS

const load = (user) => ({
    type: LOAD_USER,
    user
})

const removeUser = () => ({
    type: REMOVE_USER
})

export const getUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)

    if (response.ok) {
        const user = await response.json();
        dispatch(load(user));
    }
}

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER:
            return { ...action.user }
        default:
            return state;
    }
}


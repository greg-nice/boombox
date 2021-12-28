// ACTIONS

const LOAD_FOLLOWS = 'user/LOAD_FOLLOWS';

// ACTION CREATORS

const load = (follows) => ({
    type: LOAD_FOLLOWS,
    follows
})

// THUNK ACTION CREATORS

export const getFollows = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follows`)

    if (response.ok) {
        const follows = await response.json();
        dispatch(load(follows));
    }
}

// FOLLOWS REDUCER

const initialState = {};

export default function followsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FOLLOWS:
            return { "followers": action.follows.followers, "following": action.follows.following }
        default:
            return state;
    }
}
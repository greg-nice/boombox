// ACTIONS

const LOAD_SUSER_FOLLOWS = 'follows/LOAD_SUSER_FOLLOWS';
const ADD_SUSER_FOLLOWED = 'follows/ADD_SUSER_FOLLOWED';
const REMOVE_SUSER_FOLLOWED = 'follows/REMOVE_SUSER_FOLLOWED';

// ACTION CREATORS

const load = (follows) => ({
    type: LOAD_SUSER_FOLLOWS,
    follows
})

const addFollowed = (followed) => ({
    type: ADD_SUSER_FOLLOWED,
    followed
})

const removeFollowed = (followedId) => ({
    type: REMOVE_SUSER_FOLLOWED,
    followedId
})

// THUNK ACTION CREATORS

// get all of Session user's follows

export const getSuserFollows = () => async (dispatch) => {
    const response = await fetch(`/api/follows/`)

    if (response.ok) {
        const follows = await response.json();
        dispatch(load(follows));
    }
}

// add a user to Session user's following list

export const addSuserFollowed = (followedId) => async (dispatch) => {
    const response = await fetch(`/api/follows/following/${followedId}`, {
        method: 'POST'
    });

    if (response.ok) {
        const followed = await response.json();
        dispatch(addFollowed(followed));
    }
}

// delete a user from Session user's following list

export const deleteSuserFollowed = (followedId) => async (dispatch) => {
    const response = await fetch(`/api/follows/following/${followedId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const followedId = await response.json();
        dispatch(removeFollowed(followedId));
    }
}

// FOLLOWS REDUCER

const initialState = {};

export default function followsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SUSER_FOLLOWS:
            return { "followers": action.follows.followers, "following": action.follows.following }
        case ADD_SUSER_FOLLOWED: {
            const newState = {...state}
            newState.following[action.followed.id] = action.followed
            return newState
        }
        case REMOVE_SUSER_FOLLOWED: {
            const newState = {...state}
            delete newState.following[action.followedId];
            return newState;
        }
        default:
            return state;
    }
}
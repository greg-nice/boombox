// ACTIONS

const LOAD_FOLLOWS = 'user/LOAD_FOLLOWS';

// ACTION CREATORS

const load = (follows) => ({
    type: LOAD_FOLLOWS,
    follows
})

export const getFollows = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follows`)

    if (response.ok) {
        const follows = await response.json();
        dispatch(load(follows));
    }
}
const initialState = {
    USERDETAIL: '',
}

const UserDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user_detail':
            return { ...state, USERDETAIL: action.payload, loading: false };
        default:
            return state;
    }
};

export default UserDetailReducer;
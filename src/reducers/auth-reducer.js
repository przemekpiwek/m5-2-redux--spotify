import reducers from ".";

const initialState = {
  token: null,
  status: "idle",
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

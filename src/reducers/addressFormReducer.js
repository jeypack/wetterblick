
export const initialState = {
  title: "",
  name: {
    vorname: "",
    nachname: "",
  },
  address: {
    strasse: "",
    nummer: "",
    stadt: "",
    land: "",
    plz: "",
  },
};

const immerTaskReducer = (draft, action) => {
  switch (action.type) {
    case "UPDATE_TITLE":
      draft.title = action.value;
      break;
    case "UPDATE_NAME":
      draft.name[action.field] = action.value;
      break;
    case "UPDATE_ADDRESS":
      draft.address[action.field] = action.value;
      break;
    case "UPDATE_VORNAME":
      draft.name.vorname = action.value;
      console.log("UPDATE_VORNAME", draft.name)
      break;
    case "UPDATE_NACHNAME":
      draft.name.nachname = action.value;
      break;
    case "UPDATE_STRASSE":
      draft.address.strasse = action.value;
      break;
    case "UPDATE_NUMMER":
      draft.address.nummer = action.value;
      break;
    case "UPDATE_STADT":
      draft.address.stadt = action.value;
      break;
    case "UPDATE_LAND":
      draft.address.land = action.value;
      break;
    case "UPDATE_PLZ":
      draft.address.plz = action.value;
      break;
    case "RESET":
      draft.title = initialState.title;
      draft.name = initialState.name;
      draft.address = initialState.address;
      break;
    case "RESET_NAME":
      draft.name = {vorname: "", nachname: ""};
      break;
    case "RESET_ADDRESS":
      //draft.address = {strasse: "", nummer: "", stadt: "", land: "", plz: ""};
      draft.address = initialState.address;
      break;
    default:
      break;
  }
};

export default immerTaskReducer;


// standard reducer function for managing form state
/* const taskReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: {
          ...state.name,
          [action.field]: action.value,
        },
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.value,
        },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}; */

import {state} from "./state";

export const getters = {
  location: state => state.location,
  address: state => state.address
}
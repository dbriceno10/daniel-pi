import { connect } from "react-redux";

import Details from "../container";
import { getDetailsAsync, clearDetailsState } from "../../../actions";
import { RootState } from "../../../store";

const mapStateToProps = (state: RootState) => {
  return { pokemon: state.details };
};

export const ProviderDetails = connect(mapStateToProps, {
  getDetails: getDetailsAsync,
  clearDetails: clearDetailsState,
})(Details);

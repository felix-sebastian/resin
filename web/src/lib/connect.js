import { connect } from "react-redux";
import actions from "../actions";
import operations from "../operations";

const allActions = { ...actions, ...operations };

export default (mapStateToProps = null) =>
  connect(
    mapStateToProps,
    dispatch => ({
      actions: Object.keys(allActions).reduce(
        (res, key) => ({
          ...res,
          [key]: function(...args) {
            dispatch(allActions[key](...args));
          }
        }),
        {}
      )
    })
  );

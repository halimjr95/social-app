import { ATTEMPTING, SIGNIN_FAILED, SIGNIN_SUCCESS } from "../actions/types";

import firebase from "../../firebase";

export const signup = ({ name, email, password, avatar }) => {
  console.log(`${email} andddd ${password} andddd ${name} andddd ${avatar}`);

  return dispatch => {
    dispatch({ type: ATTEMPTING });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => handleAccountCreated(dispatch, res.user.uid, name, avatar))
      .catch(error => handleError(dispatch, error.message));
  };
};

const handleError = (dispatch, message) => {
  dispatch({ type: SIGNIN_FAILED, payload: message });
};

const handleAccountCreated = async (dispatch, userId, name, avatar) => {
  console.log(avatar);
  const imageName = `${userId}.jpg`;
  const response = await fetch(avatar);
  const blob = await response.blob();

  var storageRef = firebase.storage().ref();
  var imageRef = storageRef.child("images/avatar.png");

  return imageRef
    .put(blob)
    .then(() => {
      dispatch({ type: SIGNIN_SUCCESS, payload: name });
    })
    .catch(error => {
      console.log(error);
    });
};

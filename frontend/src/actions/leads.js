import axios from "axios";

import { GET_LEADS, DELETE_LEAD, POST_LEAD } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("http://127.0.0.1:8000/api/leads/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`http://127.0.0.1:8000/api/leads/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadDeleted: "Lead Deleted" }));

      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const postLead = (lead) => (dispatch, getState) => {
  axios
    .post(`http://127.0.0.1:8000/api/leads/`, lead, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadCreated: "Lead Created" }));

      dispatch({
        type: POST_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

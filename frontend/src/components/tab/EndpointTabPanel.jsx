import PropTypes from "prop-types";
import { useState } from "react";
import EndpointForm from "../form/Endpoint.Form";

/**
 * EndpointTabPanel propTypes.
 * @param {string} props.aboutQuery
 * @param {React.ReactNode[]} props.inputs
 * @param {Function} props.apiFunction
 */
EndpointTabPanel.propTypes = {
  aboutQuery: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.node).isRequired,
  apiFunction: PropTypes.func.isRequired,
};

/**
 * EndpointTabPanel component.
 * @param {string} props.aboutQuery
 * @param {React.ReactNode[]} props.inputs
 * @param {Function} props.apiFunction
 * @returns {React.ReactNode} EndpointTabPanel component.
 */
function EndpointTabPanel(props) {
  const { aboutQuery, inputs, apiFunction, ...other } = props;

  /* Query response state. */
  const [queryResponse, setQueryResponse] = useState({ text: "", isError: false });

  /** Function to handle submission. */
  async function handleSubmit() {
    try {
      const response = await apiFunction();
      setQueryResponse({ text: JSON.stringify(response, null, 2), isError: false });
    } catch (error) {
      setQueryResponse({ text: error.message, isError: true });
    }
  }

  return (
    <EndpointForm
      aboutQuery={aboutQuery}
      inputs={inputs}
      queryResponse={queryResponse}
      handleSubmit={handleSubmit}
      {...other}
    />
  );
}

export default EndpointTabPanel;

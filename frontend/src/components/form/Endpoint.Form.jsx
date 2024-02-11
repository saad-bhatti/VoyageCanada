import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";

/**
 * EndpointForm propTypes.
 * @param {string} props.aboutQuery
 * @param {React.ReactNode[]} props.inputs
 * @param {Object} props.queryResponse
 * @param {Function} props.handleSubmit
 */
EndpointForm.propTypes = {
  aboutQuery: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.node).isRequired,
  queryResponse: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

/**
 * EndpointForm component.
 * @param {string} props.aboutQuery
 * @param {React.ReactNode[]} props.inputs
 * @param {Object} props.queryResponse
 * @param {Function} props.handleSubmit
 * @returns {React.ReactNode} EndpointForm component.
 */
function EndpointForm(props) {
  const { aboutQuery, inputs, queryResponse, handleSubmit, ...other } = props;

  return (
    <Grid container gap={4} mx="5%" {...other}>
      {/* About query section. */}
      <Grid id="about-section" xs={12} bgcolor="#161b22" borderRadius="5%" px={2} py={2}>
        <Stack gap={2} direction="column">
          {/* About query section title. */}
          <Typography variant="h6" fontWeight="bold">
            About This Query
          </Typography>

          {/* About query section description. */}
          <Typography variant="body1">{aboutQuery}</Typography>
        </Stack>
      </Grid>

      {/* Query input section. */}
      <Grid id="query-section" xs={12} bgcolor="#161b22" borderRadius="5%" px={2} py={2}>
        <Stack gap={2} direction="column">
          {/* Query input section title. */}
          <Typography variant="h6" fontWeight="bold">
            Parameters
          </Typography>

          {/* Inputs. */}
          {inputs.map((input, index) => (
            <div key={index} className="input-wrapper">
              {input}
            </div>
          ))}

          {/* Submit button. */}
          <Button
            type="submit"
            variant="contained"
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            sx={{ width: "fit-content", alignSelf: "flex-end" }}
          >
            Send Query
          </Button>
        </Stack>
      </Grid>

      {/* Query response section. */}
      <Grid id="response-section" xs={12} bgcolor="#161b22" borderRadius="5%" px={2} py={2}>
        <Stack gap={2} direction="column">
          {/* Query response section title. */}
          <Typography variant="h6" fontWeight="bold">
            Response
          </Typography>

          {/* Query response. */}
          <Typography
            variant="body1"
            id="query-response"
            component="pre"
            color={queryResponse.isError ? "red" : "lightgreen"}
          >
            {!queryResponse.text.length ? "No response yet." : queryResponse.text}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default EndpointForm;

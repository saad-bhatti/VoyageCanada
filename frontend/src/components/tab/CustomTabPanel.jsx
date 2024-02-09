import Box from "@mui/material/Box";
import PropTypes from "prop-types";

/**
 * CustomTabPanel propTypes.
 * @param {React.ReactNode} props.children
 * @param {number} props.index
 * @param {number} props.value
 * @param {boolean} props.isVertical
 */
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  isVertical: PropTypes.bool.isRequired,
};

/**
 * CustomTabPanel component.
 * @param {React.ReactNode} props.children
 * @param {number} props.index
 * @param {number} props.value
 * @returns {React.ReactNode}
 */
function CustomTabPanel(props) {
  const { children, value, index, isVertical, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={!isVertical ? `simple-tabpanel-${index}` : `vertical-tabpanel-${index}`}
      aria-labelledby={!isVertical ? `simple-tab-${index}` : `vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;

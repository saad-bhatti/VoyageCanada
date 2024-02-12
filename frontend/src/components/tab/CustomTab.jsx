import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import CustomTabPanel from "./CustomTabPanel";

/**
 * CustomTab propTypes.
 * @param {string[]} props.tabs
 * @param {React.ReactNode[]} props.tabPanels
 * @param {boolean} props.isVertical
 */
CustomTab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabPanels: PropTypes.arrayOf(PropTypes.node).isRequired,
  isVertical: PropTypes.bool.isRequired,
};

/**
 * CustomTab component.
 * @returns {React.ReactNode} CustomTab component.
 */
function CustomTab(props) {
  const { tabs, tabPanels, isVertical, ...other } = props;
  /* Theme. */
  const theme = useTheme();
  /* Header value state. */
  const [headerValue, setHeaderValue] = useState(0);

  /**
   * A11y props.
   * @param {number} index - Index.
   * @returns {object} A11y props.
   */
  function a11yProps(index) {
    return {
      id: !isVertical ? `simple-tab-${index}` : `vertical-tab-${index}`,
      "aria-controls": !isVertical ? `simple-tabpanel-${index}` : `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Stack direction={!isVertical ? "column" : "row"} {...other}>
      {/* Tab headers. */}
      <Stack
        alignItems={!isVertical ? "center" : "flex-start"}
        sx={{
          borderBottom: !isVertical ? 1 : 0,
          borderRight: !isVertical ? 0 : 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          orientation={!isVertical ? "horizontal" : "vertical"}
          value={headerValue}
          onChange={(_event, newHeaderValue) => setHeaderValue(newHeaderValue)}
          aria-label="endpoints"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab}
              {...a11yProps(index)}
              sx={{ fontWeight: "bold", my: !isVertical ? "auto" : "10%" }}
            />
          ))}
        </Tabs>
      </Stack>

      {/* Tab panels. */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={headerValue}
        onChangeIndex={(newHeaderValue) => setHeaderValue(newHeaderValue)}
      >
        {tabPanels.map((tabPanel, index) => (
          <CustomTabPanel key={index} value={headerValue} index={index} isVertical={isVertical}>
            {tabPanel}
          </CustomTabPanel>
        ))}
      </SwipeableViews>
    </Stack>
  );
}

export default CustomTab;

import Box from "@mui/material/Box";
import logo from "../../images/logo.png";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function HomePanel() {
  return (
    <Stack id="HomePanel" gap={4} mx="5%">
      <Stack id="WelcomeSection" gap={2}>
        {/* Welcome message. */}
        <Typography variant="h4" children="Welcome to VoyageCanada!" alignSelf="center" />
        {/* VoyageCanda logo. */}
        <Box component="img" alt="logo" src={logo} width="16%" height="12%" margin="auto" />
      </Stack>

      <Stack id="AboutSection" gap={2}>
        {/* About Section. */}
        <Typography variant="h4" width="fit-content" borderBottom="1px solid white">
          About Us
        </Typography>
        <Typography variant="subtitle1">
          VoyageCanada is your ultimate companion for exploring the diverse wonders of Canada.
          Whether you're embarking on a cross-country adventure or seeking out hidden gems within
          your province, we offer a comprehensive travel platform to facilitate your journey. From
          bustling metropolises to serene natural landscapes, our platform connects you with an
          array of destinations and experiences, ensuring that every step of your Canadian voyage is
          filled with excitement and discovery. Join us as we embark on a journey to uncover the
          beauty and splendor of Canada, one adventure at a time.
        </Typography>
      </Stack>

      <Stack id="ExpectSection" gap={2}>
        {/* Expect Section. */}
        <Typography variant="h4" width="fit-content" borderBottom="1px solid white">
          What to Expect
        </Typography>
        <Typography variant="subtitle1">
          This web application serves as the gateway for users to seamlessly interact with the
          backend API. Designed to streamline your experience, this interface provides a platform
          where you can effortlessly access and manipulate data across various sections of the
          backend, including the user, addresses, flights, and tickets related endpoints.
          <br />
          <br />
          With dedicated tabs for each backend section, navigating through endpoints has never been
          easier. Simply select the desired endpoint, input any necessary arguments, and click "Send
          Query" to initiate a request to the backend server. Upon receiving a response, the
          frontend dynamically displays the backend's output, highlighting success in vibrant green
          and flagging errors in attention-grabbing red.
          <br />
          <br />
          Thank you and we hope you have a fantastic experience using our application.
        </Typography>
      </Stack>
    </Stack>
  );
}

export default HomePanel;

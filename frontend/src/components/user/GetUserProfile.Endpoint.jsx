import { getUserProfile } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetUserProfile component. */
function GetUserProfile() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves the user object of the authenticated client, providing information \
    about the currently logged-in user. Note that you must be authenticated to successfully access \
    this endpoint.";

  /** Function to handle submission. */
  async function apiFunction() {
    return await getUserProfile();
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={[]} apiFunction={apiFunction} />;
}

export default GetUserProfile;

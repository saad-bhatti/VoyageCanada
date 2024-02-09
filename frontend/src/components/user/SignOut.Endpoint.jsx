import { signOut } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** SignOut component. */
function SignOut() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint signs the authenticated client out from their account by deleting the \
    authentication token associated with their session and clearing it from the response cookies. \
    Note that you must be authenticated to successfully access this endpoint.";

  /** Function to handle submission. */
  async function apiFunction() {
    return await signOut();
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={[]} apiFunction={apiFunction} />;
}

export default SignOut;

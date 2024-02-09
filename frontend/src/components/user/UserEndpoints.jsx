import CustomTab from "../tab/CustomTab";
import ChangeContact from "./ChangeContact.Endpoint";
import ChangeEmail from "./ChangeEmail.Endpoint";
import ChangePassword from "./ChangePassword.Endpoint";
import GetUserProfile from "./GetUserProfile.Endpoint";
import SignIn from "./SignIn.Endpoint";
import SignOut from "./SignOut.Endpoint";
import SignUp from "./SignUp.Endpoint";
import ToggleFlightInCart from "./ToggleFlightInCart.Endpoint";

/** UserEndpoints component. */
function UserEndpoints() {
  return (
    <CustomTab
      id="UserEndpoints"
      tabs={[
        "getUserProfile",
        "signUp",
        "signIn",
        "signOut",
        "changeEmail",
        "changePassword",
        "changeContact",
        "toggleFlightInCart",
      ]}
      tabPanels={[
        <GetUserProfile />,
        <SignUp />,
        <SignIn />,
        <SignOut />,
        <ChangeEmail />,
        <ChangePassword />,
        <ChangeContact />,
        <ToggleFlightInCart />,
      ]}
      isVertical={true}
    />
  );
}

export default UserEndpoints;

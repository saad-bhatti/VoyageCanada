import * as UserEndpoints from "../endpoints/User.Endpoints";
import CustomTab from "../tab/CustomTab";

/** UserPanel component. */
function UserPanel() {
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
        <UserEndpoints.GetUserProfile />,
        <UserEndpoints.SignUp />,
        <UserEndpoints.SignIn />,
        <UserEndpoints.SignOut />,
        <UserEndpoints.ChangeEmail />,
        <UserEndpoints.ChangePassword />,
        <UserEndpoints.ChangeContact />,
        <UserEndpoints.ToggleFlightInCart />,
      ]}
      isVertical={true}
    />
  );
}

export default UserPanel;

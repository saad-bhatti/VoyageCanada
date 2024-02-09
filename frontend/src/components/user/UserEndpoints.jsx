import CustomTab from "../tab/CustomTab";

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
        "getUserProfile",
        "signUp",
        "signIn",
        "signOut",
        "changeEmail",
        "changePassword",
        "changeContact",
        "toggleFlightInCart",
      ]}
      isVertical={true}
    />
  );
}

export default UserEndpoints;

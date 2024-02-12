import CustomTab from "../tab/CustomTab";
import * as AddressEndpoints from "../endpoints/Address.Endpoints";

/** AddressPanel component. */
function AddressPanel() {
  return (
    <CustomTab
      id="AddressEndpoints"
      tabs={["getAddressById", "createAddress", "updateAddress", "deleteAddress"]}
      tabPanels={[
        <AddressEndpoints.GetAddressById />,
        <AddressEndpoints.CreateAddress />,
        <AddressEndpoints.UpdateAddress />,
        <AddressEndpoints.DeleteAddress />,
      ]}
      isVertical={true}
    />
  );
}

export default AddressPanel;

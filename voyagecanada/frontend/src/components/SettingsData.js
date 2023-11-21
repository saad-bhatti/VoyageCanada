// Icons to Import
import { CgProfile } from "react-icons/cg";
import { MdSecurity, MdOutlineHistory } from "react-icons/md";
import { IoListCircleSharp } from "react-icons/io5";
import React from "react";

// Data for the each entry
// Display data when page opened
const ProfileData = (
  <div className="Data">
  </div>
);
// Avatar (Display & Change) (optional if have time)

const SecurityData = (
  <div className="Data">
    <p>Change Password</p>
    <p>Deactivate account</p>
  </div>
);
// 2-factor authentication (optional if have time)
// Link to other accounts (optional if have time)

// Display wishlist when page opened
const WishlistData = (
  <div className="Data">
      <p>Move item from wishlist to cart</p>
      <p>Delete item from wishlist</p>  
  </div>
);

// Display paginated history (up to 10) when page opened
const HistoryData = (
  <div className="Data">
    <p>History Page</p>
  </div>
);

// Create an array of JSON objects
export const Entries = [
  {
    header: "profile",
    icon: <CgProfile size={30} />,
    path: "/settings/profile/",
    data: ProfileData
  },
  {
    header: "security",
    icon: <MdSecurity size={30} />,
    path: "/settings/security/",
    data: SecurityData
  },
  {
    header: "wishlist",
    icon: <IoListCircleSharp size={30} />,
    path: "/settings/wishlist/",
    data: WishlistData
  },
  {
    header: "history",
    icon: <MdOutlineHistory size={30} />,
    path: "/settings/history/",
    data: HistoryData
  },
];

export default Entries;

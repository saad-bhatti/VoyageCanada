// Components to Import
import { Link } from "react-router-dom";
import { Entries } from "./SettingsData";
// Styles to Import
import "../style/Sidebar.css";

function Sidebar(props) {
  return (
    <div className="Sidebar">
      <ul className="SidebarContent">
        {Entries.map(function (entry, index) {
          return (
            <Link key={index} to={entry.path} style={{ textDecoration: "none", color: "inherit" }}>
              <li className="SidebarEntry" id={props.header === entry.header ? "current" : ""}>
                <div className="EntryIcon">{entry.icon}</div>
                <div className="EntryName">{entry.header}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;

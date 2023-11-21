// Components to import
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MainPanel from "../components/MainPanel";
// Styles to import
import "../style/App.css";

function SettingsPage(props) {
  let { header } = useParams();
  return (
    <div className="Page">
      <Sidebar header={header}/>
      <MainPanel header={header} email={props.email} contact={props.contact}
                 changeEmail={props.changeEmail} changeContact={props.changeContact} street={props.street}
                 city={props.city} prov={props.prov} postal={props.postal} changeStreet={props.changeStreet}
                 changeCity={props.changeCity} changeProv={props.changeProv}
                 changePostal={props.changePostal}/>
    </div>
  );
}

export default SettingsPage;

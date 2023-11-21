// Components to import
import {Entries} from "./SettingsData";
import ProfileData from "./ProfileData";
import SecurityData from "./SecurityData";
import WishlistData from "./WishlistData";
import HistoryData from "./HistoryData";

// Style to import
import "../style/MainPanel.css"


function MainPanel(props) {
    for (let i = 0; i < Entries.length; i++) {
        if (props.header === "profile") {
            return <div className="MainPanel"><ProfileData email={props.email} contact={props.contact}
                                                           newEmail={props.changeEmail}
                                                           newContact={props.changeContact} street={props.street}
                                                           city={props.city} prov={props.prov} postal={props.postal}
                                                           changeStreet={props.changeStreet}
                                                           changeCity={props.changeCity} changeProv={props.changeProv}
                                                           changePostal={props.changePostal}/></div>;
        } else if (props.header === "security") {
            return <div className="MainPanel"><SecurityData/></div>;
        } else if (props.header === "wishlist") {
            return <div className="MainPanel"><WishlistData/></div>
        } else if (props.header === "history") {
            return <div className="MainPanel"><HistoryData/></div>
        } else if (props.header === Entries[i].header) {
            return <div className="MainPanel">{Entries[i].data}</div>;
        }

    }
    return (
        <div className="MainPanel">
            <h1>Section does not exist.</h1>
        </div>
    );
}

export default MainPanel;

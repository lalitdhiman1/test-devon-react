import React from 'react';
import { connect } from 'react-redux';

import {Link} from "react-router-dom";
function Header(props) {
return (
    <header className="header">
         <div className="count">Count:  {props.contacts.length}</div>
        <Link to="/detail-page/add" className="header__addContact btn btn-primary"><i className="fa fa-plus"></i> Add Contact</Link> 
    </header>
)
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
};


export default connect(mapStateToProps)(Header);
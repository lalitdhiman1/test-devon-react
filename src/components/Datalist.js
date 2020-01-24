import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from '../actions/contactAction';
import { Link } from "react-router-dom";

class Datalist extends Component {

    location(data, index, len) {
        console.log(len)
        return (
            <React.Fragment key={index}>
                {(data.checked) ? <span>{data.name}</span> : ""}
            </React.Fragment>
        )
    }
    listView(data, index) {
        data.count = index;
        console.log(index)
        return (


            <tr key={index}>
                <td> {data.name}</td>
                <td> {data.number}</td>
                <td>{data.email}</td>
                <td> {data.gender}</td>
                <td>{

                    data.location.map((contact, i) => this.location(contact, i, data.location.length))
                }</td>
                <td> <Link to={'/detail-page/edit/' + index} className="btn btn-primary"><i class="fa fa-edit"></i> Edit</Link> </td>
                <td>
                    <button onClick={(e) => this.props.deleteContact(index)} className="btn btn-danger"><i class="fa fa-trash"></i> Remove</button>
                </td></tr>




        )
    }


    render() {

        return (
            <div className="row">
                <div className="col-md-12">
                    {(this.props.contacts.length) ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Phone Number</td>
                                    <td>Email Id</td>
                                    <td>Gender</td>
                                    <td>Locations</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>
                            <tbody  >
                                {this.props.contacts.map((contact, i) => this.listView(contact, i))}
                            </tbody>
                        </table> : <p className="noContact">Please Add Contact</p>}</div></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createContact: contact => dispatch(contactAction.createContact(contact)),
        deleteContact: index => dispatch(contactAction.deleteContact(index))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
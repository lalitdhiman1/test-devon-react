
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from '../../actions/contactAction';
import { Redirect } from "react-router-dom";

import Form from "./Form";

class DetailPage extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      count: 0,
      name: '',
      number: '',
      email: '',
      gender: 'select',
      location: [{ "name": "Bangalore", "value": "bangalore", "checked": false }, { "name": "Mumbai", "value": "mumbai", "checked": false }, { "name": "Delhi", "value": "delhi", "checked": false }],
      submitB: false,
      inputChanged: false,
      editPage: false,
      fields: {},
        errors: {}
    }
  }

  isvalid() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    console.log(fields["name"])
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Required";
      }
    }

    if (!fields["number"]) {
      formIsValid = false;
      errors["number"] = "*Required";
    }

    if (typeof fields["number"] !== "undefined") {
      if (!fields["number"].match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
        formIsValid = false;
        errors["number"] = "*Required";
      }
    }

    if (!fields["gender"]) {
      formIsValid = false;
      errors["gender"] = "*Required.";
    }

    if (typeof fields["gender"] !== "undefined") {
      if (fields["gender"] === "select") {
        formIsValid = false;
        errors["gender"] = "*Required.";
      }
    }

    var isLocation = this.state.location.some(a=> a.checked=== true)
    if(!isLocation){
      formIsValid = false;
      errors["location"] = "*Required.";
    } 


    this.setState({
      errors: errors
    });
    return formIsValid;


  }



  handleChangeCheck(e) {
    var locationArray = this.state.location.filter(loc => loc.value === e.target.value);
    locationArray[0].checked = !locationArray[0].checked;
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value

    this.setState({
      location: this.state.location,
      fields
    })


    if (this.isvalid()) {

      this.setState({
        inputChanged: true
      })
    }
  }


  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value
    this.setState({
      [e.target.name]: e.target.value,
      fields
    }, function () {
      if (this.isvalid()) {

        this.setState({
          inputChanged: true
        })
      }
    })



  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isvalid()) {

      let contact = {
        count: this.state.count,
        name: this.state.name,
        number: this.state.number,
        email: this.state.email,
        gender: this.state.gender,
        location: this.state.location
      }
      if (!this.state.editPage) {
        this.props.createContact(contact);
      } else {
        this.props.editContact(contact, this.state.count);
      }

      this.setState({
        count: 0,
        name: '',
        number: '',
        email: '',
        gender: 'select',
        location: [{ "name": "Bangalore", "value": "bangalore", "checked": false }, { "name": "Mumbai", "value": "mumbai", "checked": false }, { "name": "Delhi", "value": "delhi", "checked": false }],
        submitB: true,
        fields:{}
      });

    }
  }


  componentDidMount() {
    let getId = window.location.pathname.split("detail-page/edit/");
    getId = getId[1];
    if (getId >= 0) {
      const getData = this.props.contacts.filter(data => data.count === getId);
       getData.map(a => {
        return this.setState({
          count: a.count,
          name: a.name,
          number: a.number,
          email: a.email,
          gender: a.gender,
          location: a.location,
          inputChanged: false,
          editPage: true,
          fields:{
            name: a.name,
            number: a.number,
            email: a.email,
            gender: a.gender,
            location: a.location
          }
        })
      })

    }
  }
   
  render() {


    if (this.state.submitB) {
      return <Redirect to='/' />
    }

    return (
      <div className="container">
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          location={this.state.location}
          handleChangeCheck={this.handleChangeCheck}
          inputChanged={this.state.inputChanged}
          errors={this.state.errors}
          name={ this.state.name}
          number={ this.state.number}
          email={ this.state.email}
          gender={ this.state.gender}
          editPage={ this.state.editPage}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    editContact: (contact, index) => dispatch(contactAction.editContact(contact, index)),
    deleteContact: index => dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
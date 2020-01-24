
import React from 'react';
 
function Form(props) {
  
  
  const onChange = (e)=>{
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      props.handleChange(e);
    }
 }
return (
   <div className="container">
<form onSubmit={props.handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input data-testid="name" type="text" onChange={props.handleChange} name="name" id="name" className="form-control" value={props.name}/>
<span className="error">{props.errors.name}</span>
    </div>
    <div className="form-group">
      <label htmlFor="number">Phone Number</label>
      <input type="text" maxLength={10}  onChange={(e)=>onChange(e)} name="number" id="number" className="form-control" value={props.number}/>
      <span className="error">{props.errors.number}</span>
    </div>
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input type="text" onChange={props.handleChange} name="email" id="email" className="form-control" value={props.email}/>
      <span className="error">{props.errors.email}</span>
    </div>
    <div className="form-group">
      <label htmlFor="gender">Gender</label>
      <select className="form-control" id="gender" name="gender" onChange={props.handleChange} value={props.gender}>
        <option value="select">Select</option>
        <option value="male">Male</option>
        <option  value="female">Female</option>
      </select>
      <span className="error">{props.errors.gender}</span>

    </div>
    <div className="form-group">
    <label>Locations</label>
      {
        props.location.map((loc, i)=>{
          return (
            <React.Fragment key={i}>
          <div className="locationName">
          <input type="checkbox" name={loc.value} checked={loc.checked} value={loc.value} onChange={props.handleChangeCheck} />
          <label htmlFor={loc.value}>{loc.name}</label>
          </div>
          </React.Fragment>
          )
        })
      }
            <span className="error">{props.errors.location}</span>

    </div>
    <div className="form-group">
    <button  disabled={!props.inputChanged} type="submit" className="btn btn-primary">Submit</button>

    </div>
  </form>
  </div>
)
}
  
  export default Form;

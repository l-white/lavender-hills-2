import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ParagraphStyle = styled.p`
  max-width: 750px;
`;

const LabelStyle = styled.label`
  font-size: 1.2em;
`;

const InputStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "5px",
  width: "300px",
  height: "30px",
  fontFamily: "Arial",
  border: "2px dashed #000080",
  textAlign: "center",
};

const TextAreaStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "5px",
  width: "300px",
  height: "200px",
  fontFamily: "Arial",
  border: "2px dashed #000080",
  textAlign: "center",
}

const ButtonStyle = {
  backgroundColor: "#000080",
  color: "white",
  width: "200px",
  height: "50px",
  borderRadius: "25px",
  marginTop: "10px",
  border: "1px solid white",
  fontFamily: "Arial",
  fontWeight: "bold",
  fontSize: "20px",
}

class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }
  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST",
      url:"http://localhost:3002/",
      data:  this.state,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        data: this.state
      })
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  resetForm(){
    this.setState({name: '', email: '', message: ''})
  }

  render() {
    return(
      
      <>
        <p><ParagraphStyle>Let us help you find your next home! Even if you don't see an apartment here that fits your needs, you can contact us, and we'll connect you with one of our partners.</ParagraphStyle></p>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
              <label htmlFor="name"><LabelStyle>Name:</LabelStyle></label>
              <input 
                style={InputStyle}
                type="text" 
                className="form-control" 
                id="name" 
                value={this.state.name} 
                onChange={this.onNameChange.bind(this)} 
              />
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1"><LabelStyle>Email address:</LabelStyle></label>
              <input 
                style={InputStyle}
                type="email" 
                className="form-control" 
                id="email" 
                aria-describedby="emailHelp" 
                value={this.state.email} 
                onChange={this.onEmailChange.bind(this)} 
              />
          </div>
          <div className="form-group">
              <label htmlFor="message"><LabelStyle>Message:</LabelStyle></label>
              <textarea 
                style={TextAreaStyle}
                className="form-control" 
                id="message" 
                value={this.state.message} 
                onChange={this.onMessageChange.bind(this)} 
              />
          </div>
          <button style={ButtonStyle} type="submit" className="btn btn-primary">Submit</button>
        </form>
      </>
    );
  }

  onNameChange(event) {
	  this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	  this.setState({email: event.target.value})
  }

  onMessageChange(event) {
	  this.setState({message: event.target.value})
  }
}

export default ContactForm;
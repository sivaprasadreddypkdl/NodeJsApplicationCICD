import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import {baseURL} from '../Config';
import { Button, notification } from 'antd';
import 'antd/dist/antd.css';


import './loginPage.css';

class LoginPage extends React.Component {
    constructor(){
        super();
        this.state = {
            username:"",
            password:"",
            loading:false
        }
        this.changeData = this.changeData.bind(this);
        this.submit = this.submit.bind(this);
        this.validator = new SimpleReactValidator();
    }

    changeData(type,event){
        if(type === "password"){
            this.setState({password:event.target.value});
        } else {
            this.setState({username:event.target.value})
        }
    }

    submit(event) {
        event.preventDefault();
        if( this.validator.allValid() ){
            var self = this;
            this.setState({loading:true})
            //TODO
                //sessionStorage.setItem("username", this.state.username);
                //this.props.history.push({pathname: '/home',state: { username: this.state.username,user_id:"0" }});
            //TODO
            axios.post(baseURL+"/authenticate", 
                        { username: this.state.username,
                          password: this.state.password
                        }
                       ).then( (response)=> {
                                this.setState({loading:false})
                                console.log(response.data);
                                var responseData = response.data;
                                if(responseData.status ==1){
                                    if(responseData.error){
                                    notification.open({
                                        message: 'alert',
                                        description: 'Wrong user name or password',
                                    });
                                   }
                                }
                                if(responseData.status == 0){
                                    if(responseData.result.status = 1){
                                        sessionStorage.setItem("username", this.state.username);
                                        sessionStorage.setItem("user_id", responseData.result.user_id);
                                        this.props.history.push({pathname: '/home',state: { username: this.state.username,user_id:responseData.result.user_id }})
                                    }
                                    else{
                                        notification.open({
                                        message: '',
                                        description: "user don't have access",
                                    });
                                    }
                                    
                                }
                        }).catch((error)=> {
                            console.log(error);
                            this.setState({loading:false})
                            notification.open({
                                        message: '',
                                        description: "Unable to connect !!!",
                                    });
                            
                        });
                        
          
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render(){
        return(
            <div>
                
        <Card className="login-form">
         <CardContent>
             <img className ="loginLogo" src="Lamborghini.jpg" alt="Smiley face" height="100" width="100"/>
          <form className="form-style">
                <div className="form-group">
                    <label >username</label>
                    <input type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                    onChange ={this.changeData.bind(this,'username')} />
                    {this.validator.message('username', this.state.username, 'required', 'text-danger')}
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    onChange ={this.changeData.bind(this,'password')} />
                    {this.validator.message('password', this.state.password, 'required', 'text-danger')}

                </div>
                <Button type="primary" block loading={this.state.loading} onClick={this.submit}>
          Submit
        </Button>
                
          </form>
          </CardContent>
        </Card>
        </div>
        )
    }
}

export default LoginPage;



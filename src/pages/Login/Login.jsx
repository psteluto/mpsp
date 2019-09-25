import React from 'react';
import {Button, Col, Row, Input, Icon, message} from 'antd';
import appStyle from './Login.module.scss';
import logo from '../../images/logo-mpsp.png'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            senha: '',
        };
    }

    login (login, senha){
        if(login == "paloma" && senha == "paloma"){
            this.props.history.push('/home')
        }else{
            message.error('Usuário ou senha incorretos');
        }
    }

    render() {
        return (
        <div className={appStyle.fundo}>
            <div className={appStyle.login}>
                <Row className={appStyle.logo}>
                    <img style={{width: "50%"}} alt={"picture"} src={logo} />    
                </Row>
                <div className={appStyle.campos}>
                    <Row>
                        <Col>
                            <b>Bem-vindo</b>
                        </Col>                    
                    </Row>
                    <Row>
                        <Col>
                            <Input placeholder={"Usuário"} onChange={(value) => this.setState({login: value.target.value})} prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="user" />}></Input>        
                        </Col>                    
                    </Row>
                    <Row>
                        <Col >
                            <Input.Password placeholder={"Senha"} onChange={(value) => this.setState({senha: value.target.value})} prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }}type="lock" />}></Input.Password>
                        </Col>        
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={()=> this.login(this.state.login, this.state.senha)} style={{width:"100%"}} type="primary">Entrar</Button>
                        </Col>
                    </Row>
                </div>                
            </div>
        </div>
        );        
    }
}

export default Login;

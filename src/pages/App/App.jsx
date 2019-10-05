import React from 'react';
import Axios from 'axios';
import { Avatar, Button, Card, Col, Collapse, Icon, Input, message, Row, Select, Popconfirm, Tooltip, Typography } from 'antd';
import appStyle from './App.module.scss';
import logo from '../../images/logo-mpsp.png'

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;
const {Panel} = Collapse;
const {Text} = Typography;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            tipoFiltro: "cpf",
            pessoaSelecionada: {},
            rg: "",
            cpfCnpj: "",
            numProcesso: "",
            pis: "",
            pessoa: {}
        };
    }

    cadastrarBusca(rg, cpfCnpj, numProcesso, pis) {
        var json = {
            rg,
            cpfCnpj,
            numProcesso,
            pis,
        }

        if(!cpfCnpj){
            message.error('Informar o CPF/CNPJ!!!!')
        }else{
            Axios.post("https://127.0.0.1:9090/solicitacoes/registrarSolicitacao", {json}).then(()=> {message.success('Busca cadastrada com sucesso!')}).catch(() => {message.error('Não foi possível cadastrar, por favor tente mais tarde!')})
        }
        
    };  

    buscar(tipoFiltro, value) {
        Axios.get("127.0.0.1:9090/solicitacoes/buscarSolicitacoes", {params : {tipoFiltro: tipoFiltro, value: value}}).then((response)=> {this.setState({pessoa : response.data})}).catch(() => {})
    }

    getRelatorio(pessoaSelecionada) {
        alert("Relatório");
    }

    confirmar(){
        this.props.history.push('/')
    }

    getAvatar(nome){
        nome = "Paloma";
        return nome.charAt(0);
    }

    habilitarSelect(pessoa){
        pessoa = "Concluido";
        if(pessoa === "Concluido"){
            this.getRelatorio(this.state.pessoa)
        }else{
            message.error('Essa busca ainda não foi concluída, tente novamente mais tarde')
        }
    }

    render() {
        const { current } = this.state;
        const firstStep = current === 0;
        return (
            <>
            <header className={appStyle.header}>
                <img style={{width: "18%"}} alt={"picture"} src={logo}/>
                <Popconfirm
                    placement="bottomRight"
                    title="Deseja sair?"
                    onConfirm={() => this.confirmar()}
                    okText="Sim"
                    cancelText="Não"
                >
                    <Avatar style={{backgroundColor: '#000'}}>{"PS"}</Avatar>
                </Popconfirm>
            </header>
            <div className={appStyle.steps}>
                        <div>
                            <div>
                                <Row>
                                    <Col span={12} offset={6}>
                                        <Collapse className={appStyle.collapse} bordered={false}>
                                            <Panel header="Buscar uma pessoa existente" key="1">
                                            {<Search addonBefore={
                                                <Select defaultValue="cpf"
                                                    onChange={(value) => this.setState({ tipoFiltro: value })}>
                                                    <Option value="cpf">CPF</Option>
                                                    <Option value="rg">RG</Option>
                                                </Select>
                                            } enterButton="Buscar"                                        
                                                onSearch={(value) => this.buscar(this.state.tipoFiltro, value)}
                                            />}
                                            </Panel>
                                            
                                            <Panel header="Cadastrar uma busca" key="2">
                                            {<>
                                                <Input className={appStyle.input} placeholder="RG" onChange={(e) => {this.setState({rg: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="CPF/CNPJ" onChange={(e) => {this.setState({cpfCnpj: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="Nome" onChange={(e) => {this.setState({nome: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="Número Processo - ARPENSP" onChange={(e) => {this.setState({numProcesso: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="PIS - Trabalhador" onChange={(e) => {this.setState({pis: e.target.value})}}/>
                                                <Button type="primary" style={{ float: "right", marginTop: "10px", marginBottom: "10px"}} onClick={() => this.cadastrarBusca(this.state.rg, this.state.cpfCnpj, this.state.nome, this.state.numProcesso, this.state.pis)}>Cadastrar busca</Button>
                                            </>}
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                {
                                    !this.state.pessoa &&
                                    (
                                    <Col xs={24} sm={18} md={14} lg={10} xl={12} xxl={6} className={appStyle.card}>                            
                                            <Card actions={[<div
                                                onClick={() => this.habilitarSelect(this.state.pessoa.status)}>Selecionar</div>]}>
                                                <Meta
                                                    avatar={<Avatar>{this.getAvatar(this.state.pessoa.nome)}</Avatar>}
                                                        title={(
                                                            <>
                                                            <Row>
                                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                                <Text strong>{this.state.pessoa.nome}</Text>
                                                                {' '}
                                                                <Tooltip title={this.state.pessoa.status}>
                                                                    <Icon type="info-circle" />
                                                                </Tooltip>
                                                                </div>
                                                            </Row>
                                                            </>
                                                        )}
                                                            description={this.state.pessoa.cpfCnpj}
                                                            />
                                                            <Row>
                                                            <div style={{ color: '#ccc', marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                                                                <Tooltip title="Última atualização">                                    
                                                                    <span style={{ marginLeft: 10}}>{this.state.pessoa.dataUltimaAtualizacao}</span>
                                                                </Tooltip>
                                                            </div>
                                                            </Row>
                                                        </Card>                                        
                                                    </Col>     
                                    )}                           
                            </div>
                        </div>                
                </div>
                </>
        );
    }
}

export default App;
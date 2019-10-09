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
            tipoBusca: "cpf",
            rg: "",
            cpfCnpj: "",
            numeroProcesso: "",
            numeroPis: "",
            pessoa: null
        };
    }

    cadastrarBusca(cpfCnpj, numeroProcesso, numeroPis, rg, nome) {
        var json = {
            cpfCnpj,
            numeroProcesso,
            numeroPis,
            rg,
            nome
        }

        if(!cpfCnpj){
            message.error('Informar o CPF/CNPJ!!!!')
        }else{
            Axios.post("http://127.0.0.1:9090/solicitacoes/registrarSolicitacao", json).then(()=> {message.success('Busca cadastrada com sucesso')}).catch(() => {message.error('Não foi possível cadastrar, tente novamente mais tarde')})
        }
        
    };  

    buscar(tipoBusca, value) {
        Axios.get("http://127.0.0.1:9090/solicitacoes/buscarSolicitacoes", {params : {tipoBusca: tipoBusca, value: value}}).then((response)=> {this.setState({pessoa : response.data[0]})}).catch(() => {message.error('Algo de errado aconteceu, contate o administrador do sistema')})
    }

    getRelatorio(id) {
        Axios.get("127.0.0.1:9090/solicitacoes/gerarRelatorio", {params: {id}})
    }

    confirmar(){
        this.props.history.push('/')
    }

    getAvatar(nome){
        return nome.charAt(0);
    }

    habilitarSelect(pessoa){
        if(pessoa.status === "Concluido"){
            this.getRelatorio(pessoa.id)
        }else{
            message.error('Essa busca ainda não foi concluída, tente novamente mais tarde')
        }
    }

    formataData(data){
        return data[2] + "/" + data[1] + "/" + data[0];
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
                                                    onChange={(value) => this.setState({ tipoBusca: value })}>
                                                    <Option value="cpf">CPF</Option>
                                                    <Option value="rg">RG</Option>
                                                </Select>
                                            } enterButton="Buscar"                                        
                                                onSearch={(value) => this.buscar(this.state.tipoBusca, value)}
                                            />}
                                            </Panel>
                                            
                                            <Panel header="Cadastrar uma busca" key="2">
                                            {<>
                                                <Input className={appStyle.input} placeholder="RG" onChange={(e) => {this.setState({rg: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="CPF/CNPJ" onChange={(e) => {this.setState({cpfCnpj: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="Nome" onChange={(e) => {this.setState({nome: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="Número Processo - ARPENSP" onChange={(e) => {this.setState({numeroProcesso: e.target.value})}}/>
                                                <Input className={appStyle.input} placeholder="PIS - Trabalhador" onChange={(e) => {this.setState({numeroPis: e.target.value})}}/>
                                                <Button type="primary" style={{ float: "right", marginTop: "10px", marginBottom: "10px"}} onClick={() => this.cadastrarBusca(this.state.cpfCnpj, this.state.numeroProcesso, this.state.numeroPis, this.state.rg, this.state.nome)}>Cadastrar busca</Button>
                                            </>}
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                { this.state.pessoa !== null && this.state.pessoa !== undefined ? 
                                    (                                
                                    <Col xs={24} sm={18} md={14} lg={10} xl={12} xxl={6} className={appStyle.card}>                            
                                            <Card actions={[<div
                                                onClick={() => this.habilitarSelect(this.state.pessoa)}>Selecionar</div>]}>
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
                                                                    <span style={{ marginLeft: 10}}>{this.formataData(this.state.pessoa.dataUltimaAtualizacao)}</span>
                                                                </Tooltip>
                                                            </div>
                                                            </Row>
                                                        </Card>                                        
                                                    </Col>     
                                    ) :
                                    (
                                        <>
                                        </>
                                    )
                                }                       
                            </div>
                        </div>                
                </div>
                </>
        );
    }
}

export default App;
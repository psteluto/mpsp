import React from 'react';
import { Avatar, Button, Card, Col, Collapse, Input, Row, Select, Steps, Typography, Checkbox, Popconfirm } from 'antd';
import appStyle from './App.module.scss';
import perfil from '../../images/perfil.png'
import logo from '../../images/logo-mpsp.png'

const { Step } = Steps;
const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;
const {Panel} = Collapse

const pessoas = [
    {
        nome: 'Vinicius Roxo Brandão',
        cpf: '446.025.698-38',
        sigla: 'VR',
    },
    {
        nome: 'Henrique dos Santos Miguel',
        cpf: '365.219.689-90',
        sigla: 'HS',
    },
    {
        nome: 'Paloma Steluto',
        cpf: '159.753.458-42',
        sigla: 'PS',
    },
    {
        nome: 'Isabella Menezes',
        cpf: '901.789.125-00',
        sigla: 'IM',
    },
    {
        nome: 'Larissa Carvalho',
        cpf: '147.258.369-03',
        sigla: 'LC',
    },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            filterPessoas: pessoas,
            tipoFiltro: "cpf",
            pessoaSelecionada: {},
            checkedValues: [],
            rg: "",
            cpfCnpj: "",
            numProcesso: "",
            pis: "",
        };
    }

    cadastrarBusca(rg, cpfCnpj, numProcesso, pis) {
        var json = {
            RegistroSolicitacao: {
            rg,
            cpfCnpj,
            numProcesso,
            pis,
        }
    };
        console.log(json);
    }

    next(pessoaSelecionada) {
        const current = this.state.current + 1;
        this.setState({ current, pessoaSelecionada });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    filter(lista, value, tipoFiltro) {
        if (tipoFiltro === "nome") {
            let nome = value.toLowerCase();
            this.setState({ filterPessoas: lista.filter((pessoa) => pessoa.nome.toLowerCase().includes(nome)) })
        } else if (tipoFiltro === "cpf") {
            let cpf = value.toLowerCase().replace(".", "").replace("-", "");
            this.setState({ filterPessoas: lista.filter((pessoa) => pessoa.cpf.toLowerCase().replace(".", "").replace("-", "").includes(cpf)) })
        } else if (tipoFiltro === "rg") {
            this.setState({ filterPessoas: lista.filter((pessoa) => pessoa.nome.toLowerCase().includes(value.toLowerCase())) })
        }
    }

    check(checkedValues) {
        this.setState({ checkedValues })
    }

    confirmar(){
        this.props.history.push('/')
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
                <Steps current={current}>
                    <Step title="Busca" />
                    <Step title="Gerar Relatório" />
                </Steps>
                {firstStep ? (
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
                                                <Option value="nome">Nome</Option>
                                                <Option value="rg">RG</Option>
                                            </Select>
                                        } enterButton="Buscar"
                                            onSearch={(value) => this.filter(pessoas, value, this.state.tipoFiltro)}
                                            onChange={(e) => this.filter(pessoas, e.target.value, this.state.tipoFiltro)} 
                                        />}
                                        </Panel>
                                        
                                        <Panel header="Cadastrar uma busca" key="2">
                                        {<>
                                            <Input className={appStyle.input} placeholder="RG" onChange={(e) => {this.setState({rg: e.target.value})}}/>
                                            <Input className={appStyle.input} placeholder="CPF/CNPJ" onChange={(e) => {this.setState({cpfCnpj: e.target.value})}}/>
                                            <Input className={appStyle.input} placeholder="Nome" onChange={(e) => {this.setState({nome: e.target.value})}}/>
                                            <Input className={appStyle.input} placeholder="Número Processo - ARPENSP" onChange={(e) => {this.setState({numProcesso: e.target.value})}}/>
                                            <Input className={appStyle.input} placeholder="PIS - Trabalhador" onChange={(e) => {this.setState({pis: e.target.value})}}/>
                                            <Button type="primary" style={{ float: "right", marginTop: "10px", marginBottom: "10px"}} onClick={() => this.cadastrarBusca(this.state.rg, this.state.cpfCnpj, this.state.numProcesso, this.state.pis)}>Cadastrar busca</Button>
                                        </>}
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                {
                                    this.state.filterPessoas.map((pessoa) => {
                                        return (
                                            <Col xs={24} sm={18} md={14} lg={10} xl={8} xxl={6} className={appStyle.card}>
                                                <Card key={pessoa.cpf}
                                                    actions={[<div
                                                        onClick={() => this.next(pessoa)}>Selecionar</div>]}>
                                                    <Meta className={appStyle.texto} avatar={<Avatar>{pessoa.sigla}</Avatar>} title={pessoa.cpf}
                                                        description={pessoa.nome} />
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </div>
                ) : (
                        <div>
                            <Row className={appStyle.pessoaSelecionada} type='flex'>
                                <Col>
                                    <img alt={"picture"} src={perfil} />
                                </Col>
                                <Col className={appStyle.info}>
                                    <Text>{this.state.pessoaSelecionada.nome}</Text>
                                    <Text>{this.state.pessoaSelecionada.cpf}</Text>
                                    <Text></Text>
                                </Col>
                            </Row>
                            <div>
                                <Checkbox.Group onChange={(values) => this.check(values)}>
                                    <Row type='flex'>
                                        <Col span={4}>
                                            <Checkbox value="JUCESP">Juscesp</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="ARISP">Arisp</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="ARPENSP">Arpensp</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="CAGED">Caged</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="CADESP">Cadesp</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="CENSEC">Censec</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="SIVEC">Sivec</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="SIEL">Siel</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="DETRAN">Detran</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="INFOCRIM">Infor Crim</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="FACEBOOK">Facebook</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="LINKEDIN">Linkedin</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="JUSBRASIL">JusBrasil</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="CONSULTASOCIOS">Consulta Sócios</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="MAPS">Maps</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="RECEITAFEDERAL">Receita Federal</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </div>
                            <Row type="flex" justify="end">
                                <Col>
                                    <Button style={{ marginTop: 30 }} onClick={() => this.prev()}>
                                        Voltar
                        </Button>
                        <Button type="primary" style={{ marginLeft: 8, marginTop: 60 }} onClick={() => alert("RELATORIO")}>Gerar Relatório</Button>
                                </Col>
                            </Row>
                        </div>
                    )}
            </div>
            </>
        );
    }
}

export default App;

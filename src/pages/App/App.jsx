import React from 'react';
import { Avatar, Button, Card, Col, Input, Row, Select, Steps, Typography, Checkbox } from 'antd';
import appStyle from './App.module.scss';
import perfil from '../../images/perfil.png'

const { Step } = Steps;
const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;


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
        };
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
        } else if (tipoFiltro === "cnpj") {
            this.setState({ filterPessoas: lista.filter((pessoa) => pessoa.nome.toLowerCase().includes(value.toLowerCase())) })
        }
    }

    check(checkedValues) {
        this.setState({ checkedValues })
    }

    render() {
        const { current } = this.state;
        const firstStep = current === 0;
        return (
            <div className={appStyle.steps}>
                <Steps current={current}>
                    <Step title="Buscar" />
                    <Step title="Gerar Relatório" />
                </Steps>
                {firstStep ? (
                    <div>
                        <div>
                            <Row>
                                <Col span={12} offset={6}>
                                    <Search className={appStyle.campo} addonBefore={
                                        <Select defaultValue="cpf"
                                            onChange={(value) => this.setState({ tipoFiltro: value })}>
                                            <Option value="cpf">CPF</Option>
                                            <Option value="nome">Nome</Option>
                                            <Option value="cnpj">CNPJ</Option>
                                        </Select>
                                    } enterButton="Buscar"
                                        onSearch={(value) => this.filter(pessoas, value, this.state.tipoFiltro)}
                                        onChange={(e) => this.filter(pessoas, e.target.value, this.state.tipoFiltro)} />
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
        );
    }
}

export default App;

import React from 'react';
import { Avatar, Card, Col, Input, Row, Select } from 'antd';
import style from './Step1.module.scss'

const { Meta } = Card;

const { Option } = Select;
const { Search } = Input;

const select = (
  <Select defaultValue="nome">
    <Option value="nome">Nome</Option>
    <Option value="cpf">CPF</Option>
    <Option value="cnpj">CNPJ</Option>
  </Select>
);

class Step1 extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <Search addonBefore={select} enterButton="Buscar" onSearch={() => alert('oi')} />
          </Col>
        </Row>
        <div className={style.listCards}>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
          <Card className={style.card} actions={[<span>Selecionar</span>]}>
            <Meta avatar={<Avatar>HS</Avatar>} title="365.219.689-90" description="Henrique dos Santos Miguel" />
          </Card>
        </div>
      </div>
    );
  }
}

export default Step1;
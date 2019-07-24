import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {
  Container,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  CardHeader,
  Table,
  Pagination, PaginationItem, PaginationLink,
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
  DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown,
  InputGroup, InputGroupAddon, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, FormText
} from 'reactstrap';
import classnames from 'classnames'

// Status // pending, pending, checking, payment, close

const allStatus = [
  'pending',
  'payment',
  'checking',
  'supply',
  'close'
]

const nextStatus = {
  pending: 'รอชำระ',
  payment: 'รอตรวจสอบ',
  checking: 'รอจัดส่ง',
  supply: 'รอปิดบิล',
  close: 'ปิดบิลแล้ว',
}
const messageStatus = {
  pending: 'รอชำระ',
  checking: 'รอตรวจสอบ',
  payment: 'ชำระแล้ว',
  supply: 'รอจัดส่ง',
  close: 'ปิดบิลแล้ว',
}

const buttonStatus = {
  pending: 'warning',
  checking: 'secondary',
  payment: 'success',
  supply: 'info',
  close: 'danger',
}

const mockData = [
  {
    id: 'OD-0001',
    name: 'มาริสา สุนารี',
    data: '13 มกราคม 2561, 02:14',
    totalPrice: '฿410.00',
    status: 'payment' 
  },
  {
    id: 'OD-0002',
    name: 'อารดา มีนา',
    data: '13 มกราคม 2561, 02:14',
    totalPrice: '฿410.00',
    status: 'pending' 
  },
  {
    id: 'OD-0003',
    name: 'ยุวดี พงกน',
    data: '13 มกราคม 2561, 02:14',
    totalPrice: '฿410.00',
    status: 'checking' 
  },
  {
    id: 'OD-0004',
    name: 'นรา มายก',
    data: '13 มกราคม 2561, 02:14',
    totalPrice: '฿410.00',
    status: 'close' 
  },
  {
    id: 'OD-0005',
    name: 'ปราวีนา หลาแก้ว',
    data: '13 มกราคม 2561, 02:14',
    totalPrice: '฿410.00',
    status: 'supply' 
  },
]

class pending extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.toggleButtonStatus = this.toggleButtonStatus.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleNested = this.toggleNested.bind(this)
  
    this.state = {
      activeTab: 'all',
      dropdownOpen: {
        pending: false,
        checking: false,
        payment: false,
        supply: false,
        close: false,
      },
      modal: false,
      toggleNested: false,
      isPreviweBill: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleButtonStatus(type) {
    this.setState({
      dropdownOpen: {
        ...this.state.dropdownOpen,
        [type]: !this.state.dropdownOpen[type]
      }
    })
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
      isPreviweBill: false
    });
  }
  toggleNested() {
    this.setState({
      toggleNested: !this.state.toggleNested
    });
  }

  renderTable(id) {
    const getNextStatus = currentStatus => (
      id === 'all' || currentStatus === 'pending'
      ? currentStatus
      : allStatus.reduce((p, c, i) => c === currentStatus ? allStatus[i + 1] : p, 'all')
    )
    const renderItem = ({
        id,
        name,
        data,
        totalPrice,
        status
      }) => (
      <tr>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{data}</td>
        <td>{totalPrice}</td>
        {/* <td><Button color={buttonStatus[status]}>{nextStatus[status]}</Button></td> */}
        <td>
        <ButtonDropdown isOpen={this.state.dropdownOpen[id]} toggle={() => this.toggleButtonStatus(id)}>
          <DropdownToggle caret color={buttonStatus[status]}>
            {nextStatus[status]}
          </DropdownToggle>
          <DropdownMenu>
            {allStatus.map(v => (
              <DropdownItem key={v} color={buttonStatus[v]}>{messageStatus[v]}</DropdownItem>
            ))}
          </DropdownMenu>
         </ButtonDropdown>
        </td>
        <td><Button color="info">ดูรายละเอียดบิล</Button></td>
        <td><Button color="primary">พิมพ์ใบเสร็จ</Button></td>
      </tr>
    )
    return (
      <div>
        <InputGroup>
          <Input placeholder="ค้นหาออเดอร์สินค้า" />
          <InputGroupAddon onClick={() => alert('search')} addonType="append">ค้นหา</InputGroupAddon>
        </InputGroup>
        <br />
        <br />
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th>pending ID</th>
              <th>ชื่อลูกค้า</th>
              <th>วันสั่งจอง</th>
              <th>ยอดสุทธิ</th>
              <th>สถานะ</th>
              <th>บิล</th>
              <th>พิมพ์ใบเสร็จ</th>
            </tr>
          </thead>
          <tbody>
            {id === 'all' ? mockData.map(renderItem) : mockData.filter(({ status }) => status === id).map(renderItem)}
          </tbody>
        </Table>
      </div>
    )
  }

  renderPagenation() {
    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    )
  }

  renderBillPreview(totalPrice) {
    return (
      <div>
        <ModalHeader toggle={this.toggleModal}>พรีวิวบิล</ModalHeader>
        
      <ModalBody>
        <Button style={{ position: 'absolute', right: 15, top: 15,  }} color="success" >พิมพ์</Button>{' '}
        <Row style={{ marginTop: 45 }}>
          <Col xs="12">
          <Card body outline color="secondary">
            <Row>
              <Col xs='8'>
                <CardTitle>คุณ มาริสา สุนารี </CardTitle>
              </Col>
              <Col xs='4'>
                <CardTitle style={{ textAlign: 'right' }}>เลขที่ออเดอร์: OD-0006</CardTitle>
              </Col>
            </Row>
            <br />
            <CardText>
              <Row>
                <Col xs='9'>
                  เลขที่ สมาชิก MB0012
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  วันสั่งจอง 13 ม.ค. 2018
                </Col>
              </Row>
              <Row>
                <Col xs='9'>
                  สถานะ: สั่งจอง
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  รอชำระ
                </Col>
              </Row>
              <Row>
                <Col xs='9'>
                  ออกบิลโดย: admin
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  
                </Col>
              </Row>
            </CardText>
              <Table hover>
                  <thead>
                    <tr>
                      <th>รายการสินค้า</th>
                      <th>จำนวน</th>
                      <th>ราคา</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="3">ชื่อสินค้า </Col>
                          <Col xs='9'>สบู่สมุนไพร บีพลัช</Col>
                        </Row>
                        <Row>
                          <Col xs="3">รหัสสินค้า </Col>
                          <Col xs='9'>PD-0001</Col>
                        </Row>
                      </th>
                      <td>10</td>
                      <td>250</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="3">ชื่อสินค้า </Col>
                          <Col xs='9'>สบู่สมุนไพร บีพลัช 2</Col>
                        </Row>
                        <Row>
                          <Col xs="3">รหัสสินค้า </Col>
                          <Col xs='9'>PD-0002</Col>
                        </Row>
                      </th>
                      <td>10</td>
                      <td>400</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="3">ชื่อสินค้า </Col>
                          <Col xs='9'>ครีมกันแดด สูตร 1</Col>
                        </Row>
                        <Row>
                          <Col xs="3">รหัสสินค้า </Col>
                          <Col xs='9'>PD-0003</Col>
                        </Row>
                      </th>
                      <td>10</td>
                      <td>200</td>
                    </tr>
                  </tbody>
                </Table>
              <br />
              <br />
              <Row>
                <Col xs='10'>
                  ภาษีมุลค่าเพิ่ม
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  7%
                </Col>
              </Row>
              <Row>
                <Col xs='10'>
                  วิธีการจัดส่ง
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  ไปรษณีย์
                </Col>
              </Row>
              <Row>
                <Col xs='10'>
                  ค่าจัดส่ง
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  ฿0
                </Col>
              </Row>
              <Row>
                <Col xs='10'>
                  ส่วนลด
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  ฿0
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs='9'>
                  ยอดรวมสุทธิ
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  {`฿${totalPrice + (totalPrice * 7 / 100)}`}
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <Row>
                <Col xs='2'>
                  หมายเหตุ
                </Col>
                <Col xs='10' >
                  -
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="12">
            <Card body outline color="secondary">
              <CardTitle>สถานที่จัดส่ง</CardTitle>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">ข้อมูลการจัดส่ง</Label>
                  <Input plaintext>ที่อยู่-จัดส่งสินค้า</Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">ชื่อลูกค้า: คุณ มาริสา สุนารี</Label>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">เบอร์โทร: 0813456778</Label>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">ที่อยู่: 231/32 ซอยมีดี ถนนลาดพร้าว เขตวังทองหลาง แขวงวังทองหลาง กรุงเทพ 10310</Label>
                </FormGroup>
              </Form>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.toggleModal}>บันทึกบิล</Button>{' '}
        <Button color="secondary" onClick={() => {
            this.setState({
              isPreviweBill: false
            })
          }}>ย้อนกลับ</Button>
        {/* <Button color="secondary" onClick={this.toggleModal}>ยกเลิก</Button> */}
      </ModalFooter>
      <Modal  className="modal-lg" isOpen={this.state.toggleNested} toggle={this.toggleNested} onClosed={!this.state.modal ? this.toggleModal : undefined}>
        <ModalHeader>เลือกสินค้า</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input placeholder="ชื่อสินค้า, เลขรหัสสินค้า" />
            <InputGroupAddon addonType="append">ค้นหาสินค้า</InputGroupAddon>
          </InputGroup>
          <Table hover>
                  <thead>
                    <tr>
                      <th>รายการสินค้า</th>
                      <th>สต๊อก</th>
                      <th>สั่งจอง</th>
                      <th>ราคา</th>
                      <th>เลือกสินค้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="4">ชื่อสินค้า </Col>
                          <Col xs='8'>สบู่สมุนไพร บีพลัช</Col>
                        </Row>
                        <Row>
                          <Col xs="4">รหัสสินค้า </Col>
                          <Col xs='8'>PD-0001</Col>
                        </Row>
                      </th>
                      <td>4</td>
                      <td>6</td>
                      <td>250</td>
                      <td><Button color='primary'>เลือกสินค้า</Button></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="4">ชื่อสินค้า </Col>
                          <Col xs='8'>สบู่สมุนไพร บีพลัช 2</Col>
                        </Row>
                        <Row>
                          <Col xs="4">รหัสสินค้า </Col>
                          <Col xs='8'>PD-0002</Col>
                        </Row>
                      </th>
                      <td>10</td>
                      <td>2</td>
                      <td>400</td>
                      <td><Button color='primary'>เลือกสินค้า</Button></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="4">ชื่อสินค้า </Col>
                          <Col xs='8'>ครีมกันแดด สูตร 1</Col>
                        </Row>
                        <Row>
                          <Col xs="4">รหัสสินค้า </Col>
                          <Col xs='8'>PD-0003</Col>
                        </Row>
                      </th>
                      <td>10</td>
                      <td>3</td>
                      <td>฿200</td>
                      <td><Button color='primary'>เลือกสินค้า</Button></td>
                    </tr>
                  </tbody>
                </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleNested}>ยืนยัน</Button>{' '}
          <Button color="secondary" onClick={this.toggleNested}>ยกเลิก</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }

  renderBillCreate(totalPrice) {
    return (
      <div>
        <ModalHeader toggle={this.toggleModal}>สร้างบิลใหม่</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="12">
          <InputGroup>
            <Input placeholder="ชื่อ-นามสกุล, เลขสมาชิก" />
            <InputGroupAddon addonType="append">ค้นหา</InputGroupAddon>
          </InputGroup>

          <br />
          <Card body outline color="secondary">
            <Row>
              <Col xs='8'>
                <CardTitle>คุณ มาริสา สุนารี </CardTitle>
              </Col>
              <Col xs='4'>
                <CardTitle style={{ textAlign: 'right' }}>เลขที่ออเดอร์: OD-0006</CardTitle>
              </Col>
            </Row>
            <br />
            <CardText>
              <Row>
                <Col xs='9'>
                  เลขที่ สมาชิก MB0012
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  วันสั่งจอง 13 ม.ค. 2018
                </Col>
              </Row>
              <Row>
                <Col xs='9'>
                  สถานะ: สั่งจอง
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  รอชำระ
                </Col>
              </Row>
              <Row>
                <Col xs='9'>
                  ออกบิลโดย: admin
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  
                </Col>
              </Row>
            </CardText>
              <Table hover>
                  <thead>
                    <tr>
                      <th>รายการสินค้า</th>
                      <th>จำนวน</th>
                      <th>ราคา</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="3">ชื่อสินค้า </Col>
                          <Col xs='9'>สบู่สมุนไพร บีพลัช</Col>
                        </Row>
                        <Row>
                          <Col xs="3">รหัสสินค้า </Col>
                          <Col xs='9'>PD-0001</Col>
                        </Row>
                      </th>
                      <td><input style={{ width: 40 }} defaultValue='10' /></td>
                      <td><input style={{ width: 40 }} defaultValue='250' /></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="3">ชื่อสินค้า </Col>
                          <Col xs='9'>สบู่สมุนไพร บีพลัช 2</Col>
                        </Row>
                        <Row>
                          <Col xs="3">รหัสสินค้า </Col>
                          <Col xs='9'>PD-0002</Col>
                        </Row>
                      </th>
                      <td><input style={{ width: 40 }} defaultValue='10' /></td>
                      <td><input style={{ width: 40 }} defaultValue='400' /></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="3">ชื่อสินค้า </Col>
                          <Col xs='9'>ครีมกันแดด สูตร 1</Col>
                        </Row>
                        <Row>
                          <Col xs="3">รหัสสินค้า </Col>
                          <Col xs='9'>PD-0003</Col>
                        </Row>
                      </th>
                      <td><input style={{ width: 40 }} defaultValue='10' /></td>
                      <td><input style={{ width: 40 }} defaultValue='200' /></td>
                    </tr>
                  </tbody>
                </Table>
              <Button outline color="success" onClick={this.toggleNested}>เพิ่มสินค้า</Button>
              <br />
              <br />
              <Row>
                <Col xs='10'>
                  ภาษีมุลค่าเพิ่ม
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  <InputGroup>
                    <input style={{ width: 60 }} defaultValue='7' />
                    <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs='10'>
                  วิธีการจัดส่ง
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  <InputGroup>
                    <Input type="select" name="select" id="exampleSelect">
                      <option>ไปรษณีย์</option>
                      <option>ไปรษณีย์ (ส่งด่วน)</option>
                      <option>Uber</option>
                      <option>Grab</option>
                      <option>DHL</option>
                    </Input>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs='10'>
                  ค่าจัดส่ง
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  <InputGroup>
                    <input style={{ width: 60 }} defaultValue='0' />
                    <InputGroupAddon addonType="prepend">฿</InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs='10'>
                  ส่วนลด
                </Col>
                <Col xs='2' style={{ textAlign: 'right' }}>
                  <InputGroup>
                    <input style={{ width: 60 }} defaultValue='0' />
                    <InputGroupAddon addonType="prepend">฿</InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs='9'>
                  ยอดรวมสุทธิ
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                  {`฿${totalPrice + (totalPrice * 7 / 100)}`}
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <Row>
                <Col xs='2'>
                  หมายเหตุ
                </Col>
                <Col xs='10' >
                  <input style={{ width: '100%' }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="12">
            <Card body outline color="secondary">
              <CardTitle>สถานที่จัดส่ง</CardTitle>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">ข้อมูลการจัดส่ง</Label>
                  <Input plaintext>ที่อยู่-จัดส่งสินค้า</Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">ชื่อลูกค้า</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="ชื่อ - นามสกุล" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">เบอร์โทร</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="เบอร์โทรสำหรับการติดต่อส่งของ" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">ที่อยู่</Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">แขวง/ตำบล</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="แขวง/ตำบล" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">เขต/อำเภอ</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="เขต/อำเภอ" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">จังหวัด</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="จังหวัด" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">รหัสไปรษณีย์</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="รหัสไปรษณีย์" />
                </FormGroup>
                
              </Form>
              <Button color="success">บันทึก</Button>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => this.setState({ isPreviweBill: true })}>บันทึกบิล</Button>{' '}
        <Button color="secondary" onClick={this.toggleModal}>ยกเลิก</Button>
      </ModalFooter>
      <Modal  className="modal-lg" isOpen={this.state.toggleNested} toggle={this.toggleNested} onClosed={!this.state.modal ? this.toggleModal : undefined}>
        <ModalHeader>เลือกสินค้า</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input placeholder="ชื่อสินค้า, เลขรหัสสินค้า" />
            <InputGroupAddon addonType="append">ค้นหาสินค้า</InputGroupAddon>
          </InputGroup>
          <Table hover>
                  <thead>
                    <tr>
                      <th>รายการสินค้า</th>
                      <th>สต๊อก</th>
                      <th>สั่งจอง</th>
                      <th>ราคา</th>
                      <th>เลือกสินค้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="4">ชื่อสินค้า </Col>
                          <Col xs='8'>สบู่สมุนไพร บีพลัช</Col>
                        </Row>
                        <Row>
                          <Col xs="4">รหัสสินค้า </Col>
                          <Col xs='8'>PD-0001</Col>
                        </Row>
                      </th>
                      <td>4</td>
                      <td>6</td>
                      <td>250</td>
                      <td><Button color='primary'>เลือกสินค้า</Button></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="4">ชื่อสินค้า </Col>
                          <Col xs='8'>สบู่สมุนไพร บีพลัช 2</Col>
                        </Row>
                        <Row>
                          <Col xs="4">รหัสสินค้า </Col>
                          <Col xs='8'>PD-0002</Col>
                        </Row>
                      </th>
                      <td>10</td>
                      <td>2</td>
                      <td>400</td>
                      <td><Button color='primary'>เลือกสินค้า</Button></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Row>
                          <Col xs="4">ชื่อสินค้า </Col>
                          <Col xs='8'>ครีมกันแดด สูตร 1</Col>
                        </Row>
                        <Row>
                          <Col xs="4">รหัสสินค้า </Col>
                          <Col xs='8'>PD-0003</Col>
                        </Row>
                      </th>
                      <td>10</td>
                      <td>3</td>
                      <td>฿200</td>
                      <td><Button color='primary'>เลือกสินค้า</Button></td>
                    </tr>
                  </tbody>
                </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleNested}>ยืนยัน</Button>{' '}
          <Button color="secondary" onClick={this.toggleNested}>ยกเลิก</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }

  renderModal() {
    const totalPrice = (250 * 10) + (400 * 10) + (200 * 10)
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-lg" >
        {this.state.isPreviweBill ? this.renderBillPreview(totalPrice) : this.renderBillCreate(totalPrice)}
      </Modal>
    )
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>ข้อมูลออเดอร์ทั้งหมด</CardHeader>
          <CardBody>
            <CardTitle>รายการออเดอร์สินค้า</CardTitle>
            <CardText>รวมลิชรายการการสั่งชื้อสินค้า.</CardText>
            <Button outline color="success" onClick={this.toggleModal}>สร้างบิลใหม่</Button>
            <br />
            <br />
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'all' })}
                  onClick={() => { this.toggle('all'); }}
                >
                  ออเดอร์ทั้งหมด
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'pending' })}
                  onClick={() => { this.toggle('pending'); }}
                >
                  สั่งจอง
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'pending' })}
                  onClick={() => { this.toggle('pending'); }}
                >
                  สั่งจอง
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'payment' })}
                  onClick={() => { this.toggle('payment'); }}
                >
                  ชำระเงินแล้ว
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'checking' })}
                  onClick={() => { this.toggle('checking'); }}
                >
                  ตรวจสอบแล้ว
                </NavLink>
              </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'supply' })}
                onClick={() => { this.toggle('supply'); }}
              >
                จัดส่ง
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'close' })}
                onClick={() => { this.toggle('close'); }}
              >
                ปิดบิลแล้ว
              </NavLink>
            </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="all">
                <Row>
                  <Col sm="12">
                    {this.renderTable('all')}
                    {this.renderPagenation()}
                  </Col>
                </Row>
              </TabPane>
              {/* <TabPane tabId="pending">
                <Row>
                  <Col sm="12">
                    {this.renderTable('pending')}
                    {this.renderPagenation()}
                  </Col>
                </Row>
              </TabPane> */}
              <TabPane tabId="pending">
                <Row>
                  <Col sm="12">
                    {this.renderTable('pending')}
                    {this.renderPagenation()}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="payment">
                <Row>
                  <Col sm="12">
                    {this.renderTable('payment')}
                    {this.renderPagenation()}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="checking">
                <Row>
                  <Col sm="12">
                    {this.renderTable('checking')}
                    {this.renderPagenation()}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="supply">
                <Row>
                  <Col sm="12">
                    {this.renderTable('supply')}
                    {this.renderPagenation()}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="close">
                <Row>
                  <Col sm="12">
                    {this.renderTable('close')}
                    {this.renderPagenation()}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
        {this.renderModal()}
      </div>
    )
  }
}

export default pending

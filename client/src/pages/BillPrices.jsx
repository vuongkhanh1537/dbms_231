import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { billInPrices } from '../services/BillInServices';
import { billOutPrices } from '../services/BillOutServices';
import Table from 'react-bootstrap/Table';

export const BillPrices = () => {

  const [detail, setDetail] = useState({});
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [billsIn, setBillsIn] = useState([]);
  const [billsOut, setBillsOut] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetail((prev) => {
        return {...prev, [name] : value}
    })
    console.log(detail);
  }

  const handleClick1 = async () => {
    let res = await billInPrices(detail);
    setShow1(true);
    setBillsIn(res.data[0]);
  }
  const handleClick2 = async () => {
    let res = await billOutPrices(detail);
    setShow2(true);
    setBillsOut(res.data[0]);
  }

  return (<>
    <Table>
      <tbody>
        <td>
          <h5>Tra cứu hóa đơn đã nhập</h5> 
          <Box
            ml = "20px"
            sx={{ height: "fit-content", width: '90%'}}>
            <Form>
              <Row className="mb-3">
                  <Form.Group as={Col} >
                  <Form.Label>Ngày bắt đầu</Form.Label>
                  <Form.Control
                      type="date"
                      placeholder="DateRange"
                      name="timestart"
                      onChange={handleChange}
                  />
                  </Form.Group>
                  <Form.Group as={Col} >
                  <Form.Label>Ngày kết thúc</Form.Label>
                  <Form.Control
                      type="date"
                      placeholder="DateRange"
                      name="timeend"
                      onChange={handleChange}
                  />
                  </Form.Group>
              </Row>
              <Button variant="primary" onClick={handleClick1}>
                  Tra cứu
              </Button>
            </Form>
            {show1 && (<Table variant="primary" striped  bordered hover>
              <thead>
                <tr>
                  <th>BillID</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {billsIn.map((bill) => (
                  <tr key={bill.BillID}>
                    <td>{bill.BillID}</td>
                    <td>{bill.TotalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>)}
          </Box>
        </td>
        <td>
          <h5>Tra cứu hóa đơn đã xuất</h5> 
          <Box
            ml = "20px"
            sx={{ height: "fit-content", width: '90%'}}>
            <Form>
              <Row className="mb-3">
                  <Form.Group as={Col} >
                  <Form.Label>Ngày bắt đầu</Form.Label>
                  <Form.Control
                      type="date"
                      placeholder="DateRange"
                      name="timestart"
                      onChange={handleChange}
                  />
                  </Form.Group>
                  <Form.Group as={Col} >
                  <Form.Label>Ngày kết thúc</Form.Label>
                  <Form.Control
                      type="date"
                      placeholder="DateRange"
                      name="timeend"
                      onChange={handleChange}
                  />
                  </Form.Group>
              </Row>
              <Button variant="primary" onClick={handleClick2}>
                  Tra cứu
              </Button>
            </Form>
            {show2 && (<Table variant="primary" striped  bordered hover>
              <thead>
                <tr>
                  <th>BillID</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {billsOut.map((bill) => (
                  <tr key={bill.BillID}>
                    <td>{bill.BillID}</td>
                    <td>{bill.TotalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>)}
          </Box>
        </td>
      </tbody>
    </Table>
    
    
  </>);
}

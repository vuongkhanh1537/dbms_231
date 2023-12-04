import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { calculateAbsentHours } from '../services/AbsentHoursService';
import Alert from 'react-bootstrap/Alert';


export const AbsentHours = () => {

  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);
  const [hours, setHours] = useState('00:00:00');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetail((prev) => {
        return {...prev, [name] : value}
    })
    console.log(detail);
  }

  const handleClick = async () => {
    let res = await calculateAbsentHours(detail);
    console.log(res.data[0].data);
    setShow(true);
    setHours(res.data[0].data);
  }

  return (<>
    <h5>Tra cứu giờ nghỉ của nhân viên</h5> 
    <Box
      ml = "20px"
      sx={{ height: "fit-content", width: '90%'}}>
      <Form>
        <Row className="mb-3">
            <Form.Group as={Col}>
            <Form.Label>Mã nhân viên</Form.Label>
            <Form.Control type="text" placeholder="Nhập mã nhân viên" name="EmployeeId" onChange={handleChange}/>
            </Form.Group>

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
        <Button variant="primary" onClick={handleClick}>
            Tra cứu
        </Button>
      </Form>
      <Alert variant="primary" show={show} >
        Nhân viên đã nghỉ {hours===null?0:hours} giờ trong khoảng thời gian trên
      </Alert>
    </Box>
    
  </>);
}

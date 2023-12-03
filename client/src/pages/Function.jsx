import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { countSoldBook } from '../services/FunctionServices';
import Alert from 'react-bootstrap/Alert';


export const Function = () => {

  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetail((prev) => {
        return {...prev, [name] : value}
    })
    console.log(detail);
  }

  const handleClick = async () => {
    let res = await countSoldBook(detail);
    console.log(res.data[0].data);
    setShow(true);
    setCount(res.data[0].data);
  }

  return (<>
    <h5>Tra cứu số lượng sách đã bán</h5> 
    <Box
      ml = "20px"
      sx={{ height: "fit-content", width: '90%'}}>
      <Form>
        <Row className="mb-3">
            <Form.Group as={Col}>
            <Form.Label>Mã sách</Form.Label>
            <Form.Control type="text" placeholder="Nhập mã sách" name="BookId" onChange={handleChange}/>
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
        Bạn bán được {count} cuốn sách trong khoảng thời gian trên
      </Alert>
    </Box>
  </>);
}

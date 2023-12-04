import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { mostSoldBooks } from '../services/MostSoldServices';
import Table from 'react-bootstrap/Table';

export const MostSold = () => {

  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetail((prev) => {
        return {...prev, [name] : value}
    })
    console.log(detail);
  }

  const handleClick = async () => {
    let res = await mostSoldBooks(detail);
    setShow(true);
    setBooks(res.data[0]);
  }

  return (<>
    <h5>Tra cứu đầu sách bán chạy</h5> 
    <Box
      ml = "20px"
      sx={{ height: "fit-content", width: '90%'}}>
      <Form>
        <Row className="mb-3">
            <Form.Group as={Col}>
            <Form.Label>Số lượng sách tra cứu</Form.Label>
            <Form.Control type="text" placeholder="Nhập số sách" name="Number" onChange={handleChange}/>
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
      {show && (<Table variant="primary" striped  bordered hover>
        <thead>
          <tr>
            <th>BookID</th>
            <th>Tựa đề sách</th>
            <th>Số lượng đã bán</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.BookID}>
              <td>{book.BookID}</td>
              <td>{book.Title}</td>
              <td>{book.NumberSold}</td>
            </tr>
          ))}
        </tbody>
      </Table>)}
    </Box>
  </>);
}

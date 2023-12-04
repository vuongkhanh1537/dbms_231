import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { shiftEmployees } from '../services/ShiftEmployeesServices';
import Table from 'react-bootstrap/Table';

export const ShiftEmployees = () => {

  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetail((prev) => {
        return {...prev, [name] : value}
    })
    console.log(detail);
  }

  const handleClick = async () => {
    let res = await shiftEmployees(detail);
    setShow(true);
    setEmployees(res.data[1]);
  }

  return (<>
    <h5>Tra cứu danh sách nhân viên làm việc trong ngày</h5> 
    <Box
      ml = "20px"
      sx={{ height: "fit-content", width: '90%'}}>
      <Form>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Ngày cần tra</Form.Label>
            <Form.Control
                type="date"
                placeholder="Date"
                name="date"
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group as={Col} >
            <Form.Label>Ca cần tra</Form.Label>
            <Form.Control
                as="select"
                name="shift"
                onChange={handleChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </Form.Control>
            </Form.Group>
           
        </Row>
        <Button variant="primary" onClick={handleClick}>
            Tra cứu
        </Button>
      </Form>
      {show && (<Table variant="primary" striped  bordered hover>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Tên nhân viên</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EmployeeID}>
              <td>{employee.EmployeeID}</td>
              <td>{employee.Name}</td>
            </tr>
          ))}
        </tbody>
      </Table>)}
    </Box>
  </>);
}

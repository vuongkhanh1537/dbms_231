import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Box } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPublishers, getABook, updateBook } from '../services/BookServices';
import {  toast } from 'react-toastify';

const UpdateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        getPublisher();
        getEmployee();
    }, []);

    const getPublisher = async () => {
        let res = await fetchPublishers();
        if (res && res.data) {
            const list = res.data.map(item => item.Name);
            setPublishers(list);
        }
    }

    const getEmployee = async () => {
        try {
            let res = await getABook(id);
            if (res && res.data) {
                setDetail(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "PublisherID") {
            value = publishers.indexOf(e.target.value) + 1;
            console.log(value);
        }
        setDetail((prev) => {
            return {...prev, [name] : value}
        })
    }
    
    const handleClick = async () => {
        console.log(detail);
        try {
            let res = await updateBook(id, detail);
            if (res.status === 200) {
                toast.success("Đã chỉnh sửa thành công một cuốn sách");
                setTimeout(() => {
                    navigate("/books");
                }, 3000);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.sqlMessage)
        }
    }
  return (<>
    <h5>Chi tiết sách</h5>
    <Box 
        m = "20px 20px"
        sx={{ height: "fit-content", width: '70%'}}>
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Tên sách</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Nhập tên sách" 
                    name="Title" 
                    value={detail.Title}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>ISBN</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Nhập ISBN" 
                    name="ISBN" 
                    value={detail.ISBN}
                    disabled
                />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Số lượng</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Nhập số lượng" 
                    name="AvailableQuantity" 
                    value={detail.AvailableQuantity}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Đơn giá</Form.Label>
                <Form.Control 
                    type="number" 
                    min="1"
                    placeholder="Nhập đơn giá sách" 
                    name="UnitPrice" 
                    value={detail.UnitPrice}
                    onChange={handleChange}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Tác giả</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Nhập tác giả" 
                    name="Author" 
                    value={detail.Author}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Mã sách</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Mã sách" 
                    value={detail.BookID}
                    disabled />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Năm xuất bản</Form.Label>
                <Form.Control 
                    type="number" 
                    min="1900"
                    placeholder="Nhập năm xuất bản" 
                    name="PublishYear" 
                    value={detail.PublishYear}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Nhà xuất bản</Form.Label>
                <Form.Select 
                    name="PublisherID" 
                    value={publishers[detail.PublisherID - 1]}
                    onChange={handleChange}>
                        <option disabled>Chọn nhà xuất bản</option>
                        {publishers.map((option, index) => (
                            <option key={index} value={option}>
                            {option}
                            </option>
                        ))}
                </Form.Select>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" >
                <Form.Label>Mô tả</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={8} 
                    name="Description" 
                    defaultValue={detail.Description}
                    onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary float-end" onClick={handleClick}>
                Lưu
            </Button>
        </Form>
    </Box>
  </>)
}

export default UpdateBook;
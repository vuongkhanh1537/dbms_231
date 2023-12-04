import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { addBook, fetchPublishers } from '../services/BookServices';
import {  toast } from 'react-toastify';

const AddBook = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        getPublisher();
    }, [])

    const getPublisher = async () => {
        let res = await fetchPublishers();
        if (res && res.data) {
            const list = res.data.map(item => item.Name);
            setPublishers(list);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDetail((prev) => {
            return {...prev, [name] : value}
        })
    }
    
    const handleClick = async () => {
        console.log(detail);
        console.log(publishers);
        try {
            let res = await addBook(detail);
            if (res.status === 201) {
                toast.success("Đã thêm thành công một cuốn sách");
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
    <h5>Thêm sách</h5>
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
                    name="title" 
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>ISBN</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Nhập ISBN" 
                    name="ISBN" 
                    onChange={handleChange}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Số lượng</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Nhập số lượng" 
                    name="quantity" 
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Đơn giá</Form.Label>
                <Form.Control 
                    type="number" 
                    min="1"
                    placeholder="Nhập đơn giá sách" 
                    name="unitPrice" 
                    onChange={handleChange}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Tác giả</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Nhập tác giả" 
                    name="author" 
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Mã sách</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Mã sách" 
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
                    name="publishYear" 
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Nhà xuất bản</Form.Label>
                <Form.Select 
                    defaultValue="Chọn nhà xuất bản" 
                    name="publisher" 
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
                <Form.Control as="textarea" rows={8} name="description" onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary float-end" onClick={handleClick}>
                Lưu
            </Button>
        </Form>
    </Box>
    </>)
}

export default AddBook;
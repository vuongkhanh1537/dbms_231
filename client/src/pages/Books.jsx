import { Box } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { delBook, fetchAllBook, fetchPublishers } from '../services/BookServices';

const Books = () => {
    const navigate = useNavigate();
    const columns = [
        { field: 'BookID', headerName: 'ID', width: 90, },
        {
          field: 'Title',
          headerName: 'Tên sách',
          width: 100,
          flex: 1,
          headerAlign: "center",
          align: "center"
        },
        {
          field: 'ISBN',
          headerName: 'ISBN',
          width: 100,
          flex: 1,
          headerAlign: "center",
          align: "center"
        },
        {
            field: 'AvailableQuantity',
            headerName: 'Số lượng sẵn có',
            width: 100,
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: 'UnitPrice',
            headerName: 'Đơn giá',
            width: 100,
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: 'Author',
            headerName: 'Tác giả',
            width: 100,
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: 'PublisherID',
            headerName: 'Nhà xuất bản',
            width: 100,
            flex: 1,
            headerAlign: "center",
            align: "center",
            valueGetter: (params) => {
                return publishers[params.row.PublisherID - 1];
            }
        },
    ];
    const [rows, setRows] = useState([]);

    const [selectionModel, setSelectionModel] = useState([]);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        getPublisher();
        getBooks();
    }, []);

    const getPublisher = async () => {
        let res = await fetchPublishers();
        if (res && res.data) {
            const list = res.data.map(item => item.Name);
            setPublishers(list);
        }
    }

    const getBooks = async () => {
        try {
            let res = await fetchAllBook();
            console.log(res.data);
            if (res && res.data) {
                setRows(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = (params) => { 
        const id = params.row.BookID;
        navigate("" + id);
    }

    const deleteBook = async (id) => {
        try {
            let res = await delBook(id);
            if (res) {
                getBooks();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteClick = () => {
        selectionModel.forEach((value) => {deleteBook(value)})
    }
    return (
        <>
        <Box
            m = "20px 20px"
            sx={{ height: "fit-content", width: '80%'}}> 
            <h5>Quản lý danh sách các cuốn sách</h5>
            <div className="button-list">
                <Button 
                    variant="danger mb-3" 
                    disabled={selectionModel.length === 0}
                    onClick={handleDeleteClick}
                    >Xoá sách
                </Button>
                <Button 
                    variant="primary mb-3" 
                    onClick={()=>{navigate("add")}}
                >Thêm sách
                </Button>
            </div>
            <DataGrid 
                getRowId={(row) => row.BookID}
                rows={rows}
                columns={columns}
                onRowClick={handleClick}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
                }} 
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection);
                }}
                selectionModel={selectionModel}
                sx={{
                    boxShadow: 2,
                    borderRadius: 3,
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },

                    '& .MuiDataGrid-columnHeaderTitle' : {
                        fontWeight: 700,
                    }
                }}
            />
        </Box>
        </>
    )
}

export default Books;
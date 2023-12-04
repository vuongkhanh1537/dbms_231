import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database: "db_btl"
})

app.use(express.json())
app.use(cors())

db.connect((err) => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to mysql server')
})


app.get("/", (req, res) => {
    res.json("Hello this is back end!")
})

//Lấy danh sách toàn bộ các cuốn sách
app.get("/books", (req, res) => {
    const q = "SELECT * FROM book"
    db.query(q,(err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`description`,`cover`) VALUE (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created");
    })
})

app.post("/api/func/countSoldBook", (req, res) => {
    const q = "SELECT countSoldBooks(?) AS data";
    const values = [
        req.body.BookId,
        req.body.timestart,
        req.body.timeend,
    ];

    console.log(req.body);

    db.query(q,[values], (err, data) => {
        console.log(data);
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.post("/api/func/calculateAbsentHours", (req, res) => {
    const q = "SELECT calculateAbsentHours(?) AS data";
    const values = [
        req.body.EmployeeId,
        req.body.timestart,
        req.body.timeend,
    ];

    console.log(req.body);

    db.query(q,[values], (err, data) => {
        console.log(data);
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.post("/api/func/mostSoldBooks", (req, res) => {
    const q = "CALL mostSoldBooks(?)";
    const values = [
        req.body.Number,
        req.body.timestart,
        req.body.timeend,
    ];

    db.query(q,[values], (err, data) => {
        console.log(data);
        if (err) return res.json(err)
        return res.json(data);
    })
    
})

app.listen(8800, () => {
    console.log("Connected to backend!!");
})
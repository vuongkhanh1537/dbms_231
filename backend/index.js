import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database: "db_btl_2"
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
    res.json("Hello this is back end of book management!")
})

app.get("/publishers", (req, res) => {
    const q = "SELECT Name FROM publisher"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
//Lấy danh sách toàn bộ các cuốn sách
app.get("/books", (req, res) => {
    const q = "CALL getBookList()";
    db.query(q,(err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = `SELECT * FROM book WHERE BookID = ${bookId}`;

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0]);
    })
})


app.post("/books",async (req, res) => {
    try {
    let q = `SELECT PublisherID from publisher WHERE Name = "${req.body.publisher}"`; 
    const publiserRes = await new Promise((resolve, reject) => {
        db.query(q, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
    
    const publiserID = publiserRes[0].PublisherID;

    q = "CALL insertbook(?)";
    const values = [
        req.body.ISBN,
        req.body.title,
        req.body.description,
        req.body.quantity,
        req.body.unitPrice,
        req.body.author,
        req.body.publishYear,
        publiserID,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(201).json("Successful");
    })
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    const deleteQuery = `CALL DeleteBook(${bookId})`;

    db.query(deleteQuery, [bookId], (err, result) => {
        if (err) {
            console.error('Error deleting book: ', err);
            return res.status(500).json('Error deleting book');
        }

        return res.status(200).json('Book has been deleted');
    });
});

app.put('/books/:id', (req, res) => {
    try {
        const q = `CALL UpdateBook(?)`;
        const values = [
            req.body.BookID,
            req.body.Title,
            req.body.Description,
            req.body.AvailableQuantity,
            req.body.UnitPrice,
            req.body.Author,
            req.body.PublishYear,
            req.body.PublisherID
        ]
    
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Successful");
        })
    } catch (err) {
        console.log(err);
    }
})

app.post("/api/func/countSoldBook", (req, res) => {
    try {
        const q = "SELECT countSoldBooks(?) AS data";
        const values = [
            req.body.BookId,
            req.body.timestart,
            req.body.timeend,
        ];
    
        db.query(q,[values], (err, data) => {
            if (err) return res.json(err)
            return res.json(data);
        })
    } catch (err) {
        console.log(err);
    }
})

app.post("/api/prod/mostSoldBooks", (req, res) => {
    const q = "CALL mostSoldBooks(?)";
    const values = [
        req.body.num,
        req.body.timestart,
        req.body.timeend,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0]);
    })

})

app.listen(8800, () => {
    console.log("Connected to backend!!");
})
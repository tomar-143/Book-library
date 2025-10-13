const express = require('express');
const router = express.Router();
const Library = require("../models/Library")
const Feedback=require("../models/Feeback")

router.get("/books", async (req, res) => {
  try {
    const bookDetails = await Library.find()
    res.json(bookDetails);
  }
  catch (err) {
    res.status(500).json({ error: err.message });

  }
})

router.post("/books", async (req, res) => {
  // console.log(req.body.book_name);
  try {

    // console.log(req.body);
    console.log(req.body.book_name);
    //    const data= new Library({
    //                     book_name: req.body.book_name,
    //                     book_author: req.body.book_author,
    //                     book_page_number: req.body.book_page_number,
    //                     book_price: req.body.book_price,
    //                     book_edition: req.body.book_edition,
    //                     book_description: req.body.book_description,
    // }).save();
    const book = new Library(req.body);  // destructing 

    await book.save();
    return res.status(201).send({
      message: "Book inserted successfully !",
      success: true,
      book

    })



  } catch (err) {
    res.status(400).json({ error: err.message });
  }

})

router.delete("/books/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedBook = await Library.findByIdAndDelete({ '_id': req.params.id })
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", deletedBook });


  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
})


router.get("/books/:id", async (req, res) => {
  try {
    // console.log(req.params.id);

    const bookDetails = await Library.findById(req.params.id)
    // console.log(bookDetails);

    res.json(bookDetails);
  }
  catch (err) {
    res.status(500).json({ error: err.message });

  }
})

router.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
    // console.log(req.body);



    const updatedBook = await Library.findByIdAndUpdate(
      bookId,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    console.log(updatedBook);


    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book updated successfully!",
      success: true,
      updatedBook,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      success: false,
    });
  }
});

router.get("/books/search/:name", async (req, res) => {
  try {
    // console.log(req.params.name);

    const searchTerm = req.params.name;
    // console.log(searchTerm);


    const matchedBooks = await Library.find({
      book_name: { $regex: searchTerm, $options: "i" }, // i = case-insensitive
    });

    if (matchedBooks.length === 0) {
      return res.status(404).json({
        message: "No books found with that name",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Books found",
      success: true,
      result: matchedBooks,
    });

  }
  catch (err) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: err.message,
    });

  }
})

router.post("/feedback", async (req, res) => {
  // console.log(req.body.book_name);
  console.log(req.body);
  
  try {

    const response = new Feedback(req.body);  // destructing 

    await response.save();
    return res.status(201).send({
      message: "Feedback send successfully !",
      success: true,
      response

    })



  } catch (err) {
    res.status(400).json({ error: err.message });
  }

})







module.exports = router;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook,updateBook } from '../Redux/bookSlice';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function ViewBooks() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookReducer.books || []);
  const [show, setShow] = useState(false);
  const [currentBook, setCurrentBook] = useState({ id: '', title: '', author: '' });

  const handleClose = () => setShow(false);
  const handleShow = (book) => {
    setCurrentBook(book);
    setShow(true);
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateBook({
      id:currentBook.id,
      title:currentBook.title,
      author:currentBook.author
    }))
   
    handleClose();
  };

  return (
    <div className="book-list d-flex">
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        books.map((book) => (
          <Card style={{ width: '18rem', margin: '10px' }} key={book.id} className='lg-6'>
            <Card.Img variant="top" height={"150px"} src="data:image/png;base64,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" />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Author: {book.author}</Card.Text>
              <Button variant="primary" onClick={() => handleShow(book)}>
                Edit
              </Button>
              <Button style={{marginLeft:"120px"}} variant="danger" onClick={() => handleDeleteBook(book.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      )}

      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                value={currentBook.title}
                onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })}
                placeholder="Enter Book Title"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={currentBook.author}
                onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })}
                placeholder="Enter Author"
                required
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewBooks;


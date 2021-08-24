import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import im from './im.jpg'

export class Search extends Component {
    state={
        query:'',
        searchBooks:[],
        value:'none'
        
    }
    
    updateQuery = (query) => {
        this.setState(() => ({
          query: query
        
        }))


        BooksAPI.search(query)
        .then((books) => {
          if(Array.isArray(books)){
            this.setState(() => ({
                searchBooks: books
            }))
          }else
          this.setState(() => ({
            searchBooks: []
        }))
        })


        console.log(this.state.searchBooks);
      }
     
      changeShelf=(e,book)=>{

        const Value = e.target.value;
        
      
        
        
        BooksAPI.update(book,Value)
        .then(() => {
         this.props.handleUpdate()
            })
            }  
 defaultBook = (books,searchBook)=>{
let isFound= books.find((book=>book.id===searchBook.id))
if(isFound){
  return isFound.shelf
}
else{
  return 'none'
}

 }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">

              <input type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
                </div>
                </div>
                <div className="search-books-results">
                 <ol className="books-grid">
                 {    
                   this.state.searchBooks && ( this.state.searchBooks.map((book)=>(
                      
               
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ typeof book.imageLinks =='undefined' ? im : book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select  value={this.defaultBook(this.props.books,book)} onChange={(e)=>this.changeShelf(e,book)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>                               
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                      
                       )))  }
              
             </ol>
                
                
               
              
          
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          </div>
          
        )
    }
}

export default Search

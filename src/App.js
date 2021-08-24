 import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route } from 'react-router-dom'
import { Search } from './search'
import { BookShelves } from './bookShelves'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[]
    
  }
  updateBooks= ()=>{
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  componentDidMount() {
   this.updateBooks()
  }
  render() {
    return (
      <div className="app">
       
     
     <Route exact path='/search' render={()=>(
        <Search books={this.state.books} handleUpdate={this.updateBooks}/>
      )
      }
      />
     
     
     <Route exact path='/' render={()=>(
        <BookShelves books={this.state.books} handleUpdate={this.updateBooks} />
      )
      }
      />
       
          
        
      </div>
    )
  }
}

export default BooksApp

import {useEffect,useState} from 'react'
import './App.css';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v,i)=>i);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/posts?page=${pageNumber}`)
      .then(res => res.json())
      .then(({totalPages,posts})=>{
        console.log(totalPages,posts);
        setNumberOfPages(totalPages);
        setPosts(posts);
      })
  },[pageNumber])

  const goToPrevious = ()=>{
    setPageNumber(Math.max(1,pageNumber - 1));
  };

  const goToNext = ()=>{
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  return (
    <div className="App">
      <h3>Page of {pageNumber}</h3>

      {posts.map(
        post =>(
          <div key={post._id} className="post">
            <h4>{post.title}</h4>
            <p>{post.text}</p>
            </div>
        ))}
        <button onClick={goToPrevious}>Previous</button>
        {pages.map((pageIndex)=>(
          <button key={pageIndex} onClick={()=>setPageNumber(pageIndex+1)}>{pageIndex +1}</button>
        ))}
        <button onClick={goToNext}>Next</button>

      </div>
  )
}

export default App
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
        {pages.map((pageIndex)=>(
          <button onClick={()=>setPageNumber(pageIndex+1)}>{pageIndex +1}</button>
        ))}

      </div>
  )
}

export default App
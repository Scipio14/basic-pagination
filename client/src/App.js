import {useEffect,useState} from 'react'
import './App.css';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/posts?page=${pageNumber}`)
      .then(res => res.json())
      .then(({totalPages,posts})=>{
        console.log(totalPages,posts);
        setPages(totalPages);
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
        
        )
      )}
    </div>
  )
}

export default App
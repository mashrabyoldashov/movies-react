import {useEffect, useState} from 'react';
import './main.css'

function Main() {

  const [data, setData] = useState([])
  const [page, setPage] = useState("1")
  const [input, setInput] = useState("spider")

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=63eb2d11&s=${input || "spider"}&page=${page}`)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(err => {
        alert(err)
      });
  }, [input, page])


  const handleNextBtn = () => {
    setPage(x => {
      if (x == Math.floor(data?.totalResults / 10)) {
        return x = 1
      }
      return ++x
    })
  }

  const handlePrevBtn = () => {
    setPage(x => {
      if (x == 1) {
        return x = Math.floor(data?.totalResults / 10)
      }
      return --x
    })
  }

    return (
      <div className="wrapper">

  <div className="form-wrapper">
        <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search..." /> 
        
    <div className="button-group">
        <button onClick={handlePrevBtn}>
            prev
        </button>

        <button onClick={handleNextBtn}>
          next
        </button>
    </div>
</div>
        
        <div className="cards-wrapper">
            {
                data.Search?.map(item => {
                      return (
                          <div className="card" key={item?.imdbID}>
                          <img src={item?.Poster} />
                          <div className="text-wrapper">
                              <h3>Title: {item?.Title}</h3>
                              <p>Type: {item?.Type}</p>
                              <p>Year: {item?.Year}</p>
                          </div>
                        </div>
                      )
                })
            }
        </div>
      </div>
    )
}

export default Main
import {useEffect, useState} from 'react';
import './main.css'

function Main() {

  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

  const [data, setData] = useState([])
  const [page, setPage] = useState("1")
  const [input, setInput] = useState("spider")
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}&query="${input || "Spider"}`)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(err => {
        alert(err)
      });
  }, [input, page])


  const handleNextBtn = () => {
    setPage(x => {
      if (x == data?.total_pages) {
        return x = 1
      }
      return ++x
    })
  }

  const handlePrevBtn = () => {
    setPage(x => {
      if (x == 1) {
        return x = data?.total_pages
      }
      return --x
    })
  }


  console.log(data);

    return (
                        <div className="wrapper">
                        <div className="form-wrapper">
                        <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search..." /> 

                        <button onClick={handleToggle}>
                            toggle
                        </button>

                    <div className="button-group">
                        <button onClick={handlePrevBtn}>
                            prev
                        </button>
                           <h2><span>{data?.page}</span>/<span>{data?.total_pages}</span></h2>
                        <button onClick={handleNextBtn}>
                          next
                        </button>
                    </div>
                </div>
        
        <div className="cards-wrapper">
            {
                data.results?.map(item => {
                      return (
                  
                            <div className="card" key={item?.id}>
                            <img style={{width: "18.7rem"}} src={`${IMG_PATH}${item?.poster_path}`} />
                            <div className="text-wrapper">
                                <h3>Title: {item?.original_title}</h3>
                                <div className="year-vote">
                                    <p>Year: {item?.release_date}</p>
                                    <h2 style={{color: `#${Math.random().toString(16).substring(2, 8)}`}}>
                                       {item?.vote_average}
                                    </h2>
                                </div>
                               
                              <div className="item-desc">
                                <h3>
                                  overview
                                </h3>
                                <p>
                                   {item?.overview}
                                </p>
                              </div>
                        
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
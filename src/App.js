import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { ChoroplethMapPage } from "./ChoroplethMap";

export default function App() {
  const [nowYear, setYear] = useState(2011);
  const [nowMonth, setMonth] = useState(3);
  useEffect(function() {
    const intervalId = setInterval(function() {
      setMonth(nowMonth+1);
    }, 3000);
    return function(){clearInterval(intervalId)};
  }, [nowMonth]);
  
  if(nowMonth > 12){
    setYear(nowYear+1);
    setMonth(1);
  }
  if(nowYear > 2011){
    setYear(2011)
  }
  return (
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              東日本大震災に関する地域別Tweetキーワード
            </h1>
          </div>
        </div>
      </section>
        <div className="container">
          <div className="colmns is-centered">
          <div className="colmn is-half">
          <h1 className="title has-text-centered">{nowYear}年{nowMonth}月</h1>
          </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-half">
              <ChoroplethMapPage now={nowMonth}/>
            </div>
          </div>
        </div> 
      <footer className = 'footer'>
        <div className = 'container'>
            <div className = 'content has-text-centered'>
                <hr></hr>
                <p>&copy; 2020 Naoya Oda </p>
                <p><a href = "mailto:oden6680@gmail.com">oden6680@gmail.com</a></p>
            </div>
        </div>
      </footer>
    </div>
  );
}
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);

  const ref = useRef();

  useEffect(() => {
    ref.current = term;
  }, [term]);

  const ref2 = ref.current;
  useEffect(() => {
    const search = async () => {
      const res = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResult(res.data.query.search);
    };
    // if(term){
    //   search()
    // }

    if (!result.length) {
      if (term) {
        search();
      }
    } else {
      const timeOut = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [term, result.length]);

  const resultMaping = result.map((el, idx) => {
    return (
      <tr key={idx}>
        <td scop="col">{idx}</td>
        <td scop="col">{el.title}</td>
        <td scop="col">
          <span
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: el.snippet }}
          />
        </td>
      </tr>
    );
  });

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="my-3">
              <input
                placeholder="seach in wikipedia..."
                className="p-3 w-100"
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                name=""
                value={term}
              />
            </div>
          </div>
        </div>

          <div className="row">
          <div className="row">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th scop="col">#</th>
                    <th scop="col">Title</th>
                    <th scop="col">Desc</th>
                  </tr>
                </thead>
                <tbody>{resultMaping}</tbody>
              </table>
            </div>
          </div>
        </div>

    
      </div>
    </div>
  );
}

export default App;

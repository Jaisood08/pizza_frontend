import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cake from "../Common/Cake";
import Loader from "../Common/Loader";

function Search() {
  var [query, setQuery] = useSearchParams();
  var [loading, setLoading] = useState(true);
  var [searchresults, setSearchResults] = useState([]);
  var value = query.get("q");

  useEffect(() => {
    if (value) {
      axios({
        method: "get",
        url: "https://apifromashu.herokuapp.com/api/searchcakes?q=" + value,
      }).then(
        (response) => {
          console.log("response from search cakes api", response.data);
          setSearchResults(response.data.data);
          setLoading(false);
        },
        (error) => {
          console.log("Error from search cakes api", error);
          setLoading(false);
        }
      );
    }
  }, [value]);

  if (loading) {
    return <Loader />;
  } else
    return (
      <div>
        <h2>
          {" "}
          {searchresults.length} results found for {value}
        </h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {searchresults.map((cakeIt) => {
            return (
              <div class="col">
                <Cake
                  key={cakeIt.cakeid}
                  Cake={{
                    Name: cakeIt.name,
                    URL: cakeIt.image,
                    Price: cakeIt.price,
                    cakeid: cakeIt.cakeid,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Search;

import { Link, useLoaderData, useParams } from "react-router";
import { capitalizeWords } from "../utils/stringUtils";
import { useState } from "react";

export async function loader({ params }) {
  const response = await fetch(`https://www.swapi.tech/api/${params.category}`);
  const json = await response.json();

  return json;
}

export default function Category() {
  const category = useParams().category;
  const data = useLoaderData();

  const [items, setItems] = useState(data.results || []);
  const [next, setNext] = useState(data.next);

  async function loadMore() {
    if (!next) return;
    const res = await fetch(next);
    const json = await res.json();

    setItems((prev) => [...prev, ...(json.results || [])]);
    setNext(json.next);
  }

  if (category === "films") {
    return (
      <>
        <h1>{category}</h1>
        {data.result.map((e, i) => (
          <div key={i}>
            <br />
            <h2>{e.properties.title}</h2>
            {Object.entries(e.properties)
              .filter(([k]) =>
                [
                  "title",
                  "episode_id",
                  "director",
                  "producer",
                  "release_date",
                  "opening_crawl",
                ].includes(k)
              )
              .map(([type, info], i) => (
                <h3 key={i}>{`${type}: ${info}`}</h3>
              ))}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <h1 className="display-4 text-center text-capitalize">{category}</h1>
      <div className="container my-5">
        <div className="row g-3 justify-content-center">
          {items.map((e, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <Link to={`${e.url.split("/").pop()}-${e.name.replace(" ", "")}`}>
                <div className="card overflow-hidden">
                  <div className="ratio ratio-4x3">
                    <img
                      className="card-img-top object-fit-cover"
                      src={`/images/${category}/${e.name
                        .toLowerCase()
                        .replace("é", "e")
                        .split(" ")
                        .join("-")}.jpg`}
                      alt={e.name}
                    />
                  </div>
                  <div className="card-body align-content-end text-end fs-5 bg-black bg-gradient bg-op h-25 mt-auto p-2">
                    <span className="card-text text-capitalize">{e.name}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {next && (
            <div className="text-center mt-5 ">
              <button
                className="btn btn-outline-warning fs-5"
                onClick={loadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

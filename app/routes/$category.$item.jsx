import { useLoaderData, useParams } from "react-router";

export async function loader({ params }) {
  const index = params.item.split("-")[0];
  const category = params.category;

  const response = await fetch(`https://swapi.tech/api/${category}/${index}`);
  const data = await response.json();

  return data.result.properties;
}

export default function Item() {
  const params = useParams();
  const data = useLoaderData();
  const dataArr = Object.entries(data).filter(
    ([k]) => !["created", "edited"].includes(k)
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-8">
          <img
            className="img-fluid object-fit-cover"
            src={`/images/${params.category}/${data.name
              .toLowerCase()
              .replace("é", "e")
              .replace(" ", "-")}.jpg`}
          />
        </div>
        <div className="col-12 col-lg-4">
          {dataArr.map(([property, info], i) => (
            <div className="row" key={i}>
              <span className="col-3 text-capitalize">{property}</span>
              <span className="col-9 text-capitalize">{info}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

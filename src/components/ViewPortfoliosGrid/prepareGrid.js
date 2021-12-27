import { Link } from "react-router-dom";

export default function prepareGrid(portfolio) {
    return portfolio.map((elem) => {
      const updatedElem = {...elem};
      updatedElem.name = <Link to={`/coinbear/myportfolios/${elem.id}`}>{elem.name}</Link>;
      return (updatedElem);
    })
  };
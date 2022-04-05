import Loading from "../components/loading/Loading";
import Error from "../components/error/Error";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Loading />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <Error />;
    default:
      break;
  }
};

export default setContent;

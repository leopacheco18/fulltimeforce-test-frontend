import "./Commits.css";
import Title from "../../components/global/Title";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import CommitItem from "../../components/commits/CommitItem";
import Loading from "../../components/global/Loading";

const Commits = () => {
  const [commits, setCommits] = useState([]);
  const [page, setPage] = useState(1);
  const { isLoading, requestGet } = useHttp();

  useEffect(() => {
    getCommits();
  }, []);

  const getCommits = async () => {
    const response = await requestGet(`/commits?page=${page}`);
    setCommits(response);
  };

  return (
    <div>
      {isLoading && <Loading />}
      <Title title="Commits" reload={getCommits} />
      <div className="commits-container">
        {commits.map((commit) => (<CommitItem {...commit} />))}
      </div>
    </div>
  );
};

export default Commits;

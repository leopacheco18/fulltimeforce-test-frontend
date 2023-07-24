import "./Commits.css";
import Title from "../../components/global/Title";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import CommitItem from "../../components/commits/CommitItem";
import Loading from "../../components/global/Loading";

const Commits = () => {
  const [commits, setCommits] = useState([]);
  const { isLoading, requestGet } = useHttp();

  useEffect(() => {
    getCommits();
  }, []);

  const getCommits = async () => {
    const response = await requestGet(`/commits`);
    if(response.name === 'AxiosError'){
      return
    }
    setCommits(response);
  };

  return (
    <div>
      {isLoading && <Loading />}
      <Title title="Commits" reload={getCommits} />
      <div className="commits-container">
        {commits.map((commit, key) => (<CommitItem key={key} {...commit} />))}
      </div>
    </div>
  );
};

export default Commits;

import { BranchesOutlined, MessageOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
const CommitItem = ({ sha, commit, url, parents }) => {

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }
  
  const formatDate = (date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
  return (
    <div className="commit-item b-shadow">
      <div className="commit-item-header"><h3> Commit: {sha.substring(0, 7)}</h3></div>
      <div className="commit-item-body">
        <div className="commit-item-committer">
          <div className="commit-item-committer-icon">
            <BranchesOutlined />
          </div>
          <div className="commit-item-committer-name">
            <b>{commit.committer.name}</b> {commit.committer.email}
          </div>
        </div>
        <div className="commit-item-content">
          <p><MessageOutlined /> <b>{commit.message}</b></p>
          <p><ClockCircleOutlined /> <b>{formatDate(new Date(commit.committer.date))}</b></p>
          
          <p><BranchesOutlined /> {(parents[0] && parents[0].sha) ?  <><b>{parents[0]?.sha.substring(0, 7)}</b> (Parent commit)</> : <b>First commit</b>}</p>
        </div>
        <div className="commit-item-actions">
          <Button type="default" href={url} target="_blank" block>View</Button>
        </div>
      </div>
    </div>
  );
};

export default CommitItem;

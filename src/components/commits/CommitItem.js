import { BranchesOutlined, MessageOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
const CommitItem = ({ sha, commit, url, parents }) => {
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
          <p><ClockCircleOutlined /> <b>{commit.committer.date}</b></p>
          <p><BranchesOutlined /> <b>{parents[0]?.sha.substring(0, 7)}</b> (Parent commit)</p>
        </div>
        <div className="commit-item-actions">
          <Button type="default" href={url} target="_blank" block>View</Button>
        </div>
      </div>
    </div>
  );
};

export default CommitItem;

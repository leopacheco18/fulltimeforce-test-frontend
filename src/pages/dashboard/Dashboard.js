import { useEffect, useState } from "react";
import Title from "../../components/global/Title";
import NumberItem from "../../components/dashboard/NumberItem";
import "./Dashboard.css";
import useHttp from "../../hooks/useHttp";
import Loading from "../../components/global/Loading";
import {
  BranchesOutlined,
  CloudUploadOutlined,
  HistoryOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import DoughnutChart from "../../components/dashboard/DoughnutChart";
import TableLanguage from "../../components/dashboard/TableLanguage";
const data = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  const [commits, setCommits] = useState(0);
  const [pushes, setPushes] = useState(0);
  const [languageStats, setLanguageStats] = useState([]);
  const [languageStatsChart, setLanguageStatsChart] = useState({ ...data });
  const [lastCommit, setLastCommit] = useState({});
  const { isLoading, requestGet } = useHttp();

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    const responseCommits = await requestGet("/commits/count");
    const responsePushes = await requestGet("/commits/pushes");
    const responseLanguageStats = await requestGet("/commits/languages");
    const responseLastCommit = await requestGet("/commits/last-commit");
    if (
      [
        responseCommits.name,
        responsePushes.name,
        responseLanguageStats.name,
        responseLastCommit.name,
      ].includes("AxiosError")
    ) {
      return;
    }
    setCommits(responseCommits);
    setPushes(responsePushes);
    setLanguageStats(
      Object.keys(responseLanguageStats).map((key) => ({
        language: key,
        lines: responseLanguageStats[key],
        percent:
          (
            (responseLanguageStats[key] /
              Object.values(responseLanguageStats).reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(2) + "%",
      }))
    );
    setLastCommit(responseLastCommit[0] ? responseLastCommit[0].commit : {});
    setLanguageStatsChart({
      ...data,
      labels: Object.keys(responseLanguageStats),
      datasets: [
        {
          ...data.datasets[0],
          label: "Percent",
          data: Object.keys(responseLanguageStats).map((key) =>
            (
              (responseLanguageStats[key] /
                Object.values(responseLanguageStats).reduce(
                  (a, b) => a + b,
                  0
                )) *
              100
            ).toFixed(2)
          ),
        },
      ],
    });
  };

  return (
    <div>
      {isLoading && <Loading />}
      <Title title="Dashboard" reload={getDashboard} />
      <div className="dashboard-container">
        <NumberItem
          icon={<BranchesOutlined />}
          title="Commits"
          number={commits}
        />
        <NumberItem
          icon={<CloudUploadOutlined />}
          title="Pushes"
          number={pushes}
        />
        <NumberItem
          icon={<HistoryOutlined />}
          title="Last Commit"
          number={lastCommit.message}
          customClass="last-commit-label"
        />
        <NumberItem
          icon={<CodeOutlined />}
          title="Languages"
          number={Object.keys(languageStats).length}
        />

        <DoughnutChart title={"Language stats"} data={languageStatsChart} />
        <TableLanguage title={"Language stats"} data={languageStats} />
      </div>
    </div>
  );
};

export default Dashboard;

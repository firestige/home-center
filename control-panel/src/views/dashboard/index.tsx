import {useEffect, useState} from "react";

const Dashboard: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (<></>)
};

export default Dashboard;

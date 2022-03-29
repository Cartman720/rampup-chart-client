import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { API, logOut, TOKEN_COOKIE } from "../lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface User {
  id: string;
  username: string;
}

interface Point {
  x: number;
  y: number;
}

type DataState = [Point[], Point[]];

const Home: NextPage = () => {
  const [series, setSeries] = useState<DataState>([[], []]);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const options = useMemo(
    () => ({
      title: {
        text: "Ramp Up - Online Data",
      },
      series: [
        {
          data: series[0],
        },
        {
          data: series[1],
        },
      ],
      xAxis: {
        type: "datetime",
        ordinal: true,
      },
      chart: {
        zoomType: "x",
        style: {
          fontFamily: "Roboto",
        },
      },
      colors: ["#6366f1", "#f39c12"],
    }),
    [series]
  );

  const getUser = async () => {
    const { data } = await API.get("/users/details");
    setUser(data);
  };

  const mapSeriesData = (dataSet: Point[], newDataSet: Point[]) => {
    const threeMinDataSize = 180 * 4;

    return [...dataSet, ...newDataSet]
      .sort((a, b) => a.x - b.x)
      .slice(-threeMinDataSize);
  };

  const getData = async () => {
    const { data } = await API.get("/data");

    console.log(data);

    setSeries((currentSeries) => [
      mapSeriesData(currentSeries[0], data[0]),
      mapSeriesData(currentSeries[1], data[1])
    ]);
  };

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        getData();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [user]);

  const handleLogout = () => {
    logOut();
    router.push("/login");
  };

  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE);

    if (!token) {
      router.push("/login");
    } else {
      getUser();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Ramp Up - sample app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="justify-center h-screen w-screen bg-slate-200">
        <header className="w-full bg-indigo-500 py-2 px-5 mb-5">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-white"> Welcome {user?.username}</div>

            <div>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </main>
    </div>
  );
};

export default Home;

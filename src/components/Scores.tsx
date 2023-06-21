import Image from "next/image";
import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "~/utils/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["1", "2", "2", "4", "5", "6", "x"];

const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
      backgroundColor: "rgba(34, 197, 94, 0.8)",
      borderColor: "#000",
    },
  },
  responsive: true,
  dark: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  barPercentage: 1,
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        font: {
          size: 14,
          family: "Inter",
        },
        color: "#ffffff",
        stepSize: 1,
        suggestedMax: 6,
      },
      reverse: true,
      grid: {
        color: "#6b7280",
      },
      title: {
        text: "Number of Guesses",
        display: true,
        color: "#FFF",
        padding: 10,
      },
    },
    x: {
      beginAtZero: false,
      ticks: {
        font: {
          size: 14,
          family: "Inter",
        },
        color: "#ffffff",
        stepSize: 1,
      },
      grid: {
        display: false,
      },
      title: {
        text: "Number of Songs",
        display: true,
        color: "#FFF",
        padding: 10,
      },
    },
  },
  maintainAspectRatio: false,
};

function Scores() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [graphData, setGraphData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const stats = api.songs.getScores.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.log(err);
      setError(true);
    },
    onSuccess: (data) => {
      const scoreArr = [0, 0, 0, 0, 0, 0, 0];
      if (data?.scores?.length !== 0) {
        data?.scores?.map((score) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          scoreArr[score?.num_guesses - 1] = score?._count?.id;
        });
        setGraphData(scoreArr);
      }
    },
  }).data!;

  if (error) {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        modalHeader="Heardle Stats"
      >
        <div>
          <p className="text-sm md:text-lg">
            Theres been a problem fetching the scores. Please try again later.
          </p>
        </div>
      </Modal>
    );
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Image
        src={"/assets/analytics.svg"}
        alt="stats"
        width={30}
        height={30}
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        modalHeader="Heardle Stats"
      >
        <div className=" h-full w-full p-2">
          <div className="m-2 flex flex-row items-center justify-between p-2">
            <div className="flex w-20 flex-col items-center justify-center rounded-md border border-slate-700 bg-black/50 p-1 text-center">
              <p className="text-sm font-bold md:text-lg">
                {stats?.totalGames}
              </p>
              <p className="text-md text-gray-400">Played</p>
            </div>
            <div className="flex w-20 flex-col items-center justify-center rounded-md border border-slate-700 bg-black/50 p-1 text-center">
              <p className="text-sm font-bold md:text-lg">{stats?.wins}</p>
              <p className="text-md text-gray-400">Wins</p>
            </div>
            <div className="flex w-20 flex-col items-center justify-center rounded-md border border-slate-700 bg-black/50 p-1  text-center">
              <p className="text-sm font-bold md:text-lg">{stats?.losses}</p>
              <p className="text-md text-gray-400">Losses</p>
            </div>
          </div>
          <div className="w-fullflex-grow mt-3 flex h-72 items-center ">
            <Bar
              options={options}
              data={{
                labels,
                datasets: [
                  {
                    label: "Number of songs",
                    data: graphData,
                  },
                ],
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Scores;

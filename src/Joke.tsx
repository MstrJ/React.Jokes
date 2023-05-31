import axios from "axios";
import { useState, useEffect } from "react";

interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}
const JokeView = (props: { setup: string; punchline: string }) => {
  const [showBtn, setShowBtn] = useState(false);
  return (
    <div>
      <b>{props.setup}</b>
      <div className="flex flex-row gap-2">
        <div
          onClick={() => setShowBtn(!showBtn)}
          className="cursor-pointer underline decoration-1"
        >
          {showBtn ? "Hide" : "Show "}
        </div>
        <div className={`${showBtn ? "" : "hidden"}`}>{props.punchline}</div>
      </div>
    </div>
  );
};

const JokeCard = () => {
  const [data, setData] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      const response = await axios.get<Joke>(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <div className="bg-slate-800 px-4 py-4 rounded-md w-fit">
        <div>
          {isLoading ? (
            "Loading..."
          ) : data == null ? (
            "lol"
          ) : (
            <JokeView setup={data.setup} punchline={data.punchline} />
          )}
        </div>
      </div>
      <button
        className={`px-2 py-2 mt-2`}
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          fetchData();
        }}
      >
        New Joke
      </button>
    </div>
  );
};

export default JokeCard;

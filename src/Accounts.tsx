import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
interface Account {
  _id: string;
  Type: string;
  Name: string;
  Password: string;
  Permission: number;
}
type FormData = {
  name: string;
  password: string;
};

const Form = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(
        `https://localhost:7232/CreateUser?Name=${data.name}&Password=${data.password}`
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" {...register("name")} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" {...register("password")} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
const ShowAccounts = () => {
  const [data, setData] = useState<Account[]>();

  useEffect(() => {
    const accounts = async () => {
      try {
        const response = await axios.get<Account[]>(
          "https://localhost:7232/GetAccounts"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    accounts();
  }, [data]);
  return (
    <div>
      {/* <div>{JSON.stringify(data, null, 2)}</div> */}
      <Form />
      <div>
        {data?.map((x) => {
          return (
            <div key={x._id}>
              <b>- {x.Type == "Admin" ? `Admin ${x.Name}` : `${x.Name}`}</b>
              <div>Password: {x.Password}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAccounts;

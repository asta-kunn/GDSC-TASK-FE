import TodosCard from "@/components/todos/TodosCards";
import axios from "axios";
import { TodosForm } from "components/todos";
import React, { useEffect, useState } from "react";

const TodosMenu = () => {
  const [todosData, setTodosData] = useState([]);
  const [isDataCreated, setIsDataCreated] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isDataDeleted, setIsDataDeleted] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/todos`
        );
        const data = res.data.data;
        setTodosData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
  }, [isDataCreated, isDataUpdated, isDataDeleted, todosData]);


  return (
    <div className="py-10 p-5 md:p-10 bg-white">
      <p className="text-3xl font-bold py-6 text-black">TODOS</p>
      <TodosForm setIsDataCreated={setIsDataCreated} />
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {todosData.map((todo) => (
          <TodosCard
            key={todo.id}
            setIsDataDeleted={setIsDataDeleted}
            setIsDataUpdated={setIsDataUpdated}
            {...todo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodosMenu;

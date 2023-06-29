import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoaderIcon, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { ButtonForm } from "components/elements";
import DatePicker from "react-datepicker";

export const TodosForm = ({ setIsDataCreated }) => {
  const router = useRouter();
  const [loadingForm, setLoadingForm] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [fields, setFields] = useState({
    title: "",
    description: "",
    status: false,
    priority: "HIGH",
  });

  const typesPriority = [
    {
      value: "HIGH",
      label: "HIGH",
    },
    {
      value: "MEDIUM",
      label: "MEDIUM",
    },
    {
      value: "LOW",
      label: "LOW",
    },
  ];

  const handleFields = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForm(true);

    if (Object.keys(fields).length !== 0) {
      const data = {
        ...fields,
        due_date: dueDate.toISOString().slice(0, 10), // Format due_date to YYYY-MM-DD
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/todos`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        e.target.reset();
        toast.success("Todo created successfully");
        setLoadingForm(false);
        setIsDataCreated(true);
        router.replace(router.asPath);
      }
    } else {
      toast.error("Please fill the form");
      setLoadingForm(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col space-y-4 rounded-2xl shadow-lg p-5 text-black"
      >
        <TextField
          onChange={handleFields}
          label="Title"
          type="text"
          id="title"
          name="title"
          required
        />
        <TextField
          onChange={handleFields}
          label="Description"
          type="text"
          id="description"
          name="description"
          required
        />          
        <FormControl>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            label="Status"
            value={fields.status}
            onChange={(e) => handleFields(e)}
            name="status"
            required
          >
            <MenuItem value={true}>Done</MenuItem>
            <MenuItem value={false}>Not Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            labelId="priority"
            id="priority"
            label="Priority"
            value={fields.priority}
            onChange={(e) => handleFields(e)}
            name="priority"
            required
          >
            {typesPriority.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex flex-col space-y-2">
            <label htmlFor="due_date">Due Date</label>
            <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="yyyy/MM/dd"
          minDate={new Date()}
          placeholderText="Due Date"
          portalId="root-portal"
          className="w-full p-2 cursor-pointer rounded focus:outline-none focus:ring focus:ring-violet-300"
          required
        />   
        </div>
        <div className="flex justify-center">
          {loadingForm ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<LoaderIcon />}
              variant="outlined"
            >
              SAVING
            </LoadingButton>
          ) : (
            <ButtonForm type="submit" className="w-48">
              Add Bundle
            </ButtonForm>
          )}
        </div>
      </form>
    </div>
  );
};

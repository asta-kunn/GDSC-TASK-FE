import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Modal,
  Select,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { LoaderIcon, toast } from "react-hot-toast";
const TodosEditModal = (props) => {
  const { open, onClose, data, setOpenEditModal } = props;
  if (!open) {
    return null;
  }

  const [loadingEditTodos, setLoadingEditTodos] = useState(false);
  const [fields, setFields] = useState(data);
  const [status, setStatus] = useState(fields.status);
  const [priority, setPriority] = useState(fields.priority);
  const router = useRouter();
  const modalStyle = {
    position: "fixed",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    width: "80%",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    padding: "20px",
  };

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

  const typesStatus = [
    {
      value: true,
      label: "DONE",
    },
    {
      value: false,
      label: "NOT DONE",
    },
  ];

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

//   get id todos from data
    const id = data.id;
    console.log(id);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoadingEditTodos(true);
    console.log(fields);
    try {
      const updateData = { ...fields, status: status, priority: priority };
      updateData.id = data.id;
      const isUpdated = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/${data.id}`,
        updateData
      );
      setLoadingEditTodos(false);
      setOpenEditModal(false);
      toast.success("Todo updated successfully");
      router.replace(router.asPath);
    } catch (error) {
      setLoadingEditTodos(false);
      setOpenEditModal(false);
      toast.error("Something went wrong");
      router.replace(router.asPath);
    }
  };

  const handleEditFields = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
      status: name === "status" ? value : prev.status,
      priority: name === "priority" ? value : prev.priority,
    }));
  };

  return (
    <Modal
      keepMounted
      closeAfterTransition
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <p className="text-center text-gray-500 font-semibold text-2xl">
          Edit Meeting Todos
        </p>
        <form
          onSubmit={handleEditSubmit}
          className="flex flex-col space-y-4 rounded-2xl shadow-lg p-5"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="status" className="text-gray-500 font-semibold">
              Status
            </label>

            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id={`status-${fields.id}`}
                name="status"
                value={status}
                label="Status"
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                {typesStatus.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="priority" className="text-gray-500 font-semibold">
              Priority
            </label>
            <FormControl fullWidth>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                labelId="priority"
                id={`priority-${fields.id}`}
                name="priority"
                value={priority}
                label="Priority"
                onChange={(e) => handlePriorityChange(e.target.value)}
              >
                {typesPriority.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-center">
            {loadingEditTodos ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<LoaderIcon />}
                variant="outlined"
              >
                SAVING
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="outlined"
                color="info"
                className="w-48"
              >
                Edit Meeting Todos
              </Button>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TodosEditModal;

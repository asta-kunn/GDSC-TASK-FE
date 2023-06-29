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
  IconButton,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { LoaderIcon, toast } from "react-hot-toast";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

const TodosCard = ({
  id,
  title,
  description,
  status,
  priority,
  due_date,
  setIsDataUpdated,
  setIsDataDeleted,
}) => {
  const getStatusText = () => {
    if (status) {
      return "Done";
    } else {
      return "Not Done";
    }
  };

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loadingOpenModal, setLoadingOpenModal] = useState(false);
  const [fields, setFields] = useState({
    id,
    title,
    description,
    status,
    priority,
    due_date,
  });
  const [statusValue, setStatusValue] = useState(status);
  const [priorityValue, setPriorityValue] = useState(priority);
  const router = useRouter();

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    width: "80%",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    padding: "20px",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loadingEditTodos, setLoadingEditTodos] = useState(false);

  const handleOpenModalEdit = async () => {
    setLoadingOpenModal(true);
    setOpenEditModal(true);
    setLoadingOpenModal(false);
  
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`);
    const { data } = response;

    setFields(data);
    setStatusValue(data.status);
    setPriorityValue(data.priority);

    setLoadingOpenModal(false);
    
  };  
  

  const handleCloseModalEdit = () => setOpenEditModal(false);

  const handleStatusChange = (value) => {
    setStatusValue(value);
  };

  const handlePriorityChange = (value) => {
    setPriorityValue(value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...fields,
      status: statusValue,
      priority: priorityValue,
    };

    try {
      setLoadingOpenModal(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
        updatedData
      );

      if (response.status === 200) {
        toast.success("Todo updated successfully");
        setOpenEditModal(false);
        router.replace(router.asPath);
        setIsDataUpdated(true);
      } else {
        toast.error("Failed to update todo");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setLoadingOpenModal(false);
  };

  const handleEditFields = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`
      );

      if (response.status === 200) {
        toast.success("Success Delete Todo");
        setOpen(false);
        router.replace(router.asPath);
        setIsDataDeleted(true);
      } else {
        toast.error("Failed Delete Todo");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full md:w-[300px] p-5 md:p-3 mt-8 gap-5 rounded-2xl border-2 justify-between">
      <div className="relative z-10">
        <p className="text-xl font-semibold text-black">{title}</p>
        <p className="text-black">{description}</p>
        <p className="text-black">Status: {getStatusText()}</p>
        <p className="text-black">Priority: {priority}</p>
        <p className="text-black">Due Date: {due_date}</p>

        <div className="flex items-center space-x-1 justify-end">
          <IconButton onClick={handleDelete}>
            <TrashIcon color="red" width={25} height={25} />
          </IconButton>
          <IconButton onClick={handleOpenModalEdit}>
            <PencilSquareIcon color="blue" width={25} height={25} />
          </IconButton>
        </div>

        <Modal
          keepMounted
          closeAfterTransition
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-center uppercase text-red-500 font-semibold"
            >
              Warning!
            </Typography>
            <Typography id="modal-modal-description" className="text-black" sx={{ mt: 2 }}>
              Are you sure you want to delete this todo?
            </Typography>
            <Button onClick={handleDelete} className="mt-3" variant="outlined" color="error">
              Delete Now
            </Button>
          </Box>
        </Modal>

        {loadingOpenModal ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Backdrop>
        ) : (
          <Modal
            keepMounted
            closeAfterTransition
            open={openEditModal}
            onClose={handleCloseModalEdit}
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
        )}
      </div>
    </div>
  );
};

export default TodosCard;

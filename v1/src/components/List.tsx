import React, { useState } from "react";
import Task from "./Task";
import { ListItem } from "./types";
import { Box, Button, TextField } from "@mui/material";

interface TaskProps {
  left: ListItem[];
  middle: ListItem[];
  right: ListItem[];
  setLeft: React.Dispatch<React.SetStateAction<ListItem[]>>;
  setMiddle: React.Dispatch<React.SetStateAction<ListItem[]>>;
  setRight: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

function List({ left, middle, right, setLeft, setMiddle, setRight }: TaskProps)  {
  
  const [newTitle, setNewTitle] = useState(""); // Stan dla tytułu nowego zadania
  const [newDescription, setNewDescription] = useState(""); // Stan dla opisu nowego zadania

  const addNewItem = () => {
    if (newTitle) {
      const newId =
        left.length > 0 ? Math.max(...left.map((item) => item.id)) + 1 : 1;
      const newItem = {
        id: newId,
        title: newTitle,
        description: newDescription,
      };
      setLeft([...left, newItem]);
      setNewTitle("");
      setNewDescription("");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Task
        left={left}
        middle={middle}
        right={right}
        setLeft={setLeft}
        setMiddle={setMiddle}
        setRight={setRight}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={1}
        width="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          marginRight={2}
        >
          <TextField
            required
            id="outlined-required"
            label="Required"
            sx={{ width: 250 }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            maxRows={6}
            variant="filled"
            sx={{ marginTop: 1, width: 250 }}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          disabled={!newTitle}
          sx={{ marginBottom: 6 }}
          onClick={addNewItem}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
}

export default List;

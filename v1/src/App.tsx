import React, { useEffect, useState } from "react";
import List from "./components/List";
import { ListItem, Lists } from "./components/types";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemButton,
  ListItemText,
  ListItem as MuiListItem,
  List as MultiList,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";

const initialLeft: ListItem[] = [
  {
    id: 1,
    title: "Projekt terenu",
    description: "Opracowanie koncepcji zagospodarowania przestrzennego",
  },
  {
    id: 2,
    title: "Dobór gatunków",
    description: "Selekcja gatunków zwierząt do hodowli w zoo",
  },
  {
    id: 3,
    title: "Zgoda na budowę",
    description: "Uzyskanie niezbędnych pozwoleń na budowę",
  },
  {
    id: 4,
    title: "Projektowanie wybiegów",
    description: "Opracowanie szczegółowych planów wybiegów dla zwierząt",
  },
];

const initialMiddle: ListItem[] = [
  {
    id: 5,
    title: "Budowa infrastruktury",
    description: "Rozpoczęcie prac budowlanych i tworzenie infrastruktury",
  },
  {
    id: 6,
    title: "Program ochrony gatunków",
    description: "Opracowanie programów ochrony dla zagrożonych gatunków",
  },
  {
    id: 7,
    title: "Rekrutacja personelu",
    description:
      "Zatrudnienie kierowników działów, opiekunów zwierząt i personelu pomocniczego",
  },
  {
    id: 8,
    title: "Marketing i promocja",
    description:
      "Rozpoczęcie kampanii promocyjnej mającej na celu zwiększenie świadomości o nowym zoo",
  },
];

const initialRight: ListItem[] = [
  {
    id: 9,
    title: "Przygotowanie zwierząt",
    description: "Aklimatyzacja zwierząt do nowego środowiska",
  },
  {
    id: 10,
    title: "Otwarcie zoo",
    description: "Oficjalne otwarcie ogrodu zoologicznego dla publiczności",
  },
  {
    id: 11,
    title: "Monitorowanie zwierząt",
    description:
      "Regularne sprawdzanie stanu zdrowia i dobrego samopoczucia zwierząt",
  },
  {
    id: 12,
    title: "Edukacja ekologiczna",
    description:
      "Rozpoczęcie programów edukacyjnych dla szkół i grup zwiedzających",
  },
];

const initialMenu: Lists[] = [
  {
    id: 1,
    title: "Zoo",
    description: "Plan założenia ogrodu botanicznego",
    left: initialLeft,
    middle: initialMiddle,
    right: initialRight,
  },
  {
    id: 2,
    title: "Zoo2",
    description: "Plan założenia ogrodu botanicznego2",
    left: initialLeft,
    middle: initialMiddle,
    right: initialRight,
  },
];

function App() {
  const [selectedMenu, setSelectedMenu] = useState<Lists | null>(null);

  const [left, setLeft] = useState<ListItem[]>([]);
  const [middle, setMiddle] = useState<ListItem[]>([]);
  const [right, setRight] = useState<ListItem[]>([]);

  const [title, setTitle] = useState<String>();
  const [description, setDescription] = useState<String>();

  const [open, setOpen] = React.useState(false);

  const [menu, setMenu] = useState<Lists[]>(initialMenu);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedMenu) {
      setLeft(selectedMenu.left);
      setMiddle(selectedMenu.middle);
      setRight(selectedMenu.right);
      setTitle(selectedMenu.title);
      setDescription(selectedMenu.description);
    }
  }, [selectedMenu]);
  const handleToggle = (value: Lists) => () => {
    setSelectedMenu(value);
  };

  const addNewList = (title: string, description: string) => {
    const maxId = menu.reduce((max, item) => Math.max(max, item.id), 0);
    const newId = maxId + 1;
    const newList = {
      id: newId,
      title,
      description,
      left: [],
      middle: [],
      right: [],
    };

    setSelectedMenu(newList);
    setMenu((prevMenu) => [...prevMenu, newList]);
  };

  const handleDelete = (listId: number) => {
    setMenu((prevMenu) => prevMenu.filter((item) => item.id !== listId));
    if (selectedMenu && selectedMenu.id === listId) {
      setSelectedMenu(null);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="up"
      justifyContent="left"
      p={1}
      width="100%"
    >
      <MultiList
        sx={{
          marginRight: 10,
          maxHeight: 100,
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {menu.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <MuiListItem key={value.id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  marginRight={2}
                >
                  <Box
                  display="flex"
                  alignItems="left"
                  justifyContent="left"
                  gap={2}
                  >
                    <ListItemText id={labelId} primary={value.title} />
                    <ListItemText id={labelId} primary={value.description} />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(value.id)}
                    >
                      -
                    </IconButton>
                  </Box>
                  <Box>
                    <CircularProgress
                      variant="determinate"
                      color="error"
                      value={
                        value.left.length +
                          value.middle.length +
                          value.right.length >
                        0
                          ? (value.left.length /
                              (value.left.length +
                                value.middle.length +
                                value.right.length)) *
                            100
                          : 0
                      }
                    ></CircularProgress>
                    <CircularProgress
                      variant="determinate"
                      color="warning"
                      value={
                        value.left.length +
                          value.middle.length +
                          value.right.length >
                        0
                          ? (value.middle.length /
                              (value.left.length +
                                value.middle.length +
                                value.right.length)) *
                            100
                          : 0
                      }
                    ></CircularProgress>
                    <CircularProgress
                      variant="determinate"
                      color="success"
                      value={
                        value.left.length +
                          value.middle.length +
                          value.right.length >
                        0
                          ? (value.right.length /
                              (value.left.length +
                                value.middle.length +
                                value.right.length)) *
                            100
                          : 0
                      }
                    ></CircularProgress>
                  </Box>
                </Box>
              </ListItemButton>
            </MuiListItem>
          );
        })}
        <Button variant="outlined" onClick={handleClickOpen}>
          Dodaj nowy
        </Button>
      </MultiList>
      {selectedMenu && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginRight={2}
        >
          <Typography
            variant="h2"
            component="h2"
            display="flex"
            justifyContent="center"
          >
            {title}
          </Typography>
          <Typography
            variant="h3"
            component="h4"
            display="flex"
            justifyContent="center"
            sx={{ marginBottom: 5 }}
          >
            {description}
          </Typography>
          <List
            left={left}
            middle={middle}
            right={right}
            setLeft={setLeft}
            setMiddle={setMiddle}
            setRight={setRight}
          />
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const title = formData.get("title") as string;
            const description = formData.get("newDescription") as string;

            addNewList(title, description);

            event.currentTarget.reset();
            handleClose();
          },
        }}
      >
        <DialogTitle>Nowa lista To Do</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Tytuł"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="newDescription"
            name="newDescription"
            label="Description"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Dodaj</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;

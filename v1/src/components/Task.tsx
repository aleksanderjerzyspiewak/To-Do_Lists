import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { ListItem } from './types'; 

interface TaskProps {
  left: ListItem[];
  middle: ListItem[];
  right: ListItem[];
  setLeft: React.Dispatch<React.SetStateAction<ListItem[]>>;
  setMiddle: React.Dispatch<React.SetStateAction<ListItem[]>>;
  setRight: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

function Task({ left, middle, right, setLeft, setMiddle, setRight }: TaskProps) {
  const [checked, setChecked] = React.useState<number[]>([]);

  const leftChecked = intersection(checked, left);
  const middleChecked = intersection(checked, middle);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: ListItem) => () => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(value.id);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};

function not(a: readonly number[], b: readonly ListItem[]): number[] {
  return a.filter(aId => !b.some(bItem => bItem.id === aId));
}

function intersection(a: readonly number[], b: readonly ListItem[]): ListItem[] {
  return b.filter(bItem => a.includes(bItem.id));
}

  const handleCheckedMiddle = () => {
    setMiddle(middle.concat(leftChecked));
    setLeft(prevLeft => prevLeft.filter(item => !checked.includes(item.id)));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(middleChecked));
    setMiddle(prevMiddle => prevMiddle.filter(item => !checked.includes(item.id)));
    setChecked(not(checked, middleChecked));
  };

  const handleCheckedRight = () => {
    setRight(right.concat(middleChecked));
    setMiddle(prevMiddle => prevMiddle.filter(item => !checked.includes(item.id)));
    setChecked(not(checked, middleChecked));
  };

  const handleCheckedMiddle2 = () => {
    setMiddle(middle.concat(rightChecked));
    setRight(prevRight => prevRight.filter(item => !checked.includes(item.id)));
    setChecked(not(checked, rightChecked));
  };

const handleDelete = (value: ListItem, listName: string) => {
  if(listName === 'To Do') {
    setLeft(prev => prev.filter(item => item.id !== value.id));
} else if(listName === 'In Progress') {
    setMiddle(prev => prev.filter(item => item.id !== value.id));
} else if(listName === 'Done') {
    setRight(prev => prev.filter(item => item.id !== value.id));
}
setChecked(prev => prev.filter(id => id !== value.id));
};

  const customList = (items: readonly ListItem[], title: string) => (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        display="flex"
        justifyContent="center"
      >
        {title}
      </Typography>
    <Paper sx={{ width: 350, height: 380, overflow: "auto" }}>
      
      <List dense component="div" role="list">
      {items.map((item: ListItem) => {
        const labelId = `transfer-list-item-${item.id}-label`;

          return (
            <ListItemButton
            key={item.id}
              role="listitem"
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.title} secondary={item.description} />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item, title)}>
              -
            </IconButton>
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
    </Box>
  );
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left, "To Do")}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedMiddle}
            disabled={leftChecked.length === 0}
            aria-label="move selected middle"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={middleChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(middle, "In Progress")}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={middleChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedMiddle2}
            disabled={rightChecked.length === 0}
            aria-label="move selected middle3"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, "Done")}</Grid>
    </Grid>
  );
}

export default Task;

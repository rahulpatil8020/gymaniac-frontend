import {
  Stack,
  Typography,
  useTheme,
  Divider,
  Checkbox,
  Box,
  IconButton,
  Alert,
  Snackbar,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import InputAndIcon from "components/InputAndIcon";
const GoalsWidget = () => {
  const theme = useTheme();

  const [goals, setGoals] = useState([
    { id: 1, title: "New Goal 1", completed: false },
    { id: 2, title: "New Goal 2", completed: false },
    { id: 3, title: "New Goal 3", completed: true },
  ]);
  const [goal, setGoal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [goalAlreadyExists, setGoalAlreadyExists] = useState(false);

  const neutralLight = theme.palette.neutral.light;
  const handleCreateGoal = () => {
    let temp = true;
    if (!goal) return;
    // eslint-disable-next-line array-callback-return
    goals.map((item) => {
      if (
        compareStringsIgnoreExtra(item?.title, goal?.title) &&
        !item.completed
      ) {
        setGoal(null);
        setGoalAlreadyExists(true);
        temp = false;
      }
    });

    if (temp) {
      const newGoal = { ...goal, completed: false, id: goals.length + 1 };
      setGoals((prev) => [...prev, newGoal]);
      setGoal(null);
    }
  };

  const compareStringsIgnoreExtra = (str1, str2) => {
    const cleanStr1 = str1.replace(/[^\w\s]/g, "").toLowerCase();
    const cleanStr2 = str2.replace(/[^\w\s]/g, "").toLowerCase();
    return cleanStr1 === cleanStr2;
  };

  const handleDeleteGoal = (ele) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== ele.id));
  };

  const handleEditing = (goal) => {
    setIsEditing(true);
    setGoal(goal);
  };

  const handleCancleEditing = () => {
    setIsEditing(false);
    setGoal(null);
  };

  const handleEditGoal = () => {
    let temp = true;
    if (!goal) return;
    // eslint-disable-next-line array-callback-return
    goals.map((item) => {
      if (
        compareStringsIgnoreExtra(item?.title, goal?.title) &&
        !item.completed
      ) {
        // setGoal(null);
        setGoalAlreadyExists(true);
        temp = false;
      }
    });
    if (temp) {
      setGoals((prev) =>
        prev.map((item) => {
          if (item.id === goal.id) {
            item = { ...item, title: goal.title };
            return item;
          }
          return item;
        })
      );
      setIsEditing(false);
      setGoal(null);
    }
    return;
  };

  const handleGoalComplete = (ele) => {
    setGoals((prev) =>
      prev.map((item) => {
        if (item.id === ele.id) {
          item = { ...item, completed: true };
          return item;
        }
        return item;
      })
    );
  };

  const handleGoalChange = (e) => {
    setGoal({ ...goal, title: e.target.value });
  };

  const createSnackbar = () => (
    <Snackbar
      onClose={() => {
        setGoalAlreadyExists(false);
      }}
      open={goalAlreadyExists}
      autoHideDuration={3000}
    >
      <Alert severity="warning" sx={{ width: "100%" }}>
        This Goal Already Exists
      </Alert>
    </Snackbar>
  );

  return (
    <>
      {createSnackbar()}
      <WidgetWrapper>
        <Stack
          divider={<Divider orientation="horizontal" />}
          direction={"column"}
          spacing={1}
        >
          <Typography alignSelf={"center"} variant="h6">
            Workout Goals
          </Typography>
          <Stack>
            {goals.map((ele, i) => {
              if (ele.completed) return null;
              return (
                <FlexBetween key={i}>
                  <Stack direction={"row"} alignItems="center">
                    <Checkbox onChange={() => handleGoalComplete(ele)} />
                    <Typography width={125} noWrap textOverflow={"ellipsis"}>
                      {ele.title}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    {isEditing && ele.id === goal.id ? (
                      <IconButton onClick={handleCancleEditing}>
                        <CloseIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEditing(ele)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDeleteGoal(ele)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </FlexBetween>
              );
            })}
          </Stack>
        </Stack>
        <Box marginTop={2}>
          <InputAndIcon
            placeholder={"Create a Goal"}
            iconButton={
              <>
                {isEditing ? (
                  <IconButton onClick={handleEditGoal}>
                    <DoneIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleCreateGoal}>
                    <AddIcon />
                  </IconButton>
                )}
              </>
            }
            value={goal ? goal.title : ""}
            fullWidth
            backgroundColor={neutralLight}
            onChange={handleGoalChange}
          />
        </Box>
        <Button sx={{ marginTop: 1 }}>View All</Button>
      </WidgetWrapper>
    </>
  );
};

export default GoalsWidget;

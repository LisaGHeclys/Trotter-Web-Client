import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Grid,
  Box
} from "@mui/material";
import {
  ExpandMore,
  Close,
  Delete,
  WineBar,
  Hotel,
  LocalGroceryStore,
  Attractions,
  Restaurant,
  DirectionsBus,
  LocalGasStation,
  FilterVintage
} from "@mui/icons-material";

interface Expense {
  id: string;
  category: string;
  amount: string;
  commentary: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Food: <Restaurant />,
  Transport: <DirectionsBus />,
  Activities: <Attractions />,
  Drinks: <WineBar />,
  Lodging: <Hotel />,
  Groceries: <LocalGroceryStore />,
  Gas: <LocalGasStation />,
  Others: <FilterVintage />
};

const BudgetComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("0");
  const [commentary, setCommentary] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory("");
    setAmount("0");
    setCommentary("");
  };

  const handleSaveExpense = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      category: selectedCategory,
      amount,
      commentary
    };

    setExpenses([...expenses, newExpense]);
    handleModalClose();
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const totalBudget = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  return (
    <>
      <Card style={{ marginBottom: "16px", maxWidth: 350 }}>
        <CardContent>
          <Typography variant="h5">Total Budget: {totalBudget}€</Typography>
          <Button variant="contained" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>
          Add Expense
          <Box
            component="span"
            sx={{ position: "absolute", top: 0, right: 0, m: 1 }}
          >
            <IconButton
              color="inherit"
              onClick={handleModalClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <p>Select a category</p>
          <Grid container spacing={2}>
            {Object.entries(categoryIcons).map(([key, icon]) => (
              <Grid item key={key}>
                <IconButton
                  color={selectedCategory === key ? "primary" : "default"}
                  onClick={() => setSelectedCategory(key)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "5px",
                    overflow: "hidden",
                    transition: "background-color 0.3s",
                    margin: "8px"
                  }}
                >
                  <div style={{ borderRadius: "5px", overflow: "hidden" }}>
                    {icon}
                  </div>
                  <Typography variant="caption">{key}</Typography>
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <TextField
            fullWidth
            label="Amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(".", ","))}
            disabled={!selectedCategory}
            style={{ marginTop: "16px" }}
          />
          <TextField
            fullWidth
            label="Commentary"
            value={commentary}
            onChange={(e) => setCommentary(e.target.value)}
            disabled={!selectedCategory}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions style={{ marginTop: "16px" }}>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSaveExpense} disabled={!selectedCategory}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Accordion
        style={{
          marginBottom: "16px",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none"
        }}
        square={true}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Expenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {expenses.map((expense) => (
              <ListItem key={expense.id}>
                <ListItemText
                  primary={`${expense.category}: $${expense.amount}`}
                />
                <IconButton
                  onClick={() => handleDeleteExpense(expense.id)}
                  color="inherit"
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BudgetComponent;

import React, { useState, FC } from "react";
import {
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
  Receipt,
  Flight,
  ShoppingBag
} from "@mui/icons-material";
import styled from "styled-components";
import { COLORS, FONT } from "../../UI/Colors";
import { Divider, Table } from "antd";
import { format } from "date-fns";

interface Expense {
  id: number;
  category: string;
  amount: string;
  commentary: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Flights: <Flight />,
  Food: <Restaurant />,
  Transport: <DirectionsBus />,
  Activities: <Attractions />,
  Drinks: <WineBar />,
  Lodging: <Hotel />,
  Shopping: <ShoppingBag />,
  Groceries: <LocalGroceryStore />,
  Gas: <LocalGasStation />,
  Others: <Receipt />
};

const BudgetComponent: FC = () => {
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
      id: Date.now(),
      category: selectedCategory,
      amount,
      commentary
    };

    setExpenses([...expenses, newExpense]);
    handleModalClose();
  };

  const handleDeleteExpense = (id: number) => {
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
      <Card
        style={{
          marginTop: "20px",
          marginBottom: "16px",
          marginLeft: "20px",
          width: "fit-content",
          borderRadius: "5px",
          backgroundColor: "#DDDDDD",
          padding: "8px 16px"
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px"
          }}
        >
          <Typography variant="h5" style={{}}>
            {totalBudget.toFixed(2)}€
          </Typography>
          <div
            style={{
              width: "1px",
              height: "52px",
              marginLeft: "16px",
              marginRight: "16px",
              backgroundColor: "#BBBBBB"
            }}
          />
          <AddExpenselButton onClick={handleAddExpense}>
            Add Expense
          </AddExpenselButton>
        </CardContent>
      </Card>

      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        PaperProps={{ sx: { borderRadius: "10px" } }}
      >
        <DialogTitle>
          Add your expenses on this travel !
          <Divider style={{ margin: "10px 0" }} />
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
        <DialogContent style={{ overflow: "hidden" }}>
          <p>Select a category</p>
          <Grid
            container
            spacing={2}
            style={{ marginLeft: "0", marginBottom: "16px" }}
          >
            {Object.entries(categoryIcons).map(([key, icon]) => (
              <Grid item key={key}>
                <CategoryButton
                  color={selectedCategory === key ? "primary" : "default"}
                  onClick={() => setSelectedCategory(key)}
                >
                  <div style={{ borderRadius: "5px", overflow: "hidden" }}>
                    {icon}
                  </div>
                  <Typography variant="caption">{key}</Typography>
                </CategoryButton>
              </Grid>
            ))}
          </Grid>
          <TextField
            fullWidth
            label="Amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(",", "."))}
            disabled={!selectedCategory}
            style={{ marginTop: "16px", borderRadius: "5px" }}
          />
          <TextField
            fullWidth
            label="Add description"
            value={commentary}
            onChange={(e) => setCommentary(e.target.value)}
            disabled={!selectedCategory}
            style={{ marginTop: "16px", borderRadius: "5px" }}
          />
        </DialogContent>
        <DialogActions style={{ marginTop: "16px" }}>
          <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
          <SaveExpenseButton
            onClick={handleSaveExpense}
            disabled={!selectedCategory}
          >
            Save
          </SaveExpenseButton>
        </DialogActions>
      </Dialog>

      <Accordion
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          width: "50%",
          margin: "0",
          marginLeft: "20px !important"
        }}
        square={true}
        defaultExpanded={true}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Expenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {expenses.length === 0 ? (
            <Typography style={{ color: "gray" }}>
              You haven&apos;t added any expenses.
            </Typography>
          ) : (
            <Table
              dataSource={expenses}
              columns={[
                {
                  title: "Category",
                  dataIndex: "category",
                  key: "category",
                  sorter: (a, b) => a.category.localeCompare(b.category)
                },
                {
                  title: "Description",
                  dataIndex: "commentary",
                  key: "commentary"
                },
                {
                  title: "Amount (€)",
                  dataIndex: "amount",
                  key: "amount",
                  sorter: (a, b) => (a.amount < b.amount ? -1 : 1)
                },
                {
                  title: "Created At",
                  dataIndex: "id",
                  key: "id",
                  sorter: (a, b) => (a.id < b.id ? -1 : 1),
                  render: function (time, record) {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}
                      >
                        <span>
                          {format(new Date(time), "HH:mm - dd/LL/yyyy")}
                        </span>
                        <IconButton
                          onClick={() => handleDeleteExpense(record.id)}
                          color="inherit"
                          aria-label="delete"
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    );
                  }
                }
              ]}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const CategoryButton = styled(IconButton)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  height: 70px;
  border-radius: 5px !important;
  background-color: #eeeeee !important;

  &:hover {
    background-color: lightgray !important;
  }
`;

const AddExpenselButton = styled.button`
  background-color: ${COLORS.blue};
  color: ${COLORS.bg};

  padding: 12px 20px;
  border-radius: 5px;
  font-family: ${FONT};
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background-color: ${COLORS.blueGreen};
    transition: all ease-in-out 0.2s;
  }
`;

const SaveExpenseButton = styled.button`
  background-color: ${COLORS.blue};
  color: ${COLORS.bg};
  padding 10px 20px;
  border-radius: 5px;
  font-family: ${FONT};
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;

  &:disabled {
    background-color: lightgray;
  }

  &:hover:enabled {
    background-color: ${COLORS.blueGreen};
    transition: all ease-in-out 0.2s;
  }

  &:hover:disabled {
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: ${COLORS.text}
  padding: 10px;
  font-family: ${FONT};
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    color: ${COLORS.blue};
  }
`;

export default BudgetComponent;

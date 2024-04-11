import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { columns } from "./GridColumns";
import { pageTitles } from "../../../Constant/Constant";
import "./GridInventory.css";

interface FlightData {
  id: number;
  airline: string;
  sector: string;
  airlineNo: string;
  returnAirlineNo: string;
  departureDate: string;
  returnDate: string;
  departureTime: string;
  arrivalTime: string;
  quantity: number;
  available: number;
  sold: number;
  pnr: string;
  purchase: string;
  price: number;
  infant: number;
}

const sectors = ["Domestic", "International"];

const airlines = ["Air India", "IndiGo", "SpiceJet", "GoAir"];

const initialFilters = {
  startDate: null,
  endDate: null,
  sector: "",
  airline: "",
  flightNumber: "",
  pnrNumber: "",
  showSoldOut: false,
  showHoldSeats: false,
};

const rows: FlightData[] = [
  {
    id: 1,
    airline: "Air India",
    sector: "Domestic",
    airlineNo: "AI123",
    returnAirlineNo: "AI456",
    departureDate: "2024-04-01",
    returnDate: "2024-04-10",
    departureTime: "10:00",
    arrivalTime: "12:00",
    quantity: 100,
    available: 50,
    sold: 50,
    pnr: "PNR123",
    purchase: "Online",
    price: 1000,
    infant: 10,
  },
  // Add more rows as needed
];

const GridInventory = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [editRow, setEditRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<FlightData | null>(null);

  useEffect(() => {
    document.title = pageTitles.adminInventory;
  }, []);

  const handleEdit = (id: number) => {
    const selectedRow = rows.find((row) => row.id === id);
    setEditRow(id);
    selectedRow && setEditData(selectedRow);
  };

  const handleSave = () => {
    // Save edited row data
    setEditRow(null);
    setEditData(null);
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleFilterChange = (e: any) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? e.target.checked : value;
    setFilters({ ...filters, [name]: val });
  };

  const onDateChange = (date: Dayjs | null, field: string) => {
    setFilters((prevState: any) => ({
      ...prevState,
      [field]: date,
    }));
  };

  const filteredRows = rows.filter((row) => {
    // Implement filtering logic based on filters state
    return true;
  });

  console.log("filters", filters);

  return (
    <Box>
      <Box className="filter-bar">
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date *"
              value={filters.startDate}
              onChange={(newValue) => onDateChange(newValue, "startDate")}
              format="DD/MM/YYYY"
              views={["day", "month", "year"]}
              slotProps={{ textField: { size: "small" } }}
              className="margin-right-8"
              sx={{ maxWidth: 160, marginTop: 2 }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date *"
              value={filters.endDate}
              onChange={(newValue) => onDateChange(newValue, "endDate")}
              format="DD/MM/YYYY"
              views={["day", "month", "year"]}
              slotProps={{ textField: { size: "small" } }}
              className="margin-right-8"
              sx={{ maxWidth: 160, marginTop: 2 }}
            />
          </LocalizationProvider>
          <TextField
            select
            label="Sector"
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
            size="small"
            className="margin-right-8"
            sx={{ minWidth: 170, marginTop: 2 }}
          >
            {sectors.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Airline"
            name="airline"
            value={filters.airline}
            onChange={handleFilterChange}
            size="small"
            className="margin-right-8"
            sx={{ minWidth: 170, marginTop: 2 }}
          >
            {airlines.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            label="Flight Number"
            name="flightNumber"
            value={filters.flightNumber}
            onChange={handleFilterChange}
            size="small"
            className="margin-right-8"
            sx={{ marginTop: 2 }}
          />
          <TextField
            type="text"
            label="PNR Number"
            name="pnrNumber"
            value={filters.pnrNumber}
            onChange={handleFilterChange}
            size="small"
            className="margin-right-8"
            sx={{ marginTop: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.showSoldOut}
                onChange={handleFilterChange}
                name="showSoldOut"
                size="small"
              />
            }
            label="Show Sold Out Dates"
            className="margin-right-8"
            sx={{ marginTop: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.showHoldSeats}
                onChange={handleFilterChange}
                name="showHoldSeats"
                size="small"
              />
            }
            label="Show Hold Seats"
            className="margin-right-8"
            sx={{ marginTop: 2 }}
          />
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ marginTop: 2 }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table className="table" aria-label="flight table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ background: "#1976d2", color: "#fff" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.airline}</TableCell>
                <TableCell>{row.sector}</TableCell>
                <TableCell>{row.airlineNo}</TableCell>
                <TableCell>{row.returnAirlineNo}</TableCell>
                <TableCell>{row.departureDate}</TableCell>
                <TableCell>{row.returnDate}</TableCell>
                <TableCell>{row.departureTime}</TableCell>
                <TableCell>{row.arrivalTime}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.available}</TableCell>
                <TableCell>{row.sold}</TableCell>
                <TableCell>{row.pnr}</TableCell>
                <TableCell>{row.purchase}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.infant}</TableCell>
                <TableCell>
                  {editRow === row.id ? (
                    <IconButton aria-label="save" onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editRow && (
        <Drawer
          anchor="right"
          open={editRow !== null}
          //onClose={() => setEditRow(null)}
          ModalProps={{
            BackdropProps: {
              invisible: true, // This prevents closing when clicking outside
            },
          }}
        >
          <Box className="drawer" sx={{ marginTop: 9 }}>
            {editData && (
              <>
                <TextField
                  label="Airline"
                  value={editData.airline}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Sector"
                  value={editData.sector}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Airline No."
                  value={editData.airlineNo}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Return Airline No."
                  value={editData.returnAirlineNo}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Departure Date"
                  value={editData.departureDate}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Return Date"
                  value={editData.returnDate}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Departure Time"
                  value={editData.departureTime}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Arrival Time"
                  value={editData.arrivalTime}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Quantity"
                  value={editData.quantity}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Available"
                  value={editData.available}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Sold"
                  value={editData.sold}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="PNR"
                  value={editData.pnr}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Purchase"
                  value={editData.purchase}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Price"
                  value={editData.price}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Infant"
                  value={editData.infant}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: 2 }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Button onClick={() => {}} variant="contained">
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditRow(null)}
                    variant="outlined"
                    sx={{ marginLeft: 1 }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default GridInventory;

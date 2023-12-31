import React, { useContext } from "react";
import SectionTitle from "../../../components/SectionTitle";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import styled from "styled-components";
import useTitle from "../../../Hooks/useTitle";
import usePayments from "../../../Hooks/usePayments";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: "poppins",
    fontSize: 16,
    fontWeight: "semibold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "poppins",
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: "#303030",
  },
  "&:nth-of-type(even)": {
    // backgroundColor: "#1e1e1e",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EnrolledClasses = () => {
  useTitle("Enrolled Classes");
  const paymentsData = usePayments();

  return (
    <div>
      <SectionTitle title="My Enrolled Classes"></SectionTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Classes Names</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentsData?.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>
                  {new Date(item.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(item.date).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell>{item.quantity}</StyledTableCell>
                <StyledTableCell>${item.price}</StyledTableCell>
                <StyledTableCell>
                  <p>{item.selectedClassName}</p>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EnrolledClasses;

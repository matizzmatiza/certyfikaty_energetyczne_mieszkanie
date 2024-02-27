import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const TableComponent = ({ rows }) => {
  // Obliczenie sumy wartości do zapłaty
  const totalAmount = rows.reduce((acc, row) => acc + row.amount, 0);

  // Użycie useEffect do zapisania totalAmount w localStorage
  useEffect(() => {
    // Zapisanie totalAmount w localStorage
    localStorage.setItem('totalAmount', totalAmount);
  }, [totalAmount]); // Zależność od totalAmount gwarantuje, że kod wewnątrz useEffect wykona się za każdym razem, gdy totalAmount się zmieni

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '50%' }}>Usługa</TableCell>
            <TableCell style={{ width: '50%' }} align="right">Kwota</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.service}</TableCell>
              <TableCell align="right">{`${row.amount} zł`}</TableCell>
            </TableRow>
          ))}
          {/* Wiersz z sumą wartości */}
          <TableRow>
            <TableCell colSpan={1}><Typography variant="h6">Do zapłaty</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6">{`${totalAmount} zł`}</Typography></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

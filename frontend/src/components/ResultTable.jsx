import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';

export default function resultTable (props) {
  const scores = Object.keys(props.uScores).map((key) => [key, props.uScores[key]]);
  return (
    <div>
      <h1> Results for {props.sessionId}! </h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Podium </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> Points </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {scores.sort((a, b) => b[1] - a[1]).map((score, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{score[0]}</TableCell>
              <TableCell>{score[1]}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Bar data={props.barData} />
    </div>
  )
}

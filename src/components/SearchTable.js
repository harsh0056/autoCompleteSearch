import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';



function compare( a, b ) {
  if ( a.id < b.id ){
    return 1;
  }
  if ( a.id > b.id ){
    return -1;
  }
  return 0;
}




export default function BasicTable(props) {
  const [rows,setRows]=useState(props.options);
  
  const handleChange=(query)=>{
    
    let result =props.options.filter((option)=>{
        return option.login.toLowerCase().includes(query.toLowerCase());
    });
    result.sort(compare);
    console.log("this is result ",result);
    
    return result;
}
  useEffect(()=>{
      if(props.query){
          setRows(handleChange(props.query));
      }
  },[props.query])
  console.log("This is Rows in Table component ",rows);
  
  return (
    <div style={{padding:100,margin:100,marginTop:0}}> 
    <Grid container>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell >Name</TableCell>
            <TableCell align="right">Followers</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <TableRow 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sortDirection='desc' component="th" scope="row">
                {row.login}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </div>
  );
}
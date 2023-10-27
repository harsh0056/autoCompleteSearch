import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';



function compare( a, b ) {
  if ( a.id < b.id ){
    return 1;
  }
  if ( a.id > b.id ){
    return -1;
  }
  return 0;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell=styled(TableCell)(({theme})=>({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  fontSize: 14,
  "&:hover":{
    background:'red'
  }
}))

const StyledTableHead=styled(TableHead)(({theme})=>({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
 
}))
const StyledTableBody=styled(TableHead)(({theme})=>({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
 
}))


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
        <StyledTableHead >
          <StyledTableRow >
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell align="right">Followers</StyledTableCell>
            
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody >
          {rows.map((row) => (
            <StyledTableRow 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell sortDirection='desc' component="th" scope="row">
                {row.login}
              </StyledTableCell>
              <StyledTableCell align="right">{row.id}</StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </Table>
    </TableContainer>
    </Grid>
    </div>
  );
}
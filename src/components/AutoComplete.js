import React, { useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import {  Grid, TextField,Typography } from '@mui/material';
import SearchTable from './SearchTable.js';

function AutoComplete() {

    const[options,setOptions]= useState([]);
    const [query,setQuery]=useState('');

    function compare( a, b ) {
        if ( a.id < b.id ){
          return 1;
        }
        if ( a.id > b.id ){
          return -1;
        }
        return 0;
      }

 


    useEffect(()=>{
        const URL= `https://api.github.com/users`;
        try {
            axios.get(URL)
            .then((data)=>{
                data.data.sort(compare);  // sorting data based in id because could not found number of followers in the Api Response 
                setOptions(data.data)}).catch((error)=>{
                    console.log("error while getting data from githib api axios erros",error);
                })
        } catch (error) {
            
        }
        
        

    },[query])


  return (
    <>
    <div style={{height:350,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <Grid>
        <Typography>This is Autocomplete search in React</Typography>
        </Grid>
        
    <Grid >
    
        <Autocomplete
      id="search"
      options={options}
    onInputChange={(e)=>{
        console.log("query string is ",e.target.value)
        setQuery(e.target.value)
    }}
      getOptionLabel={(option) => `${option.login}`}
      sx={{ width: 300 }}
      renderOption={(props,option)=>{
       return  <Box component='li' {...props} key={option.id}>
            {option.login}
            </Box>

      }}
      noOptionsText="no user found with this name"
      renderInput={(params) => (
        <TextField {...params}  fullWidth />
      )}
    />
    </Grid>
    
    </div>
    <div id='table'  style={{marginTop:''}}>
            {options.length>0 && <SearchTable options={options} query={query}/> }

    </div>
    </>
  )
}


export default AutoComplete


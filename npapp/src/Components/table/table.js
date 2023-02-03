import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import classes from "./table.module.css";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import { getPaginatedToilets, getToilets } from '../../Services/toiletService';
import BasicModal from '../BasicModal/modal';
import AddToiletForm from '../addToiletModal/addToilet';
import { getPaginatedFeedback } from '../../Services/feedbackService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, city, location) {
  return { name, city, location };
}

function createFeedbackData(name, time, gradeOverall, foulSmell, dirtyBowl, noPaper, noSoap, dirtyFloor, wetFloor, faultyEquipment, litterBin, noTissues, dirtyBasin){
  return {name, time, gradeOverall, foulSmell, dirtyBowl, noPaper, noSoap, dirtyFloor, wetFloor, faultyEquipment, litterBin, noTissues, dirtyBasin};
}

const rows = [
  [createData("Seshadri 2", "Europolis, Seshadri Tower", "Female"),
  createData('Bowels', "Europolis, The Collective", "Male"),
  createData('Eclair', "Europolis, Bell Street", "Female"),
  createData("Kitten and Rooster", "Marcuria, Azadi Square", "Male")],
  [createFeedbackData("Seshadri Tower", "21.03.2022. 15:30:33", "Good", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No"),
  createFeedbackData("WatiCorp", "21.03.2022. 15:30:33", "Average", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No"),
  createFeedbackData("Eclair", "21.03.2022. 15:30:33", "Bad", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No")
  ]
];

export default function CustomTable({dataType, filterInfoObj}) {
                        
    const dict = { "toilets": 0, "reports": 1, "summary": 2 };
    const ind = dict[dataType];

    const headersName = [["Establishment", "City", "Location"], //Toilet
                         ["Establishment", "Time", "Overall Rating", "Foul Smell", "Dirty Bowl", "No Paper", "No Soap", "Dirty Floor", "Wet Floor", "Faulty Equipment", "Litter Bin", "No Tissues", "Dirty Basin"],
                         ["Establishment", "Location", "Total Grades", "Good", "Average", "Bad"]                      
    ];
    
    const headersKeys = [["name", "city", "location"], //Toilet
                         ["name", "time", "gradeOverall", "foulSmell", "dirtyBowl", "noPaper", "noSoap", "dirtyFloor", "wetFloor", "faultyEquipment", "litterBin", "noTissues", "dirtyBasin"],
                         ["name", "location", "totalCnt", "goodCnt", "averageCnt", "badCnt"]];
    const idNames = ["toiletId", "feedbackId", "toiletId"];

    const [isOpen, setIsOpen] = React.useState(false);
    const [modal, setmodal] = React.useState([]);
    const handleOpenModal = () => {
    
      setmodal(addmodal);
      setIsOpen(!isOpen);
    };
    const addModals = [<AddToiletForm/>, "", ""];

    var headerName = headersName[ind];
    var headerKey = headersKeys[ind];
    var addmodal = addModals[ind];
    const idName = idNames[ind];
    var typeTimeout = 0;

    const [data, setData] = React.useState([]);
    const [headerKeys, setheaderKeys] = React.useState([]);

    //Pagination and searching.
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [actualLength, setActualLength] = React.useState(0);
    const [text, setText] = React.useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        console.log(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    React.useEffect(() => {

      const data = {
        reportType : ind,
        page: page,
        itemCount: rowsPerPage,
        searchTerm: text,
        id: filterInfoObj.toiletId,
        sed: filterInfoObj.sed,
        eed: filterInfoObj.eed
      }
      console.log(data);

      if(dataType === "toilets"){

        getPaginatedToilets(data).then(function (response){
            setData(response["data"].data);
            setActualLength(response["data"].actualCount);
            setheaderKeys(headersKeys[ind]);
        }).catch(function (error){
            setheaderKeys(headersKeys[ind]);
            setData(rows[ind]);
        });
      }else if(dataType === "reports"){

        getPaginatedFeedback(data).then(function (response){
          setData(response["data"].data);
          setActualLength(response["data"].actualCount);
          setheaderKeys(headersKeys[ind]);
        }).catch(function (error){
            setheaderKeys(headersKeys[ind]);
            setData(rows[ind]);
        });
      }else if(dataType === "summary"){

        getPaginatedFeedback(data).then(function (response){
          setData(response["data"].data);
          setActualLength(response["data"].actualCount);
          setheaderKeys(headersKeys[ind]);
        }).catch(function (error){
          setheaderKeys(headersKeys[ind]);
          setData(rows[ind]);
        });

      }else{
      
        setheaderKeys(headersKeys[ind]);
        setData(rows[ind]);
      }
    }, [text, page, rowsPerPage, isOpen]);

  const handleChange = (e) => {
    if(typeTimeout) clearTimeout(typeTimeout)
    typeTimeout = setTimeout(() => {
      setText(e.target.value);
    }, 1500);
    
  };

  return (
    <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }} className={classes.container}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <StyledTableRow>
              {headerName.map((header) => (
                  <StyledTableCell align="left">
                      {header}
                  </StyledTableCell>
              ))}
                  <StyledTableCell align="right" colSpan={2}>
                      <Button onClick={() => handleOpenModal()} style={ dataType === "toilets" ? { backgroundColor: "#11362a", color: "white", border: "2px solid lightblue", margin: "1px"} : {display: "none"}}>+ Add New</Button>
                      <TextField 
                      label="Search Name" size="small" style={{ float: 'right', margin: "1px" }} onChange={handleChange}
                      InputProps={{ style: {backgroundColor: "white"},
                        endAdornment: (
                          <InputAdornment>
                            <IconButton>
                              
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      />
                  </StyledTableCell>
            </StyledTableRow>
        </TableHead>
        <TableBody>
            {data.map((row) => (
              <StyledTableRow
                key={row[idName]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                { headerKey.map((key) => (
                  <StyledTableCell align="left">{
                    (typeof row[key]) === typeof true ? (row[key] ? "Yes":"No") : row[key] 
                    }</StyledTableCell>
                ))}
                <StyledTableCell />
              </StyledTableRow>
            ))}
        </TableBody>

      </Table>

      <BasicModal onCloseModal={handleOpenModal} isDialogOpened={isOpen} handleCloseDialog={() => setIsOpen(false)} content={modal} />

    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={actualLength}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
    </div>
  );
}
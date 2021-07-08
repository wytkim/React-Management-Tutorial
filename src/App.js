//import logo from './logo.svg';
import './App.css';

import {useState, useEffect, useCallback, useRef} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress} from '@material-ui/core';
import {AppBar, Toolbar, IconButton, Typography, InputBase} from '@material-ui/core';
//import Toolbar from '@material-ui/core/Toolbar';
//import  from '@material-ui/core/IconButton';
//import  from '@material-ui/core/Typography';
//import  from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
//import {} from '@material-ui/colors';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

//import {withStyles, makeStyles} from '@material-ui/core/styles'
//import {makeStyles} from '@material-ui/core/styles'
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

const styles = theme=>({
  root:{
    width: '100%',
    minWidth: 1080,
  },
  paper: {
    marginLeft: 18, 
    marginRight: 18,
  },
  table: {
    minWidth: 1080
  },
  tableHead: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  menu: {
    marginTop: 15, 
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
});
const useStyles = makeStyles(styles);

const callApi = async ()=>{
  const response = await fetch('/api/customers');
  const body = await response.json();

  await new Promise((resolve)=>{
    setTimeout(() => {
      resolve('ok');
    }, 1000);
  });

  return body;
};
const headNames = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];
// 필터 처리.
const filterdCustomers = (customers, searchText, refresh)=>{
  const filteredList = customers.filter(c=>c.name.includes(searchText)||(c.job && c.job.includes(searchText)));
  return filteredList.map(c=>{
    return <Customer key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
                stateRefresh={refresh}
              />;
  });
};
function App() {
  // {classes}
  const [customers, setCustomers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();

  // refresh 함수.
  const refresh = useCallback(()=>{
    setCustomers([]);
    setProgress(0);
    setSearchText("");

    timer.current = setInterval(() => {
      console.log('timer check');
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 50);
    callApi()
    .then(res=>{
      console.log('customer data list:', res);
      clearInterval(timer.current); timer.current=null;
      setCustomers(res); 
      //setProgress(0);
    })
    .catch(err=>{console.error(err); clearInterval(timer.current); timer.current=null;});

  }, []);

  useEffect(()=>{
    refresh();
    return ()=>{clearInterval(timer.current);};
  },[refresh]);
  
  const timer = useRef(null);

  const handleTextChange = useCallback((e)=>{
    e.preventDefault();
    const name = e.target.name;
    if(name==='searchText'){
      setSearchText(e.target.value);
    }
  },[setSearchText]);

  return (
    <div  className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="searchText"
              value={searchText}
              onChange={handleTextChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={refresh} />
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headNames.map((c,i)=>(<TableCell key={i} className={classes.tableHead}>{c}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(customers && customers.length > 0) ? filterdCustomers(customers, searchText, refresh):
              <TableRow><TableCell colSpan="7" align="center">
                {timer.current ? <CircularProgress className={classes.progress} variant="determinate" value={progress} /> : "데이터가 존재하지 않습니다."}
              </TableCell></TableRow>}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

//export default withStyles(styles)(App);
export default App;

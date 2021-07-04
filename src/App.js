import logo from './logo.svg';
import './App.css';

import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import Customer from './components/Customer';

const styles = theme=>({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit*3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
});

const customer = {
  id: "1",
  image: "https://placeimg.com/64/64/any",
  name: "홍길동",
  birthday: "760419",
  gender: "남성",
  job: "대학생"
};

const customers = [
  {
    id: "1",
    image: "https://placeimg.com/64/64/1",
    name: "홍길동",
    birthday: "760419",
    gender: "남성",
    job: "대학생"
  } ,
  {
    id: "2",
    image: "https://placeimg.com/64/64/2",
    name: "김길동",
    birthday: "860419",
    gender: "남성",
    job: "개발자"
  },
  {
    id: "3",
    image: "https://placeimg.com/64/64/3",
    name: "이길동",
    birthday: "860519",
    gender: "여성",
    job: "공무원"
  }
];

function App({classes}) {
  return (
    <Paper className={classes.root}>
      {/* <img src={logo} lat="logo"/>
      <h2>Let's develop management system!</h2> */}
      {/* <Customer 
        id={customer.id}
        image={customer.image}
        name={customer.name}
        birthday={customer.birthday}
        gender={customer.gender}
        job={customer.job}
      /> */}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(c=>{
            return <Customer id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}/>
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);

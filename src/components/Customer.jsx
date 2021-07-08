import React, { Component } from 'react';
import {TableRow, TableCell} from '@material-ui/core';
import CustomerDelete from './CustomerDelete';

class Customer extends Component{
    render(){
        const {id, image, name, birthday, gender, job, stateRefresh} = this.props;
        return (
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell><img src={image} alt="profile" style={{width: 64, height: 64}} /></TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{birthday}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{job}</TableCell>
                <TableCell><CustomerDelete id={id} stateRefresh={stateRefresh}/></TableCell>
            </TableRow>
        );
    }
}

// class CustomerProfile extends Component{
//     render(){
//         const {id, name, image} = this.props;
//         return (
//             <>
//                 <img src={image} alt="profile" />
//                 <h2>{name}({id})</h2>
//             </>
//         );
//     }
// }

// class CustomerInfo extends Component{
//     render(){
//         const {birthday, gender, job} = this.props;
//         return (
//             <>
//                 <p>{birthday}</p>
//                 <p>{gender}</p>
//                 <p>{job}</p>
//             </>
//         );
//     }
// }

export default Customer;
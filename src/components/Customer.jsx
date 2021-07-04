import React, { Component } from 'react';

class Customer extends Component{

    render(){
        const {id, image, name, birthday, gender, job} = this.props;
        return (
            <div>
                <CustomerProfile 
                    id={id}
                    image={image}
                    name={name}
                />
                <CustomerInfo 
                    birthday={birthday}
                    gender={gender}
                    job={job}
                />
            </div>
        );
    }
}

class CustomerProfile extends Component{
    render(){
        const {id, name, image} = this.props;
        return (
            <>
                <img src={image} alt="profile" />
                <h2>{name}({id})</h2>
            </>
        );
    }
}

class CustomerInfo extends Component{
    render(){
        const {birthday, gender, job} = this.props;
        return (
            <>
                <p>{birthday}</p>
                <p>{gender}</p>
                <p>{job}</p>
            </>
        );
    }
}

export default Customer;
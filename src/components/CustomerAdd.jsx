import React, { Component } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    hidden: { display: 'none' }
});
//const useStyles = makeStyles(styles);

class CustomerAdd extends Component {
    state = {
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false,
    };

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value,
        });
    };

    handleTextChange = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };

    /** 고객 추가. */
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append("imageFile", this.state.file);
        formData.append("name", this.state.userName);
        formData.append("birthday", this.state.birthday);
        formData.append("gender", this.state.gender);
        formData.append("job", this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        return axios.post(url, formData, config);
    };
    handleFormSubmit = (e) => {
        //e.preventDefault();

        this.addCustomer()
            .then(response => {
                console.log('결과', response);
                this.setState({
                    file: null,
                    userName: '',
                    birthday: '',
                    gender: '',
                    job: '',
                    fileName: '',
                    open: false,
                });

                this.props.stateRefresh(); // 전체 재로딩.
            })
            .catch(err => {
                console.log('add customer error', err);
                alert('오류가 발생했습니다.');
            });
    };

    handleClickOpen=()=>{
        this.setState({open: true});
    };
    handleClose=()=>{
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false,
        });
    };
    render() {
        const {classes} = this.props;
        //const classes = useStyles();
        return (
            <>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>고객 추가하기</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} type="file" id="raised-button-file" accept="image/*" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {!this.state.fileName?"프로필 이미지 선택":this.state.fileName}
                            </Button>
                        </label><br />
                        <TextField label="이름" name="userName" value={this.state.userName} onChange={this.handleTextChange} /><br />
                        <TextField label="생년월일" name="birthday" value={this.state.birthday} onChange={this.handleTextChange} /><br />
                        <TextField label="성별" name="gender" value={this.state.gender} onChange={this.handleTextChange} /><br />
                        <TextField label="직업" name="job" value={this.state.job} onChange={this.handleTextChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}> 추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose }> 닫기</Button>
                    </DialogActions>
                </Dialog>
            </>

            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>고객추가</h1>
            //     <h2>프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /></h2>
            //     <h2>이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleTextChange}/></h2>
            //     <h2>생년월일:<input type="text" name="birthday" value={this.state.birthday} onChange={this.handleTextChange}/></h2>
            //     <h2>성별:<input type="text" name="gender" value={this.state.gender} onChange={this.handleTextChange}/></h2>
            //     <h2>직업:<input type="text" name="job" value={this.state.job} onChange={this.handleTextChange}/></h2>
            //     <button type="submit">추가하기</button>
            // </form>
        );
    }
}

export default withStyles(styles)(CustomerAdd);
//export default CustomerAdd;
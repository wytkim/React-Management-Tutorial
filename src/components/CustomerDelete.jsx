import { Component, memo, useCallback, useState } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from '@material-ui/core';
//import { } from '@material-ui/core'

class CustomerDelete extends Component {
    state = {
        open: false,
        alertTitle: null,
        alertMessage: null,
        alertHandleClick: null,
        
    };

    deleteCustomer = (e) => {
        //e.preventDefault();
        const url = '/api/customers/' + this.props.id;
        fetch(url, { method: 'POST' })
            .then(res => {
                console.log('delete customer success:', res);
                this.setState({
                    open: false,
                    alertTitle: '고객 삭제',
                    alertMessage: '고객이 삭제되었습니다.',
                    alertHandleClick: ()=>{
                        this.props.stateRefresh();
                    },
                });
            })
            .catch(err => {
                console.log('delete customer error: ', err);
                //alert('customer delete error!');
                this.setState({
                    open: false,
                    alertTitle: '고객 삭제 실패',
                    alertMessage: '고객정보를 삭제하지 못했습니다.',
                    alertHandleClick: null,
                });
            })
            ;
    };

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };
    handleClose = () => {
        this.setState({
            open: false,
        });
    };
    render() {
        console.log('delete render!');
        return (
            <>
                <Button variant="contained" color="secondary" onClick={this.handleOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.deleteCustomer}>삭제</Button>
                        <Button varinat="outlined" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
                {this.state.alertTitle?<Alert title={this.state.alertTitle} message={this.state.alertMessage} 
                handleClick={this.state.alertHandleClick}/>:""}
            </>
        );
    }
}

const Alert = memo(({title, message, handleClick}) => {
    console.log('alert render!');
    const [open, setOpen] = useState(true);
    const handleOkClick = useCallback(()=>{
        setOpen(false);
        console.log('handleClose type', typeof handleClick);

        if(typeof handleClick === 'function')
            handleClick();
    },[handleClick]);
    return (
        <Dialog open={open} onClose={()=>{setOpen(false);}}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleOkClick}>확인</Button>
            </DialogActions>
        </Dialog>
    );
});

export default CustomerDelete;
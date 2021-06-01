import React, { Component } from 'react'
import axios from 'axios';
import HomeData from './HomeData';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            myData:[],
            showData:false,
            favData:[],
        }
    }

    // function to get the data from the data base:
    componentDidMount=async()=>{
        const newData = await axios.get(`${process.env.REACT_APP_BACKECNG_URL}/get-characters`);
        this.setState({
            myData:newData.data,
            showData:true
        });
        console.log(newData.data);
    }
    // function to save the favorite data inside the data bease:
    addToFav= async(data)=>{
        console.log(data);
        const newData = await axios.post(`${process.env.REACT_APP_BACKECNG_URL}/favorite`, data);
        this.setState({
            favData:newData.data,
        });
        console.log(newData.data);
    }

    render() {
        return (
            <div>
                {this.state.showData &&
                <HomeData myData={this.state.myData}
                addToFav={this.addToFav}/>}
            </div>
        )
    }
}

export default Home

import React, { Component } from 'react'
import axios from 'axios';
import FavData from './FavData';
import UpdateForm from './UpdateForm';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            showFavData:false,
            favData:[],
            name:'',
            gender:'',
            slug:'',
            showUpdateForm:false
        }
    }

    // function to get the favorite data from the data base:
    componentDidMount=async()=>{
        const newData = await axios.get(`${process.env.REACT_APP_BACKECNG_URL}/favorite`);
        this.setState({
            favData:newData.data,
            showFavData:true,
        });
        console.log(this.state.favData);
    }

    // function to delete the favorite data from the data base:
    deleteItem=async(slug)=>{
        console.log(slug);
        const newData = await axios.delete(`${process.env.REACT_APP_BACKECNG_URL}/favorite/${slug}`);
        console.log(newData);
        this.setState({
            favData:newData.data
        })
    }

    // function to show the updating form and setting states to the data that will be changed:

    showUpdateForm=(name,gender,slug)=>{
        this.setState({
            name:name,
            gender:gender,
            slug:slug,
            showUpdateForm:true
        })
    }
    
    // functions to update the status while changing the data:
    updateName=(e)=>{this.setState({name:e.target.value})}
    updateGender=(e)=>{this.setState({gender:e.target.value})}

    // function to update the favorite data in the data base:
    updateItem= async(e)=>{
        e.preventDefault();
        const reqBody={
            name:this.state.name,
            gender:this.state.gender
        }
        // console.log(this.state.slug);
        // console.log(this.state.name);
        const newData = await axios.put(`${process.env.REACT_APP_BACKECNG_URL}/favorite${this.state.slug}` ,reqBody);
        this.setState({
            favData:newData.data
        })

    }
    render() {
        return (
            <div>
                { this.state.showUpdateForm &&
                <UpdateForm updateName={this.updateName}
                updateGender={this.updateGender}
                name={this.state.name}
                gender={this.state.gender}
                updateItem={this.updateItem}
                />
                }
                {this.state.showFavData &&
                <FavData favData={this.state.favData}
                deleteItem={this.deleteItem}
                showUpdateForm={this.showUpdateForm}
                />}
            </div>
        )
    }
}

export default Home

import React, { Component } from 'react'

export class FavData extends Component {
    render() {
        console.log(this.props.favData);

        return (
            this.props.favData.map(data=>{
                return <>
                <button onClick={(e)=>this.props.deleteItem(data.slug)}>Delete</button>
                <button onClick={()=>this.props.showUpdateForm(data.name,data.gender,data.slug)}>Update</button>
                <h1>{data.name}</h1>
                <p>{data.gender}</p>
                {/* <img src={data.img} alt=''/> */}
                {/* <img src={data.psiPowers.img} alt=''></img>
                <p>{this.psiPowersName}</p> */}
                </>
            })
        )
    }
}

export default FavData

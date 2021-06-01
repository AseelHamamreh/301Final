import React, { Component } from 'react'

export class HomeData extends Component {
    render() {
        return (
            this.props.myData.map(data=>{
                return <>
                <button onClick={()=>this.props.addToFav(data)}>save to favorite</button>
                <h1>{data.name}</h1>
                <p>{data.gender}</p>
                <img src={data.img} alt=''/>
                {/* <img src={data.img} alt=''></img> */}
                {/* <p>{this.psiPowersName}</p>  */}
                </>
            })
        )
    }
}

export default HomeData

import React, { Component } from 'react'

export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.props.updateItem(e)}>
                    <label>Update Name</label>
                    <input type='text' onChange={(e)=>this.props.updateName(e)} value={this.props.name} />
                    <label>Update Gender</label>
                    <input type='text' onChange={(e)=>this.props.updateGender(e)} value={this.props.gender}/>
                    <button type='submit'>UPDATE ITEM</button>
                </form>
            </div>
        )
    }
}

export default UpdateForm

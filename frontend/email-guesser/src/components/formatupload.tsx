import { SERVER_URL } from "../config";
import React, { Component } from 'react';
import axios from 'axios';
interface IProps {
}

interface IState {
  formatFile?: any;
  Message?: String;
}
export default class FilesUploadComponent extends Component<IProps, IState>  {
    constructor(props:IProps) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            formatFile:'' ,
            Message:''
        }
    }
    onFileChange(e:any) {
        this.setState({ formatFile: e.target.files[0] })
    }
    onSubmit(e:any) {
        e.preventDefault()
        const formData = new FormData()
        console.log(this)
        formData.append('formatfile', this.state.formatFile)
        axios.post(SERVER_URL+"/api/upload", formData, {
        }).then((res:any) => {
            console.log(res);
            this.setState({Message:res.data.message});
        })
    }

    render() {
        return (
            <div className="container ">
                <div className="row">
                    <h1 className="m-5">Upload Format File</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input className="m-5 form-control form-control-lg" type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="col text-center">
                            <button className="btn btn-primary btn-lg" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
                <h2 className="ui dividing header"></h2>
              <div className="text1"> <h3>{this.state.Message}</h3></div>
            </div>
            
        )
    }
}
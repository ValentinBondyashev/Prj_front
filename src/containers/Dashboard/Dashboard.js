import _ from 'lodash';
import React, { Component } from 'react';
import './Dashboard.scss';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {InputText} from 'primereact/components/inputtext/InputText';
import { Row } from 'primereact/components/row/Row';

import {Dropdown} from 'primereact/components/dropdown/Dropdown';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

import axios from 'axios';
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            cars: [ 
                {technology: 'Angular', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'ReactJS', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'Angular', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'ReactJS', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'ReactJS', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'Angular', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'Angular', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'ReactJS', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'Angular', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'Angular', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'ReactJS', mark: '10', disposition: '10', comment: "Воу воу воу"},
                {technology: 'Angular', mark: '10', disposition: '10', comment: "Воу воу воу"},
            ]
        };
        this.editor = this.editor.bind(this);
        this.headerTemplate = this.headerTemplate.bind(this);
        this.footerTemplate = this.footerTemplate.bind(this);
    }

    
    onEditorValueChange(props, value) {
        let updatedCars = [...props.value];
        updatedCars[props.rowIndex][props.field] = value;
        this.setState({cars: updatedCars});
    }

    footerTemplate(data, index) {
        return ([
                    
            ]
        );
    }
    
    calculateGroupTotal(brand) {
        let total = 0;
        
        if(this.state.cars) {
            for(let car of this.state.cars) {
                if(car.brand === brand) {
                    total += car.price;
                }
            }
        }

        return total;
    }
    
    inputTextEditor(props) {
        return <InputText type="text" value={props.rowData[props.field]} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
    }
    
    
    editor(props) {
        console.log(props);
        return this.inputTextEditor(props);
    }
        
    requiredValidator(props) {
        let value = props.rowData[props.field];
        return value && value.length > 0;
    }
    headerTemplate(data) {
        console.log(data);
        return data.technology;
    }
    render() {
        

       
        return (
            <div>
                
                
                <div className="content-section implementation">
                <DataTable header="Технологии" sortField="technology" sortOrder={1} value={this.state.cars} rowGroupMode="subheader"  groupField="technology" rowGroupFooterTemplate={this.footerTemplate}  rowGroupHeaderTemplate={this.headerTemplate} >           
                    <Column field="technology" header="technology" editor={this.editor}/>
                    <Column field="mark" header="mark" editor={this.editor}/>
                    <Column field="disposition" header="disposition" editor={this.editor}/>
                    <Column field="comment" header="comment" editor={this.editor}/>
                </DataTable>
                </div>
            </div>
        );
    }
    }
    
   

    export class CarService {
        
        getCarsSmall() {
            return axios.get('showcase/resources/demo/data/cars-small.json')
                    .then(res => res.data.data);
        }
    
        getCarsMedium() {
            return axios.get('showcase/resources/demo/data/cars-medium.json')
                    .then(res => res.data.data);
        }
    
        getCarsLarge() {
            return axios.get('showcase/resources/demo/data/cars-large.json')
                    .then(res => res.data.data);
        }
    }

export default Dashboard;

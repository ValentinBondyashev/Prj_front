import _ from 'lodash';
import React, { Component } from 'react';
import './Dashboard.scss';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {InputText} from 'primereact/components/inputtext/InputText';
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
            {brand: 'Apple', vin: '51%', color: '40%', year: '$54,406.00', thisYearProfit: '$43,342'},
            {brand: 'Samsung', vin: '83%', color: '96%', year: '$423,132', thisYearProfit: '$312,122'},
            {brand: 'Microsoft', vin: '38%', color: '5%', year: '$12,321', thisYearProfit: '$8,500'},
            {brand: 'Philips', vin: '49%', color: '22%', year: '$745,232', thisYearProfit: '$650,323,'},
            {brand: 'Song', vin: '17%', color: '79%', year: '$643,242', thisYearProfit: '500,332'},
            {brand: 'LG', vin: '52%', color: ' 65%', year: '$421,132', thisYearProfit: '$150,005'},
            {brand: 'Sharp', vin: '82%', color: '12%', year: '$131,211', thisYearProfit: '$100,214'},
            {brand: 'Panasonic', vin: '44%', color: '45%', year: '$66,442', thisYearProfit: '$53,322'},
            {brand: 'HTC', vin: '90%', color: '56%', year: '$765,442', thisYearProfit: '$296,232'},
            {brand: 'Toshiba', vin: '75%', color: '54%', year: '$21,212', thisYearProfit: '$12,533'}
            ]
        };
        this.editor = this.editor.bind(this);
    }

    
    onEditorValueChange(props, value) {
        let updatedCars = [...props.value];
        updatedCars[props.rowIndex][props.field] = value;
        this.setState({cars: updatedCars});
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

    render() {
        let cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ]; 

        let dynamicColumns = cols.map((col,i) => {
            return <Column key={col.field} field={col.field} editor={this.editor} header={col.header} />;
        });
        return (
            <div>

                
                <div className="content-section implementation">
                    <DataTable value={this.state.cars} editable={true}>
                    {dynamicColumns}
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

import _ from 'lodash';
import React, { Component } from 'react';
import './Dashboard.scss';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {InputText} from 'primereact/components/inputtext/InputText';
import { connect } from 'react-redux';
import { getSkillsAction, editSkillsAction } from '../../actions/skill'; 
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import Chart from '../../components/charts/test'
import axios from 'axios';
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            skills: [ 
               
            ]
        };
        this.editor = this.editor.bind(this);
        this.headerTemplate = this.headerTemplate.bind(this);
        this.footerTemplate = this.footerTemplate.bind(this);
        this.onRowUnselect = this.onRowUnselect.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }
    componentWillMount() {
        this.props.getSkillsFunction();
    }
    
    onEditorValueChange(props, value) {
        let updatedCars = [...props.value];
        
        for(let i=0; i < updatedCars.length; i++) {
            if(updatedCars[i]['id'] === props['rowData']['id']) {
                updatedCars[i][props.field] = value;
            }
        }
        
        
        
        this.setState({cars: updatedCars});
    }

    footerTemplate(data, index) {
        return ([
                    
            ]
        );
    }
    
   
    
    inputTextEditor(props) {
       
        return <InputText onKeyDown={(e) => this.onEnter(props, e.target.value, e.keyCode)} onBlur={(e) => this.onRowUnselect(props, e.target.value)} type="text" value={props.rowData[props.field]} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
    }
    
    
    editor(props) {
        return this.inputTextEditor(props);
    }
    
    headerTemplate(data) {
        return data.skillCategoryTitle;
    }

    onRowUnselect(props, value) {
        this.props.editSkillFunction(props['rowData']);
    }
    onEnter(props, value, key) {
        if(key === 13) {
            this.props.editSkillFunction(props['rowData']);
        }
    }
    render() {

        return (
            <div>
                <div className="content-section implementation">
                <DataTable header="Технологии"  value={this.props.skills} rowGroupMode="subheader"  groupField="skillCategoryTitle" rowGroupFooterTemplate={this.footerTemplate}  rowGroupHeaderTemplate={this.headerTemplate} >           
                    <Column field="skillTitle" header="Технология"/>
                    <Column field="mark" header="Скилл" editor={this.editor}/>
                    <Column field="disposition" header="Желание" editor={this.editor}/>
                    <Column field="comment" header="Комментарий" editor={this.editor}/>
                </DataTable>
                </div>
          
            </div>
        );
    }
    }
    
   
    function mapStateToProps(state) {
        console.log(state);
        return { 
            skills: state.skill.skills.data
        };
    }
    function mapDispathToProps(dispatch) {
        return {
            getSkillsFunction: function () {
                dispatch(getSkillsAction());
            },
            editSkillFunction: function (skill) {
                dispatch(editSkillsAction(skill));
            }
        };
    }

export default connect(mapStateToProps,mapDispathToProps)(Dashboard);

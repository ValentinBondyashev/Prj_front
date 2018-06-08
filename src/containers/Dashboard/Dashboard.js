import _ from 'lodash';
import React, { Component } from 'react';
import './Dashboard.scss';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Button} from 'primereact/components/button/Button';
import {Column} from 'primereact/components/column/Column';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { getSkillsAction, editSkillsAction, createSkillsAction, getIdCategoriesAction } from '../../actions/skill'; 
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import Chart from '../../components/charts/test';
import ZoomableLayout from '../../components/ZoomableLayout/ZoomableLayout';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            skill: {skillTitle:'', mark: '', disposition: '', comment: ''},
            displayDialog: false,
            idSkill : 1,
        };
        this.editor = this.editor.bind(this);
        this.headerTemplate = this.headerTemplate.bind(this);
        this.footerTemplate = this.footerTemplate.bind(this);
        this.onRowUnselect = this.onRowUnselect.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }
    componentWillMount() {
        this.props.getSkillsFunction(); 
        this.props.getdCategoriesFunction();
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
        return <InputText onKeyDown={(e) => this.onEnter(props, e.target.value, e.keyCode)} 
                            onBlur={(e) => this.onRowUnselect(props, e.target.value)} 
                            type="text" value={props.rowData[props.field]} 
                            onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
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
    save = () => {
        let data = {
            "categoryId":this.state.idSkill,
            "skillTitle": this.state.skill.skillTitle,
            "mark" : this.state.skill.mark,
            "disposition":this.state.skill.disposition,
            "comment":this.state.skill.comment
        }
        this.props.createSkillsAction(data);
        this.setState({displayDialog: false});
    }
    updateProperty = (property, value) => {
        let skill = this.state.skill;
        skill[property] = value;
        this.setState({skill: skill});
    }
    updatePropertyMark = (property, value) => {
        let skill = this.state.skill;
        skill[property] = value;
        
        if(property === 'mark'){
            if(skill[property] <= 10 || skill[property] >= 0 ){
                if(skill[property] > 10 || skill[property].length == 3){
                    skill[property] = 10;
                }
                this.setState({skill: skill});
            }
        }
    }
    addNew = () => {
        this.setState({ 
            skill: {skillTitle:'', mark: '', disposition: '', comment: ''},
            displayDialog:true });
    }
    handleChange = (e, index, value) => {
        this.setState({idSkill:value})
    }

    render() {

        let footer = <div className="ui-helper-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} icon="fa-plus" label="Add" onClick={this.addNew}/>
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane ui-helper-clearfix">
            <Button label="Save" icon="fa-check" onClick={this.save}/>
        </div>;

        return (
            <div>
                <div className="content-section implementation">
                <DataTable header="Технологии"  value={this.props.skills} rowGroupMode="subheader"  footer={footer}  groupField="skillCategoryTitle" rowGroupFooterTemplate={this.footerTemplate}  rowGroupHeaderTemplate={this.headerTemplate} >           
                    <Column field="skillTitle" header="Технология"/>
                    <Column field="mark" header="Скилл" editor={this.editor}/>
                    <Column field="disposition" header="Желание" editor={this.editor}/>
                    <Column field="comment" header="Комментарий" editor={this.editor}/>
                </DataTable>
                
                <Dialog visible={this.state.displayDialog} header="Add Skill" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
                     <div className="ui-grid ui-grid-responsive ui-fluid">
                        <div className="ui-grid-row">
                            <div className="ui-grid-col-4" style={{padding:'4px 10px'}}><label htmlFor="skillTitle">Технология</label></div>
                            <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                            <DropDownMenu value={this.state.idSkill} onChange={this.handleChange}>{
                                this.props.id ? this.props.id.map((el,index) => (
                                    <MenuItem key={index} value={el.id} primaryText={el.title} />
                                )): null
                            }</DropDownMenu>
                            </div>
                        </div>
                        <div className="ui-grid-row">
                            <div className="ui-grid-col-4" style={{padding:'4px 10px'}}><label htmlFor="skillTitle">Технология</label></div>
                            <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                <InputText id="skillTitle" onChange={(e) => {this.updateProperty('skillTitle', e.target.value)}} value={this.state.skill.skillTitle}/>
                            </div>
                        </div>
                        <div className="ui-grid-row">
                            <div className="ui-grid-col-4" style={{padding:'4px 10px'}}><label htmlFor="mark">Скилл</label></div>
                            <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                <span>От 0 до 10:</span>
                                <InputText id="mark" onChange={(e) => {this.updatePropertyMark('mark', e.target.value)}} value={this.state.skill.mark}/>
                            </div>
                        </div>
                        <div className="ui-grid-row">
                            <div className="ui-grid-col-4" style={{padding:'4px 10px'}}><label htmlFor="disposition">Желание</label></div>
                            <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                <InputText id="disposition" onChange={(e) => {this.updateProperty('disposition', e.target.value)}} value={this.state.skill.disposition}/>
                            </div>
                        </div>
                        <div className="ui-grid-row">
                            <div className="ui-grid-col-4" style={{padding:'4px 10px'}}><label htmlFor="colcommentor">Комментарий</label></div>
                            <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                <InputText id="comment" onChange={(e) => {this.updateProperty('comment', e.target.value)}} value={this.state.skill.comment}/>
                            </div>
                        </div>
                    </div>
                </Dialog>
                {this.props.skills ? <ZoomableLayout skills={this.props.skills}/> : null}
                </div>
          
            </div>
        );
    }
    }
    
   
    function mapStateToProps(state) {
        return { 
            skills: state.skill.skills.data,
            id: state.skill.id.data
        };
    }
    function mapDispathToProps(dispatch) {
        return {
            getSkillsFunction: function () {
                dispatch(getSkillsAction());
            },
            getdCategoriesFunction: function () {
                dispatch(getIdCategoriesAction());
            },
            editSkillFunction: function (skill) {
                dispatch(editSkillsAction(skill));
            }, 
            createSkillsAction: function (skill){
                dispatch(createSkillsAction(skill));
            },
        };
    }

export default connect(mapStateToProps,mapDispathToProps)(Dashboard);

import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { ColDef, GridOptions, ValueFormatterParams, GridReadyEvent, GridApi, ColumnApi} from 'ag-grid-community';
import { User } from './user.interface'
import userJsonData from '../../../../../Frontend/users.json';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // const iUser: User = JSON.parse(userJsonData);
  UserDataSource: User[] = userJsonData as User[];
  iUserArr: User[];
  queryName: string;
  api: GridApi;
  columnApi: ColumnApi;
  columnDefs: ColDef[]=[
    {field: 'name', headerName: 'Name'},
    {field: 'age', headerName: 'Age'},
    {field: 'registered', headerName: 'Registered Date',valueFormatter: registeredDateFormatter},
    {field: 'email', headerName: 'Email'},
    {field: 'balance', headerName: 'Balance', valueFormatter: balanceFormatter}
  ];
  defaultColDef: ColDef = {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  constructor() { 
    // asc order.
    this.UserDataSource.sort(function(a, b){
      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    });
    this.iUserArr = DeepCloneUserDataArr(this.UserDataSource);
    this.queryName = '';
  }
  ngOnInit(): void {
  }
  onGridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.setDomLayout("autoHeight");
  }
  Query(): void{
    this.iUserArr = DeepCloneUserDataArr(this.UserDataSource).filter(a => a.name.indexOf(this.queryName) > -1);
  }
  ResetBalance(): void{
    this.iUserArr.forEach(function(obj){
      obj.balance = '0';
    });
    this.api.refreshCells();
  }
  ClearQueryAndReset(): void{
    this.queryName = '';
    this.iUserArr = DeepCloneUserDataArr(this.UserDataSource);
  }
}
function DeepCloneUserDataArr(UserDataSource: User[]): User[]{
  let cloneArr: User[] = JSON.parse(JSON.stringify(UserDataSource));
  return cloneArr;
}
function padTo2Digits(num: number): String{
  return num.toString().padStart(2, '0');
}
function registeredDateFormatter(params: ValueFormatterParams){
  let date = new Date(params.value.replace(' ',''));
  return ([padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('-')) 
  + ' ' + ([padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':'));
}
function balanceFormatter(params: ValueFormatterParams){
  let float = parseFloat(params.value.replace(',',''));
  return (Math.round(float*100)/100).toString();
}
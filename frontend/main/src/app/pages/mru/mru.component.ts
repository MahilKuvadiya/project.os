import { Component } from '@angular/core';

@Component({
  selector: 'app-mru',
  templateUrl: './mru.component.html',
  styleUrls: ['./mru.component.css']
})
export class MruComponent {
  
  constructor() { }
  
  tableData:any = [];
  frames:any;
  pages: any=[];

  keys:any = [];
  values:any = [];
  hitcount = 0;
  misscount = 0;
  getData(){
    
    this.tableData.forEach((element:any) => {
      this.values.push(Object.values(element));
      this.keys= Object.keys(element);
    });
  }
  submit(frames:any,istring:any){
    this.frames= frames;
    this.pages = istring.split(" ");
    let count = 0;
    let n =this.pages.length;
    
    let hit =[];
    let inst =[];
    let v =[];
    for (let index = 0; index < this.pages.length; index++) {
      hit[index] = "No";  
      v[index] = "-";
      // for (let j = 0; j < frames; j++) {
      //     inst[index][j]="-";   
      // }
    }
    let mentian = [];
    for (var i = 0; i < n; i++) {
      let temp3=[];
      var idx = inst.indexOf(this.pages[i]);
      if (idx == -1) {
          if (inst.length < frames) {
              // inst.push(pages[i]);
              inst.unshift(this.pages[i]);
          }
          else {             
              v[i] = inst[0];
              inst.splice(0,1);
              inst.unshift(this.pages[i]);
          }
          this.misscount++;
      }
      else {
         
          inst.splice(inst.indexOf(this.pages[i]), 1);
          inst.unshift(this.pages[i]);
          hit[i] = "Yes";
          this.hitcount++;
      }
      for (let k = 0; k < frames; k++) {
        if (inst[k] == undefined) {
          temp3[k] = "-";
        }else{
          temp3[k] = inst[k];
        }
      }
      
      mentian.push(temp3);   
  }
  for (let index = 0; index < this.pages.length; index++) {
    let temp:any = {};
    let tempstring = "P"+ count;
    count++;
    temp[`name`] = tempstring;
    temp[`page`] = this.pages[index];
    for (let i = 0; i < frames; i++) {
      temp[`frame${i+1}`] = mentian[index][i];
    }
    temp[`Hit`] = hit[index]; 
    temp[`Replaced`] = v[index]; 
    this.tableData.push(temp);
  }
  this.getData();
  }

}
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor() { }

  exportExcel(selectedMembers:any[],_selectedColumns:any[],fileName:string) {
   
  
    const selectedMembersselectedColumns = selectedMembers.map(member => {
        const membernow: any = {};
        _selectedColumns.forEach(columnName => {
            membernow[columnName.dataKey] = member[columnName.dataKey];
        });
        return membernow;
      });

   /* import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(selectedMembersselectedColumns);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, fileName);
    });*/
}


exportPdf(selectedMembers:any[],_selectedColumns:any[],fileName:string) {




    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
               // add logo
     const logo = new Image();
     logo.src = '/assets/logoGym.png';
     doc.addImage(logo, 'PNG', 5, 5, 25, 25);

  // add header text with style
    doc.setFontSize(22);
    doc.setFont('bold');
    doc.text('List '+fileName, 40, 15);
            (doc as any).autoTable(_selectedColumns, selectedMembers);
            doc.save(fileName+'.pdf');
        });
    });
}


saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}

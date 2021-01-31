parseExcel = function(file) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    workbook.SheetNames.forEach(function(sheetName) {
      var XL_row_object = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
      var line = 0;
      var contcount = 0;
      var allRows = XL_row_object.split(/\r?\n|\r/);
      //var table = '<table>';
      var dt = new Date();
      var refno = get_date_str(dt, "");
      var edi = "UNB+UNOA:4+KMT+"+$("#in_code").val()+"+"+get_date_str(dt, "daterawonly")+":"+get_date_str(dt, "timetominrawonly")+"+"+refno+"'\n"; 
      edi += "UNH+"+refno+"+COPRAR:D:00B:UN:SMDG21+LOADINGCOPRAR'\n"; line++;
                      
      //process header
      var report_dt = ""; var voyage = ""; var vslname = ""; var callsign = ""; var opr = "";
      for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
          if(singleRow>6) break;
          let rowCells = allRows[singleRow].split(',');
          if(singleRow==1) {
              let tmpdt = rowCells[1].split('/');
              let day = tmpdt[0];
              let month = tmpdt[1];
              let tmpyear = tmpdt[2].split(' ');
              let report_date = new Date(tmpyear[0] + "-" + month + "-" + day + " " + tmpyear[1]);
              report_dt = get_date_str(report_date, "");
          }
          if(singleRow==3) {
              if(typeof rowCells[3]!="undefined") {
                  let tmp = rowCells[3].split('/');
                  voyage = tmp[0];
                  callsign = tmp[1];
                  opr = tmp[2];
                  vslname = rowCells[1];
              }
          }
      }                
      edi += "BGM+45+"+report_dt+"+5'\n"; line++;
      edi += "TDT+20+"+voyage+"+1++172:"+opr+"+++"+callsign+":103::"+vslname+"'\n"; line++;
      edi += "RFF+VON:"+voyage+"'\n"; line++;
      let tmp; let dim;
      for (singleRow = 0; singleRow < allRows.length; singleRow++) {
        if(typeof allRows[singleRow]!="undefined") {
          let rowCells = allRows[singleRow].split(',');
          if(singleRow>7) {
              contcount++;
              //rowCells[3] //5 - F, 4 - E
              let fe = "5";
              if(typeof rowCells[3]!="undefined" && rowCells[3]=="E") fe = "4";
              //2 TS - N, 6 TS - Y
              let type = "2";
              if(typeof rowCells[11]!="undefined" && rowCells[11]=="Y") type = "6";
              
              if(typeof rowCells[1]!="undefined" && typeof rowCells[7]!="undefined") { edi += "EQD+CN+"+rowCells[1]+"+"+rowCells[7]+":102:5++"+type+"+"+fe+"'\n"; line++; }
              if(typeof rowCells[6]!="undefined") { edi += "LOC+11+"+rowCells[6]+":139:6'\n"; line++; }
              if(typeof rowCells[19]!="undefined") { edi += "LOC+9+"+rowCells[19]+":139:6'\n"; line++; }
              if(typeof rowCells[13]!="undefined") { edi += "MEA+AAE+VGM+KGM:"+rowCells[13]+"'\n"; line++; }
              if(typeof rowCells[8]!="undefined") { edi += "FTX+AAI+++"+rowCells[8]+"'\n"; line++; }
              if(typeof rowCells[14]!="undefined" && rowCells[14]!="" && $.trim(rowCells[14])!="/") {
                tmp = rowCells[14].split('/');
                edi += "DGS+IMD+"+tmp[0]+"+"+tmp[1]+"'\n"; line++;
              }
              if(typeof rowCells[17]!="undefined" && $.trim(rowCells[17])!="" && $.trim(rowCells[17])!="/") {
                tmp = rowCells[17].split(',');
                for(let i=0; i<tmp.length; i++) {
                    dim = rowCells[17].split('/');
                    if($.trim(dim[0])=="OF") {
                        edi += "DIM+5+CMT:"+$.trim(dim[1])+"'\n"; line++;
                    }
                    if($.trim(dim[0])=="OB") {
                        edi += "DIM+6+CMT:"+$.trim(dim[1])+"'\n"; line++;
                    }
                    if($.trim(dim[0])=="OR") {
                        edi += "DIM+7+CMT::"+$.trim(dim[1])+"'\n"; line++;
                    }
                    if($.trim(dim[0])=="OL") {
                        edi += "DIM+8+CMT::"+$.trim(dim[1])+"'\n"; line++;
                    }
                    if($.trim(dim[0])=="OH") {
                        edi += "DIM+9+CMT:::"+$.trim(dim[1])+"'\n"; line++;
                    }
                }
              }
              if(typeof rowCells[25]!="undefined" && $.trim(rowCells[25])!="" && $.trim(rowCells[25])!="/") {
                let tmp = rowCells[25].split(',');
                if(tmp[0]=="L") {
                    edi += "SEL+"+tmp[1]+"+CA'\n"; line++; 
                }
                if(tmp[0]=="S") {
                    edi += "SEL+"+tmp[1]+"+SH'\n"; line++; 
                }
                if(tmp[0]=="M") {
                    edi += "SEL+"+tmp[1]+"+CU'\n"; line++; 
                }
              }
              if(typeof rowCells[15]!="undefined" && $.trim(rowCells[15])!="" && $.trim(rowCells[15])!="/") {
                edi += "TMP+2+"+rowCells[15]+":CEL'\n"; line++;
              }
              if(typeof rowCells[12]!="undefined" && $.trim(rowCells[12])!="" && $.trim(rowCells[12])!="/") {
                edi += "FTX+AAA+++"+$.trim(rowCells[12])+"'\n"; line++;
              }
              if(typeof rowCells[18]!="undefined" && $.trim(rowCells[18])!="" && $.trim(rowCells[18])!="/") {
                edi += "FTX+HAN++"+rowCells[18]+"'\n"; line++;
              }
              if(typeof rowCells[2]!="undefined" && $.trim(rowCells[2])!="") { edi += "NAD+CF+"+rowCells[2]+":160:ZZZ'\n"; line++; } 
          }                    
        }
      } 
      contcount--;
      edi += "CNT+16:"+contcount+"'\n"; line++; line++;
      edi += "UNT+"+line+"+"+refno+"'\n";
      edi += "UNZ+1+"+refno+"'";
      $('#data_out').val(edi);

    })

  };

  reader.onerror = function(ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
};

var oFileIn;

$(function() {
  oFileIn = document.getElementById('sel_file');
  if(oFileIn.addEventListener) {
      oFileIn.addEventListener('change', filePicked, false);
  }
});


function filePicked(oEvent) {
  // Get The File From The Input
  var oFile = oEvent.target.files[0];
  var sFilename = oFile.name;
  parseExcel(oFile)
  
}

function copy() {
  /* Get the text field */
  var copyText = document.getElementById("ediholder");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Text Copied!");
} 

function get_date_str(d, type) {
  var now = d;
  var dt = now.getDate();
  dt = (String(dt).length<2)? String("0") + String(dt) : dt;
  var hrs = now.getHours();
  hrs = (String(hrs).length<2)? String("0") + String(hrs) : hrs;
  var min = now.getMinutes();
  min = (String(min).length<2)? String("0") + String(min) : min;
  var sec = now.getSeconds();
  sec = (String(sec).length<2)? String("0") + String(sec) : sec;
  var mth = (now.getMonth() + 1);
  mth = (String(mth).length<2)? String("0") + String(mth) : mth;
  if(type=="daterawonly") {
      return now.getFullYear()+''+String(mth)+''+String(dt);
  } else if(type=="timetominrawonly"){
      return String(hrs)+''+String(min);
  } else {
      return now.getFullYear()+''+String(mth)+''+String(dt)+''+String(hrs)+''+String(min)+''+String(sec);
  }
}
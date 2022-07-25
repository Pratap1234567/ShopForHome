import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Dreport } from 'src/_Models/dreport';
import { Report } from 'src/_Models/report';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  chart: any = [];
  chart1: any;
  report = new Report();
  reportinfo: Report[] = [];
  income: any = 0;

  // inforation 
  dayreport: Dreport[] = [];
  dchairs: number = 0;
  dtables: number = 0;
  dframes: number = 0;
  dbags: number = 0;
  dhangs: number = 0;
  dhdecors: number = 0;
  dlights: number = 0;
  dbeds: number = 0;
  dsofas: number = 0;
  dclock: number = 0;
  dwinCover: number = 0;
  dDresstable: number = 0;


  creport: Dreport[] = [];
  chairs: number = 0;
  tables: number = 0;
  frames: number = 0;
  bags: number = 0;
  hangs: number = 0;
  hdecors: number = 0;
  lights: number = 0;
  beds: number = 0;
  sofas: number = 0;
  clock: number = 0;
  winCover: number = 0;
  Dresstable: number = 0;




  // 
  constructor(private service: RestService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {

    this.service.income().subscribe(d => { this.income = d; console.log(this.income) }, f => console.log("Error " + f));

    this.service.getreport().subscribe(d => { this.reportinfo = d; console.log(this.reportinfo) }, f => console.log("error " + f), () => console.log("success in report info"));

    // day report 
    this.service.dayreport().subscribe(d => {
      console.log(d); console.log(this.reportinfo); this.dayreport = d; console.log(this.dayreport)
      for (let ele of this.dayreport) {
        if (ele.category === "Bags") {
          this.dbags = ele.qty
        }
        else if (ele.category === "Clocks") {
          this.dclock = ele.qty
        }
        else if (ele.category === "frames") {
          this.dframes = ele.qty
          console.log(this.dframes)
        }
        else if (ele.category === "chairs") {
          this.dchairs = ele.qty
        }
        else if (ele.category === "wall hangings") {
          this.dhangs = ele.qty
        }
        else if (ele.category === "window coverings") {
          this.dwinCover = ele.qty
        }
        else if (ele.category === "Dressing Table") {
          this.dDresstable = ele.qty
        }
        else if (ele.category === "Home Decor") {
          this.dhdecors = ele.qty
        }
        else if (ele.category === "tables") {
          this.dtables = ele.qty
        }
        else if (ele.category === "Beds") {
          this.dbeds = ele.qty
        }
        else if (ele.category === "Sofas") {
          this.dsofas = ele.qty
        }
        else if (ele.category === "lights") {
          this.dlights = ele.qty
          console.log()
        }
      }

      this.chart = new Chart("pieChart", {
        type: 'pie',
        data: {
          labels: ["chair", "Tables", "Frames", "Bags", "Wall hangings", "Home decors", "Lights", "Bed", "Sofas", "clock"],
          datasets: [{
            data: [this.dchairs, (this.dtables + this.dDresstable), this.dframes, this.dbags, this.dhangs, this.dhdecors, this.dlights, this.dbeds, this.dsofas, this.dclock],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#283618", "#03045e", "#ccff33", "#3c096c", "#fcf300"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#606c38", "#023e8a", "#9ef01a", "#9d4edd", "#fe9e2e"]
          }]
        },
        options: {
          responsive: true
        }
      });

    }
      , f => console.log("error " + f), () => console.log("success in dayreport info"));

    // end of day report


    // total category report
    this.service.Categoryreport().subscribe(d => {
      console.log(d); console.log(this.reportinfo); this.creport = d; console.log(this.creport)
      for (let ele of this.creport) {
        if (ele.category === "Bags") {
          this.bags = ele.qty
        }
        else if (ele.category === "Clocks") {
          this.clock = ele.qty
        }
        else if (ele.category === "frames") {
          this.frames = ele.qty
          console.log(this.dframes)
        }
        else if (ele.category === "chairs") {
          this.chairs = ele.qty
        }
        else if (ele.category === "wall hangings") {
          this.hangs = ele.qty
        }
        else if (ele.category === "window coverings") {
          this.winCover = ele.qty
        }
        else if (ele.category === "Dressing Table") {
          this.Dresstable = ele.qty
        }
        else if (ele.category === "Home Decor") {
          this.hdecors = ele.qty
        }
        else if (ele.category === "tables") {
          this.tables = ele.qty
        }
        else if (ele.category === "Beds") {
          this.beds = ele.qty
        }
        else if (ele.category === "Sofas") {
          this.sofas = ele.qty
        }
        else if (ele.category === "lights") {
          this.lights = ele.qty
        }
      }

      this.chart1 = new Chart("pieChart1", {
        type: 'pie',
        data: {
          labels: ["chair", "Tables", "Frames", "Bags", "Wall hangings", "Home decors", "Lights", "Bed", "Sofas", "clock"],
          datasets: [{
            data: [this.chairs, (this.tables + this.Dresstable), this.frames, this.bags, this.hangs, this.hdecors, this.lights, this.beds, this.sofas, this.clock],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#283618", "#03045e", "#ccff33", "#3c096c", "#fcf300"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#606c38", "#023e8a", "#9ef01a", "#9d4edd", "#fe9e2e"]
          }]
        },
        options: {
          responsive: true
        }
      });

    }
      , f => console.log("error " + f), () => console.log("success in dayreport info"));

    // this.chart1 = new Chart("pieChart1", {
    //   type: 'pie',
    //   data: {
    //     labels: ["chair", "Tables", "Frames", "Bags", "Wall hangings", "Home decors", "Lights", "Bed", "Sofas", "clock"],
    //     datasets: [{
    //       data: [12, 5, 4, 9, 10, 5, 7, 2, 12, 6],
    //       backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#283618", "#03045e", "#ccff33", "#3c096c", "#fcf300"],
    //       hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#606c38", "#023e8a", "#9ef01a", "#9d4edd", "#fe9e2e"]
    //     }]
    //   },
    //   options: {
    //     responsive: true
    //   }
    // });
  }




}

// if(ele.category === "Bags"){

// }
// else if(ele.category === "Clocks"){

// }
// else if(ele.category === "frames"){

// }
// else if(ele.category === "chairs"){

// }
// else if(ele.category === "wall hangings"){

// }
// else if(ele.category === "window coverings"){

// }
// else if(ele.category === "Dressing Table"){

// }
// else if(ele.category === "Home Decor"){

// }
// else if(ele.category === "tables"){

// }
// else if(ele.category === "Beds"){

// }
// else if(ele.category === "Sofas"){

// }
// else if(ele.category === "Lights"){

// }
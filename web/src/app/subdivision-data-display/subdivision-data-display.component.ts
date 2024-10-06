import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-subdivision-data-display",
  templateUrl: "./subdivision-data-display.component.html",
  styleUrls: ["./subdivision-data-display.component.css"],
})
export class SubdivisionDataDisplayComponent implements OnInit {
  sourceData: any[] = [];
  filteredData: any[] = [];
  displayedColumns: string[] = [
    "id",
    "code",
    "name",
    "subdivisionStatusCode",
    "nearMapImageDate",
  ];
  displayedData: any[] = [];
  pageIndex = 0;
  pageSize = 10;
  filterValues: any[] = [];

  constructor(private http: HttpClient) {
    this.filteredData = this.sourceData;
  }

  ngOnInit(): void {
    this.http
      .get("http://localhost:3000/v1/subdivisions")
      .subscribe((incoming: any) => {
        this.sourceData = incoming.subdivisions;
        this.getFilterValues();
        this.getPagedData(this.sourceData);
      });
  }

  handlePageEvent(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPagedData(this.filteredData);
  }

  private getPagedData(dataSource: any[]): void {
    const startIndex = this.pageIndex * this.pageSize;
    const end = startIndex + this.pageSize;
    this.filteredData = dataSource;
    this.displayedData = dataSource.slice(startIndex, end);
  }

  private getFilterValues(): void {
    this.filterValues.push({
      value: 'none',
      viewValue: 'No Filter'
    });
    const unique = [...new Set(this.sourceData.map(item => item.subdivisionStatusCode))];
    unique.forEach(value => {
      this.filterValues.push({
        value,
        viewValue: value
      });
    });
  }

  onFilterChanged(event: any): void {
    let filteredData: any[] = [];
    this.pageIndex = 0;
    if(!event || event.value === 'none') {
      this.getPagedData(this.sourceData);
    } else {
      this.sourceData.forEach(item => {
        if (item.subdivisionStatusCode === event.value) {
          filteredData.push(item);
        }
      });
    
      this.getPagedData(filteredData);
    }
  }
}

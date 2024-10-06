import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;
  let httpClient: HttpClient;

  const mockHttpData = {
    subdivisions: [{
      'id': 0,
      'code': 0,
      'name': 'name1',
      'subdivisionStatusCode': 'Active',
      'nearMapImageDate': '2024-10-31'
    },{
      'id': 1,
      'code': 1,
      'name': 'name2',
      'subdivisionStatusCode': 'Active',
      'nearMapImageDate': '2024-10-31',
    },{
      'id': 3,
      'code': 0,
      'name': 'name3',
      'subdivisionStatusCode': 'Builtout',
      'nearMapImageDate': '2024-10-31',
    }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdivisionDataDisplayComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [     
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule 
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    component.sourceData = mockHttpData.subdivisions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test a handle page event from paginator', () => {
    spyOn(component, 'handlePageEvent').and.callThrough();

    component.filteredData = [];
    component.handlePageEvent({
      pageIndex: 2,
      pageSize: 2
    });

    expect(component.handlePageEvent).toHaveBeenCalled();
    expect(component.pageIndex).toBe(2);
    expect(component.pageSize).toBe(2);
  });

  it('should test the onFilterChanged method', () => {
    spyOn(component, 'onFilterChanged').and.callThrough();

    component.onFilterChanged(null);

    expect(component.onFilterChanged).toHaveBeenCalled();
    expect(component.filteredData.length).toBe(mockHttpData.subdivisions.length);

    component.onFilterChanged({
      value: 'Builtout',
      viewValue: 'test',
    });

    expect(component.onFilterChanged).toHaveBeenCalled();
    expect(component.filteredData.length).toBe(1);
  });
});

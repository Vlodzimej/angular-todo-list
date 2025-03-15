/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableCellStateComponent } from './table-cell-state.component';

describe('TableCellStateComponent', () => {
  let component: TableCellStateComponent;
  let fixture: ComponentFixture<TableCellStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

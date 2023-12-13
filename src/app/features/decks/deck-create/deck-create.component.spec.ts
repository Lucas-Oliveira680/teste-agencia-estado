import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCreateComponent } from 'src/app/features/decks/deck-create/deck-create.component';

describe('DeckCreateComponent', () => {
  let component: DeckCreateComponent;
  let fixture: ComponentFixture<DeckCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

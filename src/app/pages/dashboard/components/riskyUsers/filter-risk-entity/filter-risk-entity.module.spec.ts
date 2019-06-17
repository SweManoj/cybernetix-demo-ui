import { FilterRiskEntityModule } from './filter-risk-entity.module';

describe('FilterRiskEntityModule', () => {
  let filterRiskEntityModule: FilterRiskEntityModule;

  beforeEach(() => {
    filterRiskEntityModule = new FilterRiskEntityModule();
  });

  it('should create an instance', () => {
    expect(filterRiskEntityModule).toBeTruthy();
  });
});

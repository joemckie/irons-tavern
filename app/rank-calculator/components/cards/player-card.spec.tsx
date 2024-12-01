import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generatePlayerTests } from '@/test-utils/generate-player-tests';
import { format } from 'date-fns';
import { calculateScaling } from '../../utils/calculators/calculate-scaling';
import { PlayerCard } from './player-card';
import { formatPercentage } from '../../utils/format-percentage';

generatePlayerTests(formDataMocks, (formData) => {
  beforeEach(async () => {
    render(
      <MockFormProvider defaultValues={formData}>
        <PlayerCard />
      </MockFormProvider>,
    );

    await screen.findByRole('heading', { name: /player/i });
  });

  it('renders the player name', () => {
    expect(screen.getByLabelText(/player name/i).textContent).toMatch(
      formData.playerName,
    );
  });

  it('renders the join date', () => {
    expect(screen.getByLabelText(/join date/i).textContent).toBe(
      format(formData.joinDate, 'dd MMM yyyy'),
    );
  });

  it('renders the point scaling value', () => {
    const scaling = calculateScaling(formData.joinDate);

    expect(screen.getByLabelText(/point scaling/i).textContent).toBe(
      formatPercentage(scaling),
    );
  });
});

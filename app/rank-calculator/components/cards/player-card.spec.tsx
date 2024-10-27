import { it, expect } from '@jest/globals';
import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generatePlayerTests } from '@/test-utils/generate-player-tests';
import { format } from 'date-fns';
import { calculateScaling } from '../../utils/calculate-scaling';
import { PlayerCard } from './player-card';

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
    expect(screen.getByLabelText(/join date/i)).toHaveValue(
      format(formData.joinDate!, 'dd-MM-yyyy'),
    );
  });

  it('renders the point scaling value', () => {
    const scaling = (calculateScaling(formData.joinDate) * 100).toFixed(2);

    expect(screen.getByLabelText(/point scaling/i).textContent).toBe(
      `${scaling}%`,
    );
  });
});

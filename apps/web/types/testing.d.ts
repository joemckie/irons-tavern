export interface CategoryFixture<T extends CommonPointCalculatorData> {
  earlyGamePlayer: ScalingFixtureMap<T>;
  midGamePlayer: ScalingFixtureMap<T>;
  endGamePlayer: ScalingFixtureMap<T>;
}

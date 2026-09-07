import CoreAbilityTracker from 'parser/shared/modules/AbilityTracker';
import { TALENTS_PRIEST } from 'common/TALENTS';
import { CastEvent } from 'parser/core/Events';

class AbilityTracker extends CoreAbilityTracker {
  _previousPowerInfusionTimestamp = 0;

  onCast(event: CastEvent) {
    const spellId = event.ability.guid;

    // Ignore 2nd consecutive cast of Power Infusion
    // that happens because of talent 'Twins of the Sun Priestess'
    if (spellId == TALENTS_PRIEST.POWER_INFUSION_TALENT.id) {
      if (!this.isNewPowerInfusionCast(event.timestamp)) {
        return;
      }

      this._previousPowerInfusionTimestamp = event.timestamp;
    }

    super.onCast(event);
  }

  isNewPowerInfusionCast(timestamp: number): boolean {
    return timestamp - this._previousPowerInfusionTimestamp > 1_000;
  }
}

export default AbilityTracker;

import { CastEvent } from 'parser/core/Events';
import CoreGlobalCooldown from 'parser/shared/modules/GlobalCooldown';
import SPELLS from 'common/SPELLS';

class GlobalCooldown extends CoreGlobalCooldown {
  onCast(event: CastEvent) {
    if (event.ability.guid === SPELLS.EVANGELISM_HEAL.id) {
      // This GCD gets handled by the 'Power Word: Radiance'
      // that is automatically cast by Evangelism
      // (PWR is the cast event before Evangelism)
      return;
    }

    super.onCast(event);
  }
}

export default GlobalCooldown;

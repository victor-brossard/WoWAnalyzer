import SPELLS from 'common/SPELLS';
import CoreHaste from 'parser/shared/modules/Haste';
import { Options } from 'parser/core/Analyzer';
import { TALENTS_PRIEST } from 'common/TALENTS';

class Haste extends CoreHaste {
  constructor(options: Options) {
    super(options);

    /* https://www.wowhead.com/spell=390691/borrowed-time (as-of 12.0.7)
     * "Casting Power Word: Shield increases your Haste by 5% (level 1) / 10% (level 2) for 4 sec."
     */
    if (this.selectedCombatant.hasTalent(TALENTS_PRIEST.BORROWED_TIME_TALENT)) {
      const hasteBuff =
        0.05 * this.selectedCombatant.getTalentRank(TALENTS_PRIEST.BORROWED_TIME_TALENT);
      this.addHasteBuff(SPELLS.BORROWED_TIME_BUFF.id, hasteBuff);
    }

    /* https://www.wowhead.com/spell=1250835/dark-enlightenment (as-of 12.0.7)
     * "Increases your haste by 3%."
     */
    if (this.selectedCombatant.hasTalent(TALENTS_PRIEST.DARK_ENLIGHTENMENT_TALENT)) {
      // We do this "manually" since there is no buff associated with this.
      const newHaste = Haste.addHaste(this.current, 0.03);
      this._triggerChangeHaste(null, this.current, newHaste);
      this.current = newHaste;
    }
  }
}

export default Haste;

const consts = require('./constants/TypingConstants');
const gameConsts = require('./constants/GameConstants');

class TypeInput {
    constructor(side, tManager, playerId) {
        this.tManager = tManager;
        this.side = side;
        this.playerId = playerId;
        this.currInput = [];
        this.textColor = gameConsts.PLAYER_SIDE_COLOR[side];
    }

    updateInKey = (keyB) => {
        const key = keyB.toUpperCase();
        this.currInput.push(key);
        const result = this.tManager.setTyping(this.textColor, this.currInput, this.playerId);
        if ((result == consts.TM_TYPING_FULLMATCH) ||
            (result == consts.TM_TYPING_TYPO_RESET) ||
            (result == consts.TM_TYPING_TYPO_NO_MATCH)) {
            this.currInput = [];
        }
        else if ((result == consts.TM_TYPING_TYPO)) {
            this.currInput.pop();
        }
        return result;
    };

    resetInput = () =>  {
        this.currInput = [];
        this.tManager.resetTyping(this.playerId);
    };

}

module.exports = TypeInput;
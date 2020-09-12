const consts = require('./constants/TypingConstants');

class TypeManager {

    constructor() {
        this.playerTypeblesList = new Map();
        this.typebleList = new Map();
        this.playersList = new Map();
        this.numOfTypos = 0;
    }

    registerTypeble = (value) => {
        this.typebleList.set(value.getId(), value);
    };

    registerPlayer = (value) => {
        this.playersList.set(value.getId(), value);
    };

    resetTyping = (playerId) => {
        if (this.playerTypeblesList.has(playerId)) {
            const en = this.typebleList.get(this.playerTypeblesList.get(playerId));
            en.setTypedText("");
            this.playerTypeblesList.delete(playerId);
        }
    };

    setTyping = (rgb, text, playerId) => {
        if(this.playerTypeblesList.has(playerId)) {
            const noTypeble = this.checkIfPlayerHasNoTypeble(playerId);
            if(noTypeble) {
                return noTypeble;
            }
            return this.typebleMatchExisting(text, rgb, playerId);
        } else {
            const foundTypeble = this.findNewTypeble(text, rgb, playerId);
            if(foundTypeble || foundTypeble===0) {
                return foundTypeble;
            }
        }
        return consts.TM_TYPING_TYPO_NO_MATCH;

    };

    findNewTypeble = (text, rgb, playerId) => {
        let inText = text.join('').trim();
        let player = this.playersList.get(playerId);
        for (let [key, typeble] of this.typebleList.entries()) {
            if(typeble.getWords() === inText) {
                return this.killTypeble(typeble, player, inText);
            }
            else if (typeble.getWords().startsWith(inText)) {
                return this.assignTypebleToPlayer(typeble, player, rgb, inText);
            }
        }
    };

    checkIfPlayerHasNoTypeble = (playerId) => {
        const typeble = this.typebleList.get(this.playerTypeblesList.get(playerId));
        if (!typeble) {
            this.numOfTypos = 0;
            this.playerTypeblesList.delete(playerId);
            return consts.TM_TYPING_TYPO_NO_MATCH;
        }
    };

    typebleMatchExisting = (text, rgb, playerId) => {
        let inText = text.join('').trim();
        let player = this.playersList.get(playerId);
        const typeble = this.typebleList.get(this.playerTypeblesList.get(playerId));
        const enWords = typeble.getWords();
        const key = typeble.getId();
        if ((enWords === inText) && ((this.playerTypeblesList.get(playerId) === key))) {
            return this.killTypeble(typeble, player, inText);
        } else if (enWords.startsWith(inText) && ((this.playerTypeblesList.get(playerId) === key))) {
            return this.partmatchTypeble(typeble, player, rgb, inText);
        } else {
            return this.typoTypeble(playerId);
        }
    };

    typoTypeble = (playerId) => {
        this.numOfTypos = this.numOfTypos + 1;
        if (this.numOfTypos >= 3) {
            this.numOfTypos = 0;
            this.resetTyping(playerId);
            this.playerTypeblesList.delete(playerId);
            return consts.TM_TYPING_TYPO_RESET;
        }
        return consts.TM_TYPING_TYPO;
    };

    killTypeble = (typeble, player, inText) => {
        this.numOfTypos = 0;
        typeble.setTypedText(inText);
        player.rotate(typeble.x, typeble.y);
        typeble.kill(player);
        this.playerTypeblesList.delete(player.getId());
        this.typebleList.delete(typeble.getId());
        return consts.TM_TYPING_FULLMATCH;
    };

    assignTypebleToPlayer = (typeble, player, rgb, inText) => {
        this.playerTypeblesList.set(player.getId(), typeble.getId());
        return this.partmatchTypeble(typeble, player,rgb,inText);
    };

    partmatchTypeble = (typeble, player, rgb, inText) => {
        this.numOfTypos = 0;
        typeble.setFillRgb(rgb);
        typeble.setTypedText(inText);
        player.rotate(typeble.x, typeble.y);
        return consts.TM_TYPING_PARTMATCH;
    };

}

module.exports = TypeManager;
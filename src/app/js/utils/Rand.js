define(function(require) {
    function normalizeRand(scalar, correction) {
        return Math.floor(Math.random() * scalar) + correction;
    }

    function roll(sides) {
        if (sides < 1) throw new Error("Rand.roll requires 1 or more sides.");
        return normalizeRand(sides, 1);
    }

    function rollFromZero(sides) {
        if (sides < 1) throw new Error("Rand.rollFromZero requires 1 or more sides.");
        return normalizeRand(sides, 0);
    }

    function randInt(low, high) {
        return normalizeRand((high - low + 1), low);
    }

    function rolledByOdds(odds) {
        if (odds < 0 || odds > 1) throw new Error("Rand.rolledByOdds requires a value from 0 to 1");
        return Math.random() < odds;
    }

    function pickItem(items) {
        //Takes an array of items
        var pick = rollFromZero(items.length);
        return items[pick];
    }

    function keys(table) {
        var keyList = [];
        for (entry in table) {
            if (table.hasOwnProperty(entry)) { 
                keyList.push(entry);
            }
        }
        return keyList;        
    }

    function pickEntryKey(table) {
        var keyList = keys(table);
        return pickItem(keyList);
    }

    function pickByFreqTable(frequencyTable) {
        var i;
        var rawFrequencyList = [];
        for (entry in frequencyTable) {
            for (i = 0; i < frequencyTable[entry]; i++) {
                rawFrequencyList.push(entry);
            }
        }
        return pickItem(rawFrequencyList);
    }

    return {
        roll: roll,
        rollFromZero: rollFromZero,
        rolledByOdds: rolledByOdds,
        randInt: randInt,
        pickItem: pickItem,
        pickEntryKey: pickEntryKey,
        pickByFreqTable: pickByFreqTable
    }
});

define(function(require) {

    var armor = {
        none: {
            ac: 0,
            weight: 0, 
            cost: 0,
            name: "No Armor",
            armorType: "armor"
        }, 
        leather: {
            ac: 3,
            weight: 15, 
            cost: 200, 
            name: "Leather Armor",
            armorType: "armor"
        },
        chainMail: {
            ac: 5,
            weight: 40, 
            cost: 600, 
            name: "Chain Mail",
            armorType: "armor"
        }, 
        plateMail: {
            ac: 7,
            weight: 50, 
            cost: 3000, 
            name: "Plate Mail",
            armorType: "armor"
        }, 
        buckler: {
            ac: 1, 
            weight: 5, 
            cost: 70, 
            name: "Buckler",
            armorType: "shield"
        }, 
        greatShield: {
            ac: 2, 
            weight: 10, 
            cost: 350, 
            name: "Great Shield",
            armorType: "shield"
        }
    };

    var weapons = {
        handAxe: {
            dmg: 6, 
            weight: 5, 
            cost: 40, 
            hands: 1, 
            name: "Hand-Axe"
        }, 
        battleAxe: {
            dmg: 8, 
            weight: 7, 
            cost: 70, 
            hands: 1, 
            name: "Battle-Axe"
        }, 
        greatAxe: {
            dmg: 10, 
            weight: 15, 
            cost: 140, 
            hands: 2, 
            name: "Great-Axe"
        }, 
        shortbow: {
            //dmg refers to hitting with the bow itself
            dmg: 2,
            weight: 2, 
            cost: 250, 
            hands: 2, 
            range: [50, 100, 150], 
            name: "Shortbow"
        }, 
        shortbowArrow: {
            dmg: 6, 
            weight: 0, 
            cost: 1, 
            hands: 0, 
            name: "Shortbow Arrow"
        }, 
        longbow: {
            //dmg refers to hitting with the bow itself
            dmg: 2,
            weight: 3, 
            cost: 60, 
            hands: 2, 
            range: [70, 140, 210], 
            name: "Longbow"
        }, 
        longbowArrow: {
            dmg: 8, 
            weight: 0, 
            cost: 2, 
            hands: 0, 
            name: "Longbow Arrow"
        }, 
        lightCrossbow: {
            //dmg refers to hitting with the bow itself
            dmg: 2,
            weight: 7, 
            cost: 300, 
            hands: 2, 
            range: [60, 120, 180], 
            name: "Light Crossbow"
        }, 
        lightQuarrel: {
            dmg: 6, 
            weight: 0, 
            cost: 2, 
            hands: 0, 
            name: "Light Quarrel"
        }, 
        heavyCrossbow: {
            //dmg refers to hitting with the bow itself
            dmg: 2,
            weight: 14, 
            cost: 500, 
            hands: 2, 
            range: [80, 160, 240], 
            name: "Heavy Crossbow"
        }, 
        heavyQuarrel: {
            dmg: 8, 
            weight: 0, 
            cost: 4, 
            hands: 0, 
            name: "Heavy Quarrel"
        }, 
        dagger: {
            dmg: 4, 
            weight: 1, 
            cost: 20, 
            hands: 1, 
            name: "Dagger"
        }, 
        silverDagger: {
            dmg: 4, 
            weight: 1, 
            cost: 250, 
            hands: 1, 
            name: "Silver Dagger"
        }, 
        shortsword: {
            dmg: 6, 
            weight: 3, 
            cost: 60, 
            hands: 1, 
            name: "Shortsword"
        }, 
        longsword: {
            dmg: 8, 
            weight: 4, 
            cost: 100, 
            hands: 1, 
            name: "Longsword"
        }, 
        twoHandedSword: {
            dmg: 10, 
            weight: 10, 
            cost: 180, 
            hands: 2, 
            name: "Two-handed Sword"
        }, 
        warhammer: {
            dmg: 6, 
            weight: 6, 
            cost: 40, 
            hands: 1, 
            name: "Warhammer"
        }, 
        mace: {
            dmg: 8, 
            weight: 10, 
            cost: 60, 
            hands: 1, 
            name: "Mace"
        }, 
        club: {
            dmg: 4, 
            weight: 1, 
            cost: 2, 
            hands: 1, 
            name: "Club"
        }, 
        quarterstaff: {
            dmg: 6, 
            weight: 4, 
            cost: 20, 
            hands: 1, 
            name: "Quarterstaff"
        }
    };

    var items = {
        book: {
            weight: 1,
            cost: 1,
            name: "Book"
        }
    };

    var itemNames = {
        handAxe: "Hand-Axe", 
        battleAxe: "Battle-Axe", 
        greatAxe: "Great-Axe", 
        shortbow: "Shortbow", 
        shortbowArrow: "Shortbow Arrow", 
        longbow: "Longbow", 
        longbowArrow: "Longbow Arrow", 
        lightCrossbow: "Light Crossbow", 
        lightQuarrel: "Light Quarrel", 
        heavyCrossbow: "Heavy Crossbow", 
        heavyQuarrel: "Heavy Quarrel", 
        dagger: "Dagger", 
        silverDagger: "Silver Dagger", 
        shortsword: "Shortsword", 
        longsword: "Longsword", 
        twoHandedSword: "Two-handed Sword", 
        warhammer: "Warhammer", 
        mace: "Mace", 
        club: "Club", 
        quarterstaff: "Quarterstaff", 
        leather: "Leather Armor", 
        chainMail: "Chain Mail", 
        plateMail: "Plate Mail", 
        buckler: "Buckler", 
        greatShield: "Great Shield"
    };

    return {
        armor: armor,
        weapons: weapons,
        items: items,
        itemNames: itemNames
    };
});
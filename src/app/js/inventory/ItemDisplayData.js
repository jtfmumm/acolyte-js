define(function(require) {

    function ItemDisplayData(name, equipType) {
        this.name = name;
        this.equipType = equipType || null;
        this.selected = false;
    }

    ItemDisplayData.prototype = {
        getName: function() {
            return this.name;
        },
        getEquipType: function() {
            return this.equipType;
        },
        setEquipType: function(type) {
            this.equipType = type;
        },
        toggleSelect: function() {
            this.selected = !this.selected;
        },
        isSelected: function() {
            return this.selected;
        }
    };

    return ItemDisplayData;
});
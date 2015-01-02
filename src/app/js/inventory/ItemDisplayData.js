define(function(require) {

    function ItemDisplayData(name, selectType) {
        this.name = name;
        this.selectType = selectType;
    }

    ItemDisplayData.prototype = {
        getName: function() {
            return this.name;
        },
        getSelectType: function() {
            return this.selectType;
        },
        setSelectType: function(type) {
            this.selectType = type;
        }
    };

    return ItemDisplayData;
});
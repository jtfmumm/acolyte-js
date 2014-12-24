define(function(require) {

    function SocialAttitude(target) {
        this.like = 0;
        this.target = target;
    }

    SocialAttitude.prototype = {
        updateLikeBy: function(change) {
            this.like += change;
        },
        getLike: function() {
            return this.like;
        },
        getTarget: function() {
            return this.target;
        }
    };

    return SocialAttitude;
});
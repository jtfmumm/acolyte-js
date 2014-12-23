define(function(require) {

    function SocialAttitude() {
        this.like = 0;
    }

    SocialAttitude.prototype = {
        updateLikeBy: function(change) {
            this.like += change;
        },
        getLike: function() {
            return this.like;
        }
    };

    return SocialAttitude;
});
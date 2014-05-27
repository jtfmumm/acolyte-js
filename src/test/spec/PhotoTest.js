define(function(require) {
    var Photo = require("js/models/Photo"); 
    var ImgURLPrefix = "static/img/";

    beforeEach(function() {
    });

    describe('Photo', function () {
        it('should exist', function() {
            expect(Photo).not.toBeUndefined();
        });
    });

    describe('A photo model', function() {
        it('should be have getters and setters', function() {
            var photo = new Photo({"title": "Untitled"});
            expect(photo.get).not.toBeUndefined();
            expect(photo.set).not.toBeUndefined();
        });

        it('should have a title', function() {
            var photo = new Photo({"title": "Untitled"});
            expect(photo.get('title')).toBe('Untitled');
        });

        it('should get a default number if no title is supplied', function() {
            var notitle = new Photo({});

            expect(typeof notitle.get('title')).toBe('number');
        });

        it('should get a different default number every time', function() {
            var photo1 = new Photo({});
            var photo2 = new Photo({});

            expect(photo1.get('title')).not.toEqual(photo2.get('title'));
        });

        it('should have a url added to its title', function() {
            var imgName = "01.jpg";
            var photo = new Photo({"title": "Untitled", "img": imgName});
            expect(photo.get("img")).toBe(ImgURLPrefix + imgName);
        });
    });
});
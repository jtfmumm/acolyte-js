define(function(require) {
	var MatrixTest = {
		fourByFour: [
					[1, 2, 3, 4],
					[5, 6, 7, 8],
					[9, 10, 11, 12],
					[13, 14, 15, 16] 
					],
		threeByThree: [
					["a", "b", "c"],
					["d", "e", "f"],
					["g", "h", "i"]
					],
		objects1: [
					[{id: "a"}, {id: "b"}, {id: "c"}],
					[{id: "d"}, {id: "e"}, {id: "f"}],
					[{id: "g"}, {id: "h"}, {id: "i"}]
					],
		objects2: [
					[{id: "at"}, {id: "bt"}, {id: "ct"}],
					[{id: "dt"}, {id: "et"}, {id: "ft"}],
					[{id: "gt"}, {id: "ht"}, {id: "it"}]
					],
		terrainCodes: [
					["wall", "wall", "wall", "wall", "wall", "wall"],
			        ["wall", "plains", "plains", "plains", "plains", "wall"],
			        ["wall", "plains", "plains", "plains", "plains", "wall"],
			        ["wall", "plains", "plains", "wall", "plains", "wall"],
			        ["wall", "plains", "plains", "plains", "plains", "wall"],
			        ["wall", "plains", "plains", "plains", "plains", "wall"],
			        ["wall", "wall", "wall", "wall", "wall", "wall"],
					],
		terrains: [
					[{code: "wall"}, {code: "wall"}, {code: "wall"}, {code: "wall"}, {code: "wall"}, {code: "wall"}],
			        [{code: "wall"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "wall"}],
			        [{code: "wall"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "wall"}],
			        [{code: "wall"}, {code: "plains"},{code:  "plains"}, {code: "wall"}, {code: "plains"}, {code: "wall"}],
			        [{code: "wall"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "wall"}],
			        [{code: "wall"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "plains"}, {code: "wall"}],
			        [{code: "wall"}, {code: "wall"}, {code: "wall"}, {code: "wall"}, {code: "wall"}, {code: "wall"}]
					],
	}

	return MatrixTest;
})
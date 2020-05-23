namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
}
function VisitCell (x: number, y: number, lastX: number, lastY: number) {
    if (x < 0 || x >= CellsX) {
        return
    }
    if (y < 0 || y >= CellsY) {
        return
    }
    if (Cells[x][y].Visited) {
        return
    }
    Cells[x][y].Visited = true
    tiles.setTileAt(tiles.getTileLocation(x * 2 + 1, y * 2 + 1), sprites.castle.tilePath5)
    if (x != 0 || y != 0) {
        tiles.setTileAt(tiles.getTileLocation((x * 2 + lastX * 2) / 2 + 1, (y * 2 + lastY * 2) / 2 + 1), sprites.castle.tilePath5)
    }
    pause(50)
    let directions = NSEW.sort((a, b) => { return Math.pickRandom([-1, 1]) })
    for(let dir of directions) {
        let nextX: number = x;
        let nextY: number = y;
        switch(dir) {
            case "N":
                nextY--;
                break;
            case "S":
                nextY++;
                break;
            case "E":
                nextX++;
                break;
            case "W":
                nextX--;
                break;
        }
        VisitCell(nextX, nextY, x, y)
    }
}
function GenerateMap () {
    console.log("Generate Map")
    GenerateCells()
    VisitCell(0, 0, 0, 0)
}
function GenerateCells () {
    console.log("Generate Cells")
    for (let x = 0; x <= CellsX - 1; x++) {
        Cells[x] = []
        for (let y = 0; y <= CellsY - 1; y++) {
            Cells[x][y] = new Cell()
            Cells[x][y].Visited = false
        }
    }
}
console.log("start")
let NSEW: string[] = ["N", "S", "E", "W"]
let TilesX = 16
let TilesY = 16
let CellsX = 0
let CellsY = 0
let Cells: Cell[][] = []
CellsX = TilesX / 2 - 1
CellsY = TilesY / 2 - 1
TilesX = 16
TilesY = 16
tiles.setTilemap(tiles.createTilemap(
            hex`1000100004040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404`,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `,
            [myTiles.tile0,sprites.castle.tileGrass2,sprites.castle.tilePath5,sprites.builtin.forestTiles0,sprites.castle.tileDarkGrass1],
            TileScale.Sixteen
        ))
class Cell {
    Visited: boolean
}
GenerateMap()
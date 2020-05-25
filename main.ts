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
    //% blockIdentity=images._tile
    export const tile1 = img`
e e e e e e e e e e e e e e e e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e f f f f f f f f f f f f f f e 
e e e e e e e e e e e e e e e e 
`
}
function CreateEnemies () {
    enemySpeed = 100
    CreateEnemy(4, 4)
    CreateEnemy(6, 4)
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
    let directions = NSEW.sort((a, b) => { return Math.pickRandom([-1, 1]) })
let nextX = 0
let nextY = 0
for (let dir of directions) {
        nextX = x
        nextY = y
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
    GenerateCells()
    VisitCell(0, 0, 0, 0)
    SolidifyWalls()
}
function CreatePlayer () {
    mySprite = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . 4 4 4 4 4 4 4 . . . . . 
. . . 4 5 5 5 5 5 5 5 4 . . . . 
. . 4 5 5 5 5 5 5 5 5 5 4 . . . 
. 4 5 5 5 5 5 5 5 5 5 5 5 4 . . 
. 4 5 5 5 f 5 5 5 f 5 5 5 4 . . 
. 4 5 5 5 5 5 5 5 5 5 5 5 4 . . 
. 4 5 5 5 5 5 5 5 5 5 5 5 4 . . 
. 4 5 5 5 5 5 5 5 5 5 5 5 4 . . 
. 4 5 5 5 f 5 5 5 f 5 5 5 4 . . 
. 4 5 5 5 5 f f f 5 5 5 5 4 . . 
. . 4 5 5 5 5 5 5 5 5 5 4 . . . 
. . . 4 5 5 5 5 5 5 5 4 . . . . 
. . . . 4 4 4 4 4 4 4 . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
    mySprite.setPosition(24, 24)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
}
function GenerateCells () {
    for (let x = 0; x <= CellsX - 1; x++) {
        Cells[x] = []
        for (let y = 0; y <= CellsY - 1; y++) {
            Cells[x][y] = new Cell()
            Cells[x][y].Visited = false
        }
    }
}
function CreateEnemy (x: number, y: number) {
    enemySprite = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . f f f f f f f . . . . . 
. . . f 7 7 7 7 7 7 7 f . . . . 
. . f 7 7 7 7 7 7 7 7 7 f . . . 
. f 7 7 f 7 7 7 7 f 7 7 7 f . . 
. f 7 7 7 f 7 7 f 7 7 7 7 f . . 
. f 7 7 7 7 7 7 7 7 7 7 7 f . . 
. f 7 7 7 7 7 7 7 7 7 7 7 f . . 
. f 7 7 7 7 7 7 7 7 7 7 7 f . . 
. f 7 7 7 7 f f f 7 7 7 7 f . . 
. f 7 7 7 f 7 7 7 f 7 7 7 f . . 
. . f 7 7 7 7 7 7 7 7 7 f . . . 
. . . f 7 7 7 7 7 7 7 f . . . . 
. . . . f f f f f f f . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
    enemySprite.setPosition(16 * x + 24, 16 * y + 24)
    enemySprite.vx = 20
}
function SolidifyWalls () {
    for (let value of tiles.getTilesByType(myTiles.tile1)) {
        tiles.setWallAt(value, true)
    }
}
function CreateTiles () {
    TilesX = 16
    TilesY = 16
    CellsX = TilesX / 2 - 1
    CellsY = TilesY / 2 - 1
    tiles.setTilemap(tiles.createTilemap(
            hex`1000100005050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505`,
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
            [myTiles.tile0,sprites.castle.tileGrass2,sprites.castle.tilePath5,sprites.builtin.forestTiles0,sprites.castle.tileDarkGrass1,myTiles.tile1],
            TileScale.Sixteen
        ))
}
scene.onHitWall(SpriteKind.Enemy, function (sprite) {
    let newVy = 0
let newVx = 0
do {
    let direction = Math.pickRandom(NSEW)
    switch(direction) {
        case "N":
        newVy = -enemySpeed;
        break;
        case "S":
        newVy = enemySpeed;
        break;
        case "E":
        newVx = enemySpeed;
        break;
        case "W":
        newVx = -enemySpeed;
        break;
    }
    } while(newVx == sprite.vx && newVy == sprite.vy)
sprite.vx = newVx
    sprite.vy = newVy
})
let TilesY = 0
let TilesX = 0
let enemySprite: Sprite = null
let mySprite: Sprite = null
let CellsY = 0
let CellsX = 0
let enemySpeed = 0
class Cell {
    Visited: boolean
}
let Cells: Cell[][] = []
let NSEW = ["N", "S", "E", "W"]
CreateTiles()
GenerateMap()
CreatePlayer()
CreateEnemies()

// Veinminer Mod for Horizon Engine (Inner Core)
// Ported from Veinminer NeoForge

var MAX_BLOCKS = 64;

var TARGET_BLOCKS = [
    // Ванільні руди
    BlockID.oreCoal, 
    BlockID.oreIron, 
    BlockID.oreGold, 
    BlockID.oreDiamond, 
    BlockID.oreRedstone, 
    BlockID.oreLapis, 
    BlockID.oreEmerald,
    // Деревина (Logs)
    17, 162
];

function isTargetBlock(blockId) {
    return TARGET_BLOCKS.indexOf(blockId) !== -1;
}

function mineVein(x, y, z, targetId, player, count) {
    if (count.value >= MAX_BLOCKS) return;

    for (var xx = -1; xx <= 1; xx++) {
        for (var yy = -1; yy <= 1; yy++) {
            for (var zz = -1; zz <= 1; zz++) {
                if (xx === 0 && yy === 0 && zz === 0) continue;

                var nx = x + xx;
                var ny = y + yy;
                var nz = z + zz;

                var currentBlock = World.getBlockID(nx, ny, nz);
                if (currentBlock === targetId) {
                    count.value++;
                    World.destroyBlock(nx, ny, nz, true);
                    mineVein(nx, ny, nz, targetId, player, count);
                }
            }
        }
    }
}

Callback.addCallback("DestroyBlock", function(coords, block, player) {
    if (isTargetBlock(block.id)) {
        var count = { value: 0 };
        mineVein(coords.x, coords.y, coords.z, block.id, player, count);
    }
});

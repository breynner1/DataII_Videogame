export default class spikeBall extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);

        this.body.velocity.setTo(200,200);

        // AABB and Size
        this.setCollideWorldBounds(true); 

        this.setScale(0.2);
        this.body.setCircle(190);
        this.body.bounce.set(1);

        // Server side usefull things 
        this.oldPositions = {
            x: this.x,
            y: this.y
        }
        this.newPos;
    }

    updateCoords(data){
        this.x = data.x;
        this.y = data.y;
    }

    getNewPos(){
        return this.newPos;
    }

    faster(){
        if(this.body.angularVelocity <= 800){
            this.body.angularVelocity += 200;
        }
        this.setVelocityX(this.body.velocity.x + 40);
        this.setVelocityY(this.body.velocity.y - 40);
    }

    updatePos(){
        var data = {x: this.x, y: this.y}
        if(this.oldPositions && (this.x !== this.oldPositions.x || this.y !== this.oldPositions.y)){
            this.newPos = data;
            this.oldPositions = {
                x: this.x,
                y: this.y
            }
            return true;            
        }else{
            return false;
        }
    }
}
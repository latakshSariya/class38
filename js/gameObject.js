class gameObject{
    constructor()
    {
        //constructor//
    }

    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value",function(data){
            GameState = data.val();
        });
    }

    update(state){
        database.ref('/').update({
           'gameState': state
        })
}
    play(){
        Form1.hide();
        textSize(30);
        console.log("its Working")
        stroke("black");
        text("Game is about to start, Get Ready!!!"
        ,10,250);
        Player.getPlayerInfo();
        if(PlayersInfo !== undefined){
            var displayPositions = 270;
            for(var plr in PlayersInfo){
                if(plr === "player"+ players.index){
                    fill("red");
                }
                else{
                    fill("black")
                }
            }
            displayPositions = displayPositions+30;
            text(PlayersInfo[plr].name + ":" +PlayersInfo[plr].distance, 200, displayPositions);
        }
    }
    keypressed(){
        if(keyDown(UP_ARROW)&& players.index!==null){
            players.distance = players.distance + 10;
            players.update();
        }
    }
    

    async start(){
        if(GameState === 0){
            players = new Player();
            var playerRef = await database.ref('playerCount').once("value");
            if(playerRef.exists()){
                PlayerCount = playerRef.val();
                players.getCount();
            }
            Form1  = new form();
            Form1.display();
        }
    }
}
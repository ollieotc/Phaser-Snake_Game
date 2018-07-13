// ---------------- 遊戲結束畫面 -------------------

var Game_Over = {

  preload : function(){
    this.load.image('gameOver','assets/img/gameover.png');
  },

  create : function(){
    this.add.button(0,0,'gameOver',this.startGame , this);

    // 添加遊戲分數
    this.add.text(210 , 340 ,'Last Score', {font:'bold 16px sans-serif',fill: "#46c0f9", align: "center"})
    this.add.text(340 , 338 , score.toString() , {font:'bold 20px sans-serif',fill: "#46c0f9", align: "center"})
  },

  startGame: function(){
    this.state.start('Game');
  },
  
};

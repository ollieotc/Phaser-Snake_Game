window.onload = function(){
  // 創建一個對象實例 
  var game = new Phaser.Game( 600 , 400 , Phaser.AUTO , 'gameDiv');
  // 初始化 Menu state 對象
  game.state.add('Menu', Menu);
  game.state.add('Game', Game);
  game.state.add('Game_Over', Game_Over);
  game.state.start('Menu');
}

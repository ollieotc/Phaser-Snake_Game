var Menu = {
  preload : function(){
    this.load.image('menu','assets/img/menu.png');
  },

  create : function(){
    // 添加一个按钮，點擊時調用 startGame()
    // button(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group)
    this.add.button(0, 0, 'menu', this.startGame , this);
  },
  
  startGame: function(){
    this.state.start('Game');
  },
}
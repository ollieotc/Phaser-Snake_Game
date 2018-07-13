
// ---------------- 遊戲開始 -------------------

var snake;        //將蛇的身體部分用array存
var apple;        //蘋果
var squareSize = 15;   // 正方形的長寬邊 像素 15x15

var score;         // 分數   
var scoreTextValue;
var speed;         // 速度
var speedTextValue;
var updateDelay;   //控制更新率的變量

var direction;   // 初始蛇的方向
var new_direction;         // 存新的方向
var addNewApple;   // 存蘋果是否還在 狀態
var Game ={
  preload : function(){
    this.load.image('snake','assets/img/snake.png');
    this.load.image('apple','assets/img/apple.png');
  },

  create : function(){

    snake = []; 
    apple = {};
    score = 0;
    speed = 0;
    updateDelay = 0;
    direction = 'right';
    new_direction = null;
    addNew = false;

    cursors = this.input.keyboard.createCursorKeys();    // 監聽鍵盤事件
    this.stage.backgroundColor = '#061f27';    // 遊戲背景顏色

    // 初始化 蛇 10个元素
    for(var i = 0 ; i < 10 ; i++){
      snake[i]=this.add.sprite(150+i*squareSize , 150 ,'snake');
    }

    this.randomApple();     // 隨機生蘋果
    
    // --------------------- 文字 ---------------------
    this.add.text(30,20 ,'SCORE :',{font:'bold 14px sans-serif',fill:'#46c0f9',align:'center'});
    scoreTextValue = this.add.text(120,20 ,score.toString(),{font:'bold 13px sans-serif',fill:'#fff',align:'center'});
    this.add.text(440,20 ,'SPEED :',{font:'bold 14px sans-serif',fill:'#46c0f9',align:'center'});
    speedTextValue = this.add.text(530,20 ,speed.toString(),{font:'bold 13px sans-serif',fill:'#fff',align:'center'});
  },
  
  // update 是每秒60fps不斷更新遊戲的畫面
  update : function(){
    
    // 判斷鍵盤事件
    if(cursors.right.isDown && direction !='left'){
      new_direction = 'right';
    }else if(cursors.left.isDown && direction !='right'){
      new_direction = 'left';
    }else if(cursors.up.isDown && direction !='down'){
      new_direction = 'up';
    }else if(cursors.down.isDown && direction !='up'){
      new_direction = 'down';
    }
    
    speed = Math.min(10, Math.floor(score/5)); // Math.min()返回指定的數字中帶有最低值的數字 ,得分越高，遊戲的速度越高，最高的是10
    speedTextValue.text = '' + speed;
    
    // 每次update更新 增加計數器
    updateDelay ++ ;
    // speed 最高為10，當updateDelay整除執行
    if( updateDelay % (10 - speed) == 0){
      
      // 蛇的運動 讀取下一步 
      var firstCell = snake[snake.length -1],
      lastCell = snake.shift(),
      oldLastCellx = lastCell.x,  // 存起最後一個元素位置 x
      oldLastCelly = lastCell.y;  // 存起最後一個元素位置 y

      // 如果從鍵盤上選擇了一個新的方向，改變蛇的方向
      if(new_direction){
        direction = new_direction;
        new_direction = null;
      }

      // 根據方向改變最後一個位置座標
      if(direction == 'right'){
        lastCell.x = firstCell.x + 15;
        lastCell.y = firstCell.y;
      } else if(direction == 'left'){
        lastCell.x = firstCell.x - 15;
        lastCell.y = firstCell.y;
      } else if(direction == 'up'){
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - 15;
      } else if(direction == 'down'){
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 15;
      }

      // 把最後一個位置放到蛇的最前方
      snake.push(lastCell);
      firstCell = lastCell;
      
      // 判斷是否吃到蘋果
      if(addNewApple){
        // 吃到就將蛇的最後一個元素 加進蛇的後方
        snake.unshift(this.add.sprite(oldLastCellx ,oldLastCelly,'snake'));
        addNewApple = false;
      }

      // 蛇與蘋果碰撞
      this.getApple();
  
      // 與自己碰撞檢查
      this.selfCollision(firstCell);

      // 與牆碰撞檢查
      this.wallCollision(firstCell);
    }

  },

  // 隨機生成蘋果
  randomApple : function(){
    var randomX = Math.floor(Math.random()* 40) *squareSize;        // X 在 0 和 585 之間 (39*15)
    var randomY = (Math.floor(Math.random()* 22) *squareSize) +45;  // Y 在 45 和 360 之間 (21*15)+45
    apple = this.add.sprite(randomX , randomY , 'apple');           // 生成一個新蘋果
  },
  
  // 碰撞蘋果
  getApple: function(){
    // 檢查蛇與蘋果座標位置使否有重疊
    for(var i = 0 ; i < snake.length ; i++){
      // 如果重疊
      if(snake[i].x == apple.x && snake[i].y == apple.y){
        addNewApple = true;  //增加蛇的長度
        apple.kill();  //消除蘋果
        this.randomApple();  //再生成蘋果
        score++; 
        scoreTextValue.text = score.toString();
      }
    }
  },

  // 碰撞自己 
  selfCollision: function(head){
    for(var i = 0 ; i < snake.length-1 ; i++){
      if(head.x == snake[i].x && head.y == snake[i].y){
        this.state.start('Game_Over');
      }
    }
  },
  
  // 碰撞牆
  wallCollision: function(head){
    if(head.x >= 600  || head.x < 0 || head.y >= 400 || head.y < 0){
      this.state.start('Game_Over');
    }
  },

}
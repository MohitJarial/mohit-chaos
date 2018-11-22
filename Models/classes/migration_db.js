var Sequelize = require("sequelize");

var connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,
{
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  dialect:'postgres',
  dialectOptions: {
    ssl: true
  }
});


var Users = connection.define('users',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true  
  },
  name:Sequelize.STRING,
  email:{
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password:Sequelize.STRING,
  facebookId:Sequelize.STRING,
  accessToken:Sequelize.STRING,
  latitude:Sequelize.STRING,
  longitude:Sequelize.STRING,
  usermood:Sequelize.STRING,
  isAdmin:Sequelize.BOOLEAN
},{
  timestamps: false
});


var Questions = connection.define('questions',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true    
  },
  question:{
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  parentId:Sequelize.INTEGER,
  questionType:Sequelize.STRING,
  serialNo:Sequelize.INTEGER,
  isActive:Sequelize.BOOLEAN,
  isDeleted:Sequelize.BOOLEAN
},{
  timestamps: false
});


var Answers = connection.define('answers',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true      
  },
  questionId:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  answers:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  optionCode:Sequelize.STRING,
  isActive:Sequelize.BOOLEAN,
  isDeleted:Sequelize.BOOLEAN
},{
  timestamps: false
});

Questions.hasMany(Answers);


var UserAnswers = connection.define('useranswers',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true      
  },
  userId:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  questionId:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  answerId:{
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  timestamps: false
});

Users.hasMany(UserAnswers);
Questions.hasMany(UserAnswers);


var ChatHistory = connection.define('chathistory',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true      
  },
  userId:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  questionText:{
    type: Sequelize.STRING
  },
  replyText:Sequelize.TEXT,
  replyDatetime:Sequelize.DATE
},{
  timestamps: false
});

Users.hasMany(ChatHistory);


var Notifications = connection.define('notifications',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true      
  },
  email:{
    type: Sequelize.STRING
  }
},{
  timestamps: false
});


var Phrases = connection.define('phrases',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true      
  },
  phrasesText:{
    type: Sequelize.STRING,
    allowNull: false
  },
  isActive:Sequelize.BOOLEAN

},{
  timestamps: false
});


var StayingInOptions = connection.define('stayinginoptions',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true      
  },
  optionText:Sequelize.TEXT,
  icon:Sequelize.STRING,
  image:Sequelize.STRING,
  isActive:Sequelize.BOOLEAN,
  isDeleted:Sequelize.BOOLEAN
},{
  timestamps: false
});



connection.sync().then(function(){
  
}).catch(function(error){
  console.log(error);
});
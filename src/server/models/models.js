const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    first_name: {type: DataTypes.STRING},
    nicname: {type: DataTypes.STRING, unique: true,},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketCourse = sequelize.define('basket_course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    time: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Purpose = sequelize.define('purpose', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Topic = sequelize.define('topic', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const CourseInfo = sequelize.define('course_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeTopic = sequelize.define('type_topic', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketCourse)
BasketCourse.belongsTo(Basket)

Purpose.hasMany(Course)
Course.belongsTo(Purpose)

Topic.hasMany(Course)
Course.belongsTo(Topic)

Course.hasMany(Rating)
Rating.belongsTo(Course)

Course.hasMany(BasketCourse)
BasketCourse.belongsTo(Course)

Course.hasMany(CourseInfo, {as: 'info'});
CourseInfo.belongsTo(Course)

Purpose.belongsToMany(Topic, {through: TypeTopic })
Topic.belongsToMany(Purpose, {through: TypeTopic })

module.exports = {
    User,
    Basket,
    BasketCourse,
    Course,
    Purpose,
    Topic,
    Rating,
    TypeTopic,
    CourseInfo
}


const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require("../../restaurant.json").results

const db = require('../../config/mongoose')

const SEED_USERs = [{
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [1, 2, 3]
}, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [4, 5, 6]
}, {
    name: 'aaa',
    email: 'aaa@aaa.aaa',
    password: 'aaaa',
    restaurantId: [1, 3, 5, 7]
}, {
    name: 'bbb',
    email: 'bbb@bbb.bbb',
    password: 'bbbb',
    restaurantId: [2, 4, 6, 8]
}]

db.once("open", () => {
    // 建立非同步函式 方便控管流程
    async function seedCreate() {
        try {
            // 依序從SEED_USERs取出SEED_USER
            for (const SEED_USER of SEED_USERs) {
                // 使用者重複確認
                const user = await User.findOne({ email: SEED_USER.email })
                if (user) {
                    console.log(`${user.name} already exists.`)
                    continue
                }
                // 密碼加鹽雜湊
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(SEED_USER.password, salt)
                // 使用者建立
                const seedUser = await User.create({
                    name: SEED_USER.name,
                    email: SEED_USER.email,
                    password: hash,
                    restaurantId: SEED_USER.restaurantId
                })
                // 餐廳建立前資料
                const userId = seedUser.id
                // 根據不同使用者，建立過篩餐廳資料
                const restaurantFilter = restaurantList.filter(restaurant => {
                    return SEED_USER.restaurantId.includes(restaurant.id)
                })
                // 將過篩資料加入，屬性:userId
                const createFilter = restaurantFilter.map(restaurant => {
                    return { ...restaurant, userId }
                })
                // 建立餐廳資料
                await Restaurant.create(createFilter)
            }
            console.log('done')
        } catch (err) {
            console.log(err)
        } finally {
            db.close()
        }
    }
    seedCreate()

    // SEED_USERs.forEach(SEED_USER => {
    //     User.findOne({ email: SEED_USER.email })
    //         .then(user => {
    //             if (user) {
    //                 console.log(`${user.name} already exists.`)
    //                 return
    //             }
    //             bcrypt
    //                 .genSalt(10)
    //                 .then(salt => bcrypt.hash(SEED_USER.password, salt))
    //                 .then(hash => User.create({
    //                     name: SEED_USER.name,
    //                     email: SEED_USER.email,
    //                     password: hash,
    //                     restaurantId: SEED_USER.restaurantId
    //                 }))
    //                 .then(user => {
    //                     const userId = user.id
    //                     const restaurantFilter = restaurantList.filter(restaurant => {
    //                         return SEED_USER.restaurantId.includes(restaurant.id)
    //                     })
    //                     const createFilter = restaurantFilter.map(restaurant => {
    //                         return { ...restaurant, userId }
    //                     })
    //                     return Restaurant.create(createFilter)
    //                 })

    //         })

    // })


    // async function seedCreate() {
    //     // 建立使用者區塊
    //     const createUser = SEED_USERs.map(async (user) => {
    //         const userExistCheck = await User.findOne({ email: user.email })
    //         // 檢查使用者是否已經存在
    //         if (userExistCheck) {
    //             console.log(`${user.name} already exists.`)
    //             return
    //         }
    //         // 雜湊密碼、建立使用者
    //         const salt = bcrypt.genSaltSync(10)
    //         const hash = bcrypt.hashSync(user.password, salt)
    //         await User.create({
    //             name: user.name,
    //             email: user.email,
    //             password: hash,
    //             restaurantId: user.restaurantId
    //         })
    //     })
    //     await Promise.all(createUser)
    //     // 建立餐廳區塊
    //     const seeduser = User.findOne({ name: SEED_USERs.name })

    //     const createRestaurant = SEED_USERs.map(async (user) => {
    //         // 篩出 (某使用者 擁有的餐廳)
    //         const restaurantFilter = restaurantList.filter(restaurant => {
    //             return user.restaurantId.includes(restaurant.id)
    //         })
    //         // console.log('restaurantFilter', restaurantFilter)

    //         // 重複剔除 (如果使用者已經有相同餐廳則剔除)
    //         const restaurantExistCheck = restaurantFilter.map(async (restaurant) => {
    //             const existCheck = await Restaurant.findOne({ id: restaurant.id, userId: seeduser._id })
    //             return !existCheck
    //         })
    //         console.log('restaurantExistCheck = ', restaurantExistCheck)
    //         return
    //         restaurantExistCheck.userId = seeduser._id
    //         Restaurant.create(restaurantExistCheck)
    //         // Restaurant.create(restaurantFilter)

    //     })
    //     await Promise.all(createRestaurant)
    //     console.log(`All seed data has been created.`)
    // }

    // seedCreate()
    //     .catch(err => console.log(err))
    //     .finally(() => db.close())

})
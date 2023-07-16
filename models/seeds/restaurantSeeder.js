const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require("../../restaurant.json").results
const SEED_USERs = require("../../seed-users.json")

const db = require('../../config/mongoose')

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

})
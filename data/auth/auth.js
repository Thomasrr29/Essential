// const { error } = require('console')
// const passport = require('passport')
// const {Strategy, ExtractJwt} = require('passport-jwt')
// const jwt_secret = '$%%%dasdasdas$%%%%'

// const strategy = new Strategy (
//     {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: jwt_secret,
//     },

//     async (jwtPayload, done) => {
//         try{
//             const user = await user.findById(jwtPayload.id)

//             if(!user){
//                 console.error(`Usuario no encontrado ${error}`)
//             }

//             done(null, user)
//         } catch(error){
//             console.error(`Usuario no encontrado ${error}`)
//         }
//     }
// )

// passport.use(strategy)

// const initialization = () => {
//     return passport.initialize()
// }

// const authentication = () => {
//     return passport.authenticate()
// }

// module.exports = {
//     initialization,
//     authentication
// }

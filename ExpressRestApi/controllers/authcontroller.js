const { PrismaClient } = require('@prisma/client')
const Prisma = new PrismaClient()

const Register = async (req, res, next) => {
    const { firstname, lastname, email, phonenumber, password, username } = req.body
    try {
        if ( !firstname || !lastname || !email || !phonenumber || !password || !username ) {
            throw {
                status: 400, name: 'Error',
                message: 'Field data is not complete!',
            }
        }

        let getUsers = await Prisma.users.findMany({
            where: {
                firstname: firstname,
                lastname: lastname,
            }
        })
        
        if ( getUsers.length > 0 ) {
            throw {
                status: 400, name: 'Error',
                message: 'User is exist!',
            }
        }

        let DataPassing = {
            firstname: firstname || null,
            lastname: lastname || null,
            email: email || null,
            phonenumber: phonenumber || null,
            username: username || null,
            password: password || null
        }

        let createUsers = await Prisma.users.create({ data: DataPassing })
        console.log(createUsers)

        res.status(200).send({
            message: 'Successfull to register user!',
            statusText: 'Successfull to register user!',
            statusCode: 200,
        })
    } catch (error) {
        console.log(error)
        res.status(error.status).send({
            message: `${ error.name } | ${ error.message }`,
            statusText: `${ error.name } | ${ error.message }`,
            statusCode: error.status,
        })
    }
}

const Login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        if ( !username || !password ) {
            throw {
                status: 400, name: 'Error',
                message: 'Field data is not complete!',
            }
        }

        let getUsers = await Prisma.users.findMany({
            where: { username: username }
        })

        if ( getUsers.length < 1 ) {
            throw {
                status: 400, name: 'Error',
                message: 'User is not exist!',
            }
        }

        if ( getUsers[0].password !== password ) {
            throw {
                status: 400, name: 'Error',
                message: 'Wrong Username or Password!',
            }
        }

        let DataPassingResponse = {
            id: getUsers[0].id,
            firstname: getUsers[0].firstname,
            lastname: getUsers[0].lastname,
            email: getUsers[0].email,
            phonenumber: getUsers[0].phonenumber,
        }
        
        res.status(200).send({
            message: 'Successfull to login user!',
            statusText: 'Successfull to login user!',
            statusCode: 200,
            data: DataPassingResponse
        })
    } catch (error) {
        console.log(error)
        res.status(error.status).send({
            message: `${ error.name } | ${ error.message }`,
            statusText: `${ error.name } | ${ error.message }`,
            statusCode: error.status,
        })
    }
}

module.exports = {
    Register,
    Login
}
const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId
        let isRoom = true
        while(isRoom){
            /* Gera o numero da sala */
            for(var i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            /* Verificar se esse numero ja existi */
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            if(!isRoom){
                /* Inseri a sala no banco */
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VAlUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }         

        await db.close()

        res.redirect(`/room/${roomId}`)
    },
    async open(req, res){
        const roomId = req.params.room

        const db = await Database()

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND marked_as_read = 0`)
        const readQuestions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND marked_as_read = 1`)

        await db.close()

        return res.render('room', { roomId: roomId, questions: questions, readQuestions: readQuestions })
    },
    async join(req,res){
        const roomId = req.body.roomId

        const db = await Database()

        const rooms = await db.all(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if(rooms[0] === undefined){
            return res.redirect('/')
        }

        if(rooms[0].id == roomId){
            res.redirect(`/room/${roomId}`)
        }

        await db.close()
    }
}
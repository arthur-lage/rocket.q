const Database = require("../db/config")

module.exports = {
    async index(req, res){
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        
        const password = req.body.password
        
        const db = await Database()
        
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.pass == password){
            if(action === 'check'){
                await db.run(`UPDATE questions SET marked_as_read = 1 WHERE id = ${questionId}`)

            }
            if(action === 'delete'){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            }
        } else {
            res.send('<script>alert("A senha está incorreta.")</script>')
        }

        await db.close()
        
        return res.redirect(`/room/${roomId}`)
    },
    async create(req, res){
        const question = req.body.question
        const roomId = req.params.room

        const db = await Database()

        await db.run(`INSERT INTO questions (
            title,
            marked_as_read,
            room
        ) VALUES (
            "${question}",
            0,
            ${roomId}
        )`)

        await db.close()
    
        res.redirect(`/room/${roomId}`)
    }
}
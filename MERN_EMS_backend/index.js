require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')
const mon = require('./lib/mongoose')

// routes
const auth = require('./routes/auth')
const employees = require('./routes/employees')

// functional variables
let port = process.env.PORT || 8080
const swaggerSpecs = require('./lib/swagger')
const corsConfig = {
	origin: true,
	credentials: true
}

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use('/auth', auth)
app.use('/employees', employees)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
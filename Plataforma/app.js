var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var userRouter = require('./src/routes/usuarios');
var indexRouter = require("./src/routes/index");
var musicRouter = require("./src/routes/musica");
var interactionRouter = require("./src/routes/interaction");
var dash_userRouter = require("./src/routes/dash_user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());


app.use("/", indexRouter);
app.use("/usuarios", userRouter);
app.use("/interaction", interactionRouter);
app.use("/musica", musicRouter);
app.use("/dash_user",dash_userRouter);



app.listen(PORTA_APP, function () {
    console.log(`

              ⢀⣀⡤⠄⠀⠀⠠⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⡠⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⢤⠀⠀⠀⠀⠀⠀⠀⣠⠔⠚⠉⠉⠁⠈⠁⠉⠒⠠⡀⠀⠀⠀
        ⠀⢠⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⢄⠀⠀⠀⡠⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⡄⠀
        ⢠⣡⠀⠀⣀⣀⣀⣤⠤⢤⣀⡀⠀⠀⠀⠀⠀⠀⢈⣃⢀⣐⣡⣤⣶⣶⣶⣶⣶⣶⣤⣤⣀⠀⠀⠀⠀⠘⡆
        ⠀⣚⣿⣿⣿⣿⣿⣷⣦⣀⠈⠈⠲⠲⡤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣤⣤⡞
        ⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⣤⣾⡶⣳⣤⠀⢠⣶⣿⠾⠤⠀⢸⣿⢿⠳⠀⠀⢀⣾⣆⠀⠀⢨⣷⣤⣰⣿⠀⠀⠀⣺⢷⠷⠆
        ⢿⡃⣀⣨⡧⠃⠘⣿⣁⠀⠀⠀⢸⣿⣟⠚⠀⠀⣾⣿⣷⣄⠀⠸⣿⠯⢿⣿⠀⠀⢀⣈⣙⣶⡆
        ⠈⠉⠻⠛⠁⠀⠀⠈⠛⠿⠋⠀⠈⠛⠻⠛⠀⠘⠓⠁⠈⠛⠀⠀⠛⠀⠈⠙⠂⠀⠀⠉⠛⠟⠀

    \n\n                                                                                          
    Você está rodando sua aplicação em ambiente de ${process.env.AMBIENTE_PROCESSO}. \n\n
    Caminho: http://${HOST_APP}:${PORTA_APP} \n\n
    \n\n`);
});
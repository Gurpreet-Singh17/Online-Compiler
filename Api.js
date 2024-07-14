const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.use(bodyP.json());
app.use("/codemirror-5.65.16", express.static("C:/Users/saman/Desktop/Online Compiler/codemirror-5.65.16"));

// Hosting index.html file using API
app.get("/", function(req, res) {
    res.sendFile("C:/Users/saman/OneDrive/Desktop/Online Compiler/index.html");
});

app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;

    try {
        if (lang === "Cpp") {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (!input) {
                compiler.compileCPP(envData, code, function(data) {
                    res.send(data.output ? data : { output: "error" });
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function(data) {
                    res.send(data.output ? data : { output: "error" });
                });
            }
        } else if (lang === "Java") {
            var envData = { OS: "windows" };
            if (!input) {
                compiler.compileJava(envData, code, function(data) {
                    res.send(data.output ? data : { output: "error" });
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function(data) {
                    res.send(data.output ? data : { output: "error" });
                });
            }
        } else if (lang === "Python") {
            var envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function(data) {
                    res.send(data.output ? data : { output: "error" });
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function(data) {
                    res.send(data.output ? data : { output: "error" });
                });
            }
        }
    } catch (e) {
        console.log("error", e);
        res.status(500).send({ output: "internal server error" });
    }
});

app.listen(8000)

